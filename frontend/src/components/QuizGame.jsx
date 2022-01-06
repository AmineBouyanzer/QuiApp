import React, { useState, useEffect } from 'react';
import Answer from './Answer';
import Question from './Question';
import { BsArrowRight } from 'react-icons/bs'
import Ranking from './Ranking';
import Result from './Result';
import Rating from './Rating';
import { getQuizzById, updateQuizz } from '../_actions/Quizz_actions'
import { useSelector } from 'react-redux';

function QuizzGame(props) {

    const [quizzList, setQuizzList] = useState([])
    const [hasCharged, setHasCharged] = useState(false);
    const  name  = useSelector((state) => state.name)
    const [hasNoted, setHasNoted] = useState(false);

    useEffect(() => {
        getQuizzById(props.quizzId).then(e => {
            setQuizzList(e);
            setHasCharged(true);
        })
        return () => {
            setQuizzList([]);
            setHasCharged(false);
          };
    }, [])

    const [state, setState] = useState({
        correctAnswer: 0,
        answered: false,
        index: 0,
        score: 0
    })

    const setNoted = (value) => {
        setHasNoted(value);
    }

    const getResult = () => {
        let score = quizzList.score
        score.push({"name" : name , "result": state.score, "quizId": props.quizzId})
        quizzList.score = score
        quizzList.name = quizzList.name;   
        setQuizzList(quizzList);
        updateQuizz(quizzList , props.quizzId).then(e => {
            setState({ ...state, index: state.index + 1, answered: false });
        });
    }

    const nextButton = () => {
        if (state.answered) {
            if((state.index + 1) < quizzList.questions.length) {
                return <button className="flex flex-row justify-between mx-12 my-4 w-fit p-2 text-lg bg-indigo-600 rounded-lg text-white" onClick={() => setState({ ...state, index: state.index + 1, answered: false })}><span>Question suivante</span> <BsArrowRight size="30" className="mr-2" /></button>
            }else {
                return <button className="flex flex-row justify-between mx-12 my-4 w-fit p-2 text-lg bg-indigo-600 rounded-lg text-white" onClick={() => getResult()}><span>Question suivante</span> <BsArrowRight size="30" className="mr-2" /></button>
            }
        }
    }

    const hasAnswered = (value) => {
        setState({ ...state, answered: true, score: state.score + value });
    }

    return (
        <div className="h-full" >
            {
                !hasCharged ?
                <div></div>
              :[              
                (state.index < quizzList.questions.length) ?
                    <div key={1} className="border-gray-border border mb-10 bg-gray-120 rounded-lg m-12">

                        <>
                            <div className="flex  m-10 py-2">
                                <div className="grid grid-cols-3 mr-2 grid-rows-3">
                                    {[...Array(9)].map((e, index) => {
                                        return <div key={index} className="border-2 m-1 rounded-full border-slate-600" />
                                    })}
                                </div>
                                <div className="text-3xl font-bold"> Question {(state.index + 1)} </div>

                            </div>
                            <Question
                                question={quizzList.questions[state.index].question}
                            />
                            <Answer
                                answer={quizzList.questions[state.index].answers}
                                index={state.index}
                                type={quizzList.questions[state.index].type}
                                hasAnswered={hasAnswered}
                                answered={state.answered}
                            />
                        </>

                        {nextButton()}

                    </div>

                    :
                    <div key={2} className="flex flex-col h-full justify-around items-center">
                        <Result name={props.name} result={state.score} nbQuestions={quizzList.questions.length}/>
                        <Ranking score={quizzList.score} questions={quizzList.questions.length}/>
                        {
                            !hasNoted ?
                            <Rating quizzId={props.quizzId} setNoted={setHasNoted}/>
                            :
                            <span>Merci d'avoir noté le quizz !</span>
                        }
                        
                    </div>
                    ]
            }
        </div>

    );
}

export default QuizzGame;