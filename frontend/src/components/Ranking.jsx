import React, { useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs'

function Ranking(props) {

        const numberAnnotation = (index) => {
        switch (index) {
            case 1:
                return "er"

            default:
                return "eme"
        }
    }


    return (
        <div className="flex flex-col w-[50%] 4xl:w-[30%] h-fit shadow-xl rounded-2xl bg-slate-50 p-[1em] overflow-hidden">
            <h1 className="flex text-center justify-center uppercase md:text-3xl sm:text-xl text-base tracking-widest m-[0.25em] p-[0.25em]">Meilleur score</h1>
            <div className={"grid grid-cols-3 grid-rows-1 items-center  " + ((props.score.length == 1) ? "grid-cols-1" : "grid-cols-3")} >
                {props.score.map((player, index) => {
                    if (index <= 2) {
                        return <div key={index} className={"flex flex-col " + (index == 1 ? "order-first " : " ") + (index == 0 ? "sm:mb-[4em] mb-[0.5em]" : "mb-0")}>
                            <div className="flex uppercase font-bold text-xl mx-auto ">{index + 1} <span className="text-xs font-medium">{numberAnnotation(index + 1)}</span></div>
                            <div className="flex justify-center text-indigo-400">
                                <BsPersonCircle size="90" />
                            </div>
                            <div className={"uppercase text-sm mx-auto my-[0.5em] font-bold"}>{player.name}</div>
                            <div className="text-sm mx-auto">{player.result} / {props.questions}</div>

                        </div>
                    }
                })}
            </div>
            <div className="grid grid-cols-1 grid-rows-7">
                {props.score.map((player, index) => {
                    if (index > 2) {
                        return <div key={index} className={"flex items-center mx-[0.25em]"}>
                            <div className={"uppercase font-bold text-xl bg-white py-[0.25em] mx-[0.25em] rounded-lg " + (index == 9 ? "px-[0.25em]" : "px-[0.5em]")}>{index + 1}</div>
                            <div className="flex justify-center text-indigo-400">
                                <BsPersonCircle size="50" />
                            </div>
                            <div className="flex bg-white w-full items-center sm:p-[0.25em] m-[0.5em] rounded-xl">
                                <div className="uppercase sm:text-base text-xs font-bold py-[0.25em] mx-[0.25em] ">{player.name}</div>
                                <div className="flex  w-full text-base text-xs font-medium justify-end"> {player.result} / {props.questions}</div>
                            </div>


                        </div>
                    }
                })}
            </div>
        </div>
    );
}

export default Ranking;