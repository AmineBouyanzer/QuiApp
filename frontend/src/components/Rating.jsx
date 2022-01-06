import React, { useState } from 'react';
import { AiTwotoneStar } from 'react-icons/ai'
import { useNavigate } from 'react-router';
import { rateQuizz } from "../_actions/Quizz_actions"

function Rating(props) {

    const [note, setNote] = useState(0);
    const navigate = useNavigate();

    const setBackgroundColor = (index) => {
        if(index <= note) {
            return "text-yellow-500"
        }
        return "text-black"
    }

    const rate = () => {
        const rate = {
            "id": props.quizzId,
            "rate": note
        }

        rateQuizz(rate).then(e => {
            props.setNoted(true);
        })

    }

    return (
        <div className="flex flex-col sm:w-[30%] sm:w-[50%] m-4 rounded-2xl items-center justify-center">
            <div className="m-1 text-xl">Qu'avez-vous pensé de ce quizz ?</div>
            <div className="flex sm:flex-row flex-col">
                {[...Array(5)].map((e, index) => {
                    return <div id={index} key={index} onClick={(e) => { setNote(parseInt((index + 1))) }}>
                        <AiTwotoneStar size="40" id={index} className={"cursor-pointer hover:text-yellow-500 " + (setBackgroundColor(index + 1))} onClick={(e) => { setNote((index + 1)) }} />
                    </div>
                })}
            </div>
            <div className="flex bg-indigo-500 text-white rounded-md items-center justify-center py-2 px-4 mt-2 uppercase cursor-pointer" onClick={() => rate()}><span>Noter</span></div>
            <div className="text-sm underline  italic m-1 cursor-pointer" onClick={() => {navigate("/")}}>Pas maintenant</div>

        </div>
    );
}

export default Rating;