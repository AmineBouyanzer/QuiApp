import React from 'react';
import QuizGame from '../components/QuizGame';
import { useParams } from "react-router-dom";

function Game() {

    const { id } = useParams();
    
    return (
        <QuizGame quizzId={id}/>
    );
}

export default Game;