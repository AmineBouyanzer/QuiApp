import React from 'react';
import { FaMedal } from "react-icons/fa"

function Result(props) {

    return (
        <div className="flex flex-col sm:w-[30%] sm:w-[50%] items-center justify-center">
             <FaMedal size="80" className="text-indigo-600 mb-2 " />
            <div className="text-indigo-500 font-mono text-4xl ">{props.result} <span> Bonnes réponses sur </span> {props.nbQuestions}</div>
        </div>
    );
}

export default Result;