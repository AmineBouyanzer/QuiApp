import React, { useEffect, useState } from 'react';

function Answer(props) {


    const [currentAnswer, setcurrentAnswer] = useState([""])
    const [width, setWidth] = useState(100);
    const [disable, setDisable] = useState(false)
    const timer = () => setWidth(width - 0.1);

    useEffect(() => {
        if (width <= 0) {
            setDisable(true)
            if (hasGoodAnswer()) {
                props.hasAnswered(1);
            } else {
                props.hasAnswered(0);
            }
            return;
        }
        const time = setInterval(timer, 20);
        return () => clearInterval(time);
    }, [width])

    useEffect(() => {
        if(props.type !== "CHECKBOX") {
            setcurrentAnswer([""])
        }else {
            setcurrentAnswer([])
        }
        setWidth(100);
        setDisable(false);
    }, [props.answer])

    const isInTab = (text, tab) => {
        let bool = false;
        tab.forEach(e => {
            if (e === text) {
                bool = true;
            }
        })
        return bool;
    }

    const setAnswer = (value) => {
        if (!disable) {
            let index = null;
            for (let i = 0; i < currentAnswer.length; i++) {
                if (currentAnswer[i] === value.text) {
                    index = i;
                }
            }
            if (index != null) {
                let newTab = currentAnswer;
                newTab.splice(index, 1);
                setcurrentAnswer(newTab);
            } else {
                let newTab = currentAnswer;
                newTab.push(value.text)
                setcurrentAnswer(newTab);
            }
        }
    }
    
    const colorInput = () => {
        if (props.answered) {
            for (let i = 0; i < props.answer.length; i++) {
                if (props.answer[i].text.toLowerCase() === currentAnswer[0].toLowerCase() && props.answer[i].correct === true) {
                    return "bg-lime-600 text-white placeholder:text-white";
                }
            }
            return "text-white placeholder:text-white bg-red-500";
        }
    }

    const colorAnswered = (value) => {
        if (!props.answered) {
            if (isInTab(value.text, currentAnswer)) {
                return "bg-blue-500"
            } else {
                return "bg-white";
            }
        } else {
            for (let i = 0; i < props.answer.length; i++) {
                if (props.answer[i].text == value.text) {
                    if (props.answer[i].correct === true) {
                        return "bg-lime-600"
                    } else {
                        if (isInTab(value.text, currentAnswer)) {
                            return "bg-red-500"
                        }
                    }
                }
            }
            return "bg-white"
        }
    }

    const hasGoodAnswer = () => {
        for (let i = 0; i < currentAnswer.length; i++) {
            let bool = false;
            props.answer.forEach(answer => {
                if (currentAnswer[i] === answer.text) {
                    bool = answer.correct;
                }
            })
            if (!bool) {
                return false;
            }
        }

        return (currentAnswer.length !== 0);
    }

    const updateInput = (value) => {
        let newArray = [];
        newArray.push(value);
        setcurrentAnswer(newArray)

    }

    const numberToChar = (index) => {
        return String.fromCharCode(64 + index)
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-[80%]">
                {
                    props.type === "TEXT" ?
                        <div className="flex items-center justify-center mx-10 my-4">
                            <input type="text" className={"border text-xl ml-2 p-2 w-full rounded-lg " + (disable ? colorInput() : "bg-white text-black")} value={currentAnswer[0]} placeholder="Ecrivez votre réponse" onChange={e => updateInput(e.target.value)} disabled={disable} />
                        </div>
                        : (
                            props.type === "CHECKBOX" ?
                                props.answer.map((value, index) => {
                                    return <div key={index} className="flex flex-row w-full mx-10 my-4 items-center">
                                        <div className="grid grid-cols-2 mr-2 grid-rows-3">
                                            {[...Array(6)].map((e, index) => {
                                                return <div key={index} className="border-2 m-0.5 rounded-full border-slate-600" />
                                            })}
                                        </div>
                                        <div className="text-[#525868] text-2xl mx-2 "> {numberToChar(index + 1)}</div>

                                        <div className={"border text-xl ml-2 p-2 w-full rounded-lg " + (colorAnswered(value) + (disable ? " cursor-default" : " cursor-pointer"))} onClick={() => setAnswer(value)} disabled={disable}>
                                            {value.text}
                                        </div>
                                    </div>
                                })
                                :
                                <select className={"flex flex-row w-full mx-10 my-4 p-4 rounded-md items-center " + (disable ? colorInput() : "bg-white text-black")} defaultValue={""} onChange={e => updateInput(e.target.value)} disabled={disable}>
                                    <option value="" className="text-xl" disabled>Choisir une réponse</option>
                                    {
                                        props.answer.map((value, index) => {
                                            return <option key={index} className={"border text-xl ml-2 p-2 w-full rounded-lg " }  onChange={e => updateInput(e.target.value)} disabled={disable}>{value.text}</option>
                                        })
                                    }
                                </select>
                        )
                }

            </div>
            <div>
                <button className="flex items-center justify-center bg-indigo-600 text-white font-bold border border-2 rounded-xl mx-auto text-center w-[20%] p-2 " onClick={() => { setWidth(0) }} disabled={disable}><span>Valider</span></button>
            </div>
            <div className="w-full mx-auto px-6 py-4">
                <div className="h-3 relative  rounded-full z-index-50 overflow-hidden">
                    <div className="w-full h-full bg-gray-200 absolute"></div>
                    <div id="bar" className="h-full bg-indigo-500 relative" style={{ width: width + "%" }}></div>
                </div>
            </div>

        </div>

    );
}

export default Answer;