import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { BsPlusLg } from 'react-icons/bs';
import { MdOutlineDone } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
// import { ImCheckboxChecked } from 'react-icons/im'
// import { BsInputCursorText } from 'react-icons/bs'
// import { CgSelectR } from 'react-icons/cg'
import { BiListPlus } from 'react-icons/bi'
import { addQuizz } from '../_actions/Quizz_actions'
import { convertNameEngToFr, convertNameFrToEng } from "../utils/utils"
import { getAllCategories } from "../_actions/Quizz_actions"
import { useNavigate } from 'react-router-dom';
import QuestionType from '../components/QuestionType';

function CreationPagee(props) {

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [quizz, setQuizz] = useState([
        {
            question: '',
            answers: [
                { text: '', correct: true },
            ],
            type: "TEXT"
        },
    ]);
    useEffect(() => {
        getAllCategories().then(e => {
            setCategories(e);
        })
    }, [])

    const [categories, setCategories] = useState([])

    const onSubmit = (data, e) => {
        let quiz = {
            name: data.title,
            password: data.password,
            category: convertNameFrToEng(data.category),
            questions: quizz,
            status: window.event.submitter.id,
            score: []
        }
        addQuizz(quiz).then(e => {

            navigate('/');
        })
    }

    const addQuestion = () => {
        setQuizz(quizz.concat({
            question: "",
            answers: [{ text: "", correct: true }],
            type: "TEXT"
        }));
    }

    const addAnswer = (index) => {
        let newArray = [...quizz];
        newArray[index].answers.push({
            text: "",
            correct: false
        })
        setQuizz(newArray);
    }

    const updateAnswers = (indexQuizz, indexAnswer, text) => {
        let newArray = [...quizz];
        newArray[indexQuizz].answers[indexAnswer].text = text;
        setQuizz(newArray)
    }

    const updateQuestion = (indexQuizz, text) => {
        let newArray = [...quizz];
        newArray[indexQuizz].question = text;
        setQuizz(newArray)
    }

    const removeQuestion = (index) => {
        let newArray = [...quizz];
        newArray.splice(index, 1);
        setQuizz(newArray);
    }

    const removeAnswer = (indexQuizz, indexAnswer) => {
        let newArray = [...quizz];
        if (newArray[indexQuizz].answers.length > 2 && props.type !== "TEXT") {
            newArray[indexQuizz].answers.splice(indexAnswer, 1);
            setQuizz(newArray);
        }
    }

    const updateChecked = (indexQuizz, indexAnswer, checked) => {
        let newArray = [...quizz];
        newArray[indexQuizz].answers[indexAnswer].correct = checked;
        setQuizz(newArray)
    }

    const inputType = (index, indexAnswer, checked, selected) => {
        if (selected === "CHECKBOX") {
            return <input type="checkbox" name={index} className="flex self-center m-2 scale-150" checked={checked} onChange={() => updateChecked(index, indexAnswer, !quizz[index].answers[indexAnswer].correct)} />
        }
        if (selected === "LIST") {
            return <select className="bg-white p-2 text-lg ring-0  w-[100%] border-2 outline-none">
                <option>{quizz[index].answers[indexAnswer].text}</option>
            </select>
        }
    }

    const setSelected = (quizzIndex, selected) => {
        let newArray = [...quizz];
        newArray[quizzIndex].type = selected;
        if (selected === "TEXT") {
            newArray[quizzIndex].answers.splice(1, newArray[quizzIndex].answers.length - 1);
        }
        setQuizz(newArray)
    }

    const numberToChar = (index) => {
        return String.fromCharCode(64 + index)
    }


    return (
        <div className="bg-white h-fit">
            <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)} >
                <div className="flex flex-col">
                    <h1 className="mx-auto text-2xl font-bold text-gray-700 m-4">Créer un quizz </h1>
                    <input {...register("title")} className="border-2 p-2 my-1 w-fit mx-auto rounded-lg text-lg" placeholder="Titre" />
                    <input type="password" className="border-2 p-2 text-lg mx-auto rounded-lg" placeholder="Mot de passe"  {...register("password")}/>
                    <div className="flex justify-center items-center m-2">
                        <select className="bg-white p-2 text-lg ring-0 border-2 outline-none" {...register("category")}>{
                            categories.map((x, y) =>
                                <option key={y}>{convertNameEngToFr(x)}</option>)
                        }</select>
                    </div>
                </div>
                <div className="flex flex-col items-center" {...register("quizz")}>
                    {
                        quizz.map((quiz, quizzIndex) => {
                            return <div key={quizzIndex} className="flex sm:flex-row flex-col  w-full justify-center " >
                                    <QuestionType setSelected={setSelected} quizType={quiz.type} quizzIndex={quizzIndex}/>
                                {/* <div className="flex flex-col justify-center items-center bg-gray-120 w-fit p-2 rounded-lg m-2 ">
                                    <div className={"cursor-pointer " + (quiz.type === "TEXT" ? "bg-gray-400 rounded-xl" : "")} onClick={() => setSelected(quizzIndex, "TEXT")}>
                                        <BsInputCursorText size="35" className="m-2" />
                                    </div>
                                    <div className={"cursor-pointer " + (quiz.type === "CHECKBOX" ? "bg-gray-400 rounded-xl" : "")} onClick={() => setSelected(quizzIndex, "CHECKBOX")}>
                                        <ImCheckboxChecked size="30" className="m-2 " />
                                    </div>
                                    <div className={"cursor-pointer " + (quiz.type === "LIST" ? "bg-gray-400 rounded-xl" : "")} onClick={() => setSelected(quizzIndex, "LIST")}>
                                        <CgSelectR size="40" className="m-1" />
                                    </div>

                                </div> */}
                                <div className="flex flex-col xl:m-2 m-6 bg-gray-120 justify-center rounded-lg p-4 xl:w-[50%] w-[90%]">
                                    <AiOutlineClose className="flex self-end cursor-pointer" onClick={() => { removeQuestion(quizzIndex) }} />
                                    <div className="flex font-bold text-xl m-2">
                                        <div className="grid grid-cols-3 mr-2 grid-rows-3">
                                            {[...Array(9)].map((e, index) => {
                                                return <div key={index} className="border-2 m-0.5 rounded-full border-slate-600" />
                                            })}
                                        </div>

                                        <span>Question {quizzIndex + 1}</span>
                                    </div>
                                    <div className="flex px-6">
                                        <input type="text" className="border-[1px] border-gray-200 rounded-lg my-1 p-2 text-md w-full text-gray-600" placeholder="Question" value={quiz.question} onChange={e => updateQuestion(quizzIndex, e.target.value)} />
                                    </div>
                                    <div className="flex flex-col sm:mx-6 ">

                                        {
                                            quiz.answers.map((answer, answerIndex) => {
                                                return <div key={answerIndex} className="flex items-center justify-center m-1">
                                                    <div className="grid grid-cols-2 mr-2 grid-rows-3 px-1">
                                                        {[...Array(6)].map((e, index) => {
                                                            return <div key={index} className="border-2 m-0.5 rounded-full border-slate-600" />
                                                        })}
                                                    </div>
                                                    <span className="px-1">{numberToChar(answerIndex + 1)}</span>
                                                    <div className="flex sm:flex-row flex-col ml-2 w-full bg-white rounded-md">
                                                        {
                                                            inputType(quizzIndex, answerIndex, answer.correct, quiz.type)
                                                        }
                                                        <input className="text-gray-800 w-full ronded-md m-1" type="text" key={answerIndex} value={answer.text} placeholder={"Réponse " + (answerIndex + 1)} onChange={e => updateAnswers(quizzIndex, answerIndex, e.target.value)} />
                                                        <div className={"flex justify-center items-center h-full p-1 m-[0.15em] cursor-pointer rounded-md " + (quiz.answers[answerIndex].correct ? "bg-green-valid" : "bg-green-invalid")} onClick={() => updateChecked(quizzIndex, answerIndex, !quiz.answers[answerIndex].correct)}>
                                                            <MdOutlineDone size="25" className={"my-auto rounded-md " + (quiz.answers[answerIndex].correct ? "text-white" : "text-green-valid")} />
                                                        </div>
                                                        <div className="border-[0.05em] bg-gray-100 mx-1 "></div>

                                                        <div className="flex justify-center items-center h-full p-1 m-[0.15em] cursor-pointer rounded-md" onClick={() => removeAnswer(quizzIndex, answerIndex)}>
                                                            <AiOutlineClose size="25" className="m-auto rounded-md text-gray-400" />
                                                        </div>
                                                    </div>
                                                </div>

                                            })
                                        }
                                    </div>
                                    <div>
                                        {
                                            quiz.type !== "TEXT" ?
                                                <div className="flex self-end border-2 rounded-full cursor-pointer w-fit mt-2 p-2" onClick={() => addAnswer(quizzIndex)}>
                                                    <BsPlusLg size="20" className="text-blue-900" />
                                                </div>
                                                :
                                                <div className="flex self-end w-fit mt-2 p-2">

                                                </div>
                                        }
                                    </div>

                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="flex mx-auto my-4 text-white p-2 cursor-pointer rounded-lg bg-indigo-500" onClick={() => addQuestion()}>
                    <BiListPlus size="30" />
                </div>
                <div className="flex justify-center items-center m-4">
                    <input className="bg-slate-400 text-white m-2 p-2 cursor-pointer rounded-md" type="submit" value="Enregistrer" id="Draft"/>
                    <input className="bg-indigo-500 text-white m-2 p-2 cursor-pointer rounded-md" type="submit" value="Publier" id="Published" />
                </div>
            </form>
        </div>
    );
}

export default CreationPagee;