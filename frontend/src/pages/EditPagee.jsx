import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { BsPlusLg } from 'react-icons/bs';
import { MdOutlineDone } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import { BiListPlus } from 'react-icons/bi'
import { convertNameEngToFr, convertNameFrToEng } from "../utils/utils"
import { getAllCategories ,getQuizzById, updateQuizz } from "../_actions/Quizz_actions"
import { useNavigate } from 'react-router-dom';
import QuestionType from '../components/QuestionType';
import { useParams } from "react-router-dom";

function EditPage(props) {

    const { id } = useParams();
    const navigate = useNavigate();
    
    const { register, handleSubmit } = useForm();
    const [quizz, setQuizz] = useState([]);
    const [title, setTitle] = useState("");
    const [pass, setPassword] = useState("");
    const [category, setCategory] = useState("");
    const [hasCharged, setHasCharged] = useState(false)


    useEffect(() => {
        getAllCategories().then(e => {
            setCategories(e);
        })
        getQuizzById(id).then(e => {
            setQuizz(e.questions)
            setTitle(e.name);
            setPassword(e.password);
            setCategory(e.category);
            setHasCharged(true);
        })
    }, [])

    const [categories, setCategories] = useState([])

    const onSubmit = (data, e) => {
        let password = data.password;
        if(data.password === "") {
            password = pass ; 
        }
        let cat = convertNameFrToEng(data.category);
        if(cat === undefined) {
            cat = category;
        }

        let quiz = {
            id: id,
            name: data.title,
            password: password,
            category: cat,
            questions: quizz,
            status: window.event.submitter.id,
            score: []
        }
          updateQuizz(quiz , id).then(e => {
            navigate('/');
        });            
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
            return <select className="bg-white p-2 text-lg ring-0  w-[100%] border-2 outline-none" >
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
            { hasCharged ?
            <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)} >
                <div className="flex flex-col">
                    <h1 className="mx-auto text-2xl font-bold text-gray-700 m-4">Modifier votre quizz </h1>
                    <input {...register("title")} className="border-2 p-2 my-1 w-fit mx-auto rounded-lg text-lg" defaultValue={title} placeholder="Titre" />
                    <input type="password" className="border-2 p-2 text-lg mx-auto rounded-lg" placeholder="Mot de passe"  {...register("password")}/>
                    <div className="flex justify-center items-center m-2">
                        <select className="bg-white p-2 text-lg ring-0 border-2 outline-none" defaultValue={convertNameEngToFr(category)} {...register("category")}>{
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
            :
            <div></div>
            }
        </div>
    );
}

export default EditPage;