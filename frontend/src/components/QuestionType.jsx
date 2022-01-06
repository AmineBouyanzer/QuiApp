import React  , { useState, useEffect} from 'react';
import { ImCheckboxChecked } from 'react-icons/im'
import { BsInputCursorText } from 'react-icons/bs'
import { CgSelectR } from 'react-icons/cg'
import { quizzActions } from '../redux/quizzSlice';
import { useSelector, useDispatch, shallowEqual, connect } from 'react-redux';

function QuestionType(props) {

    const [selected, setSelect] = useState("TEXT")

    const setSelected = (selected) => {
        setSelect(selected)
        props.setSelected(props.quizzIndex, selected)

    }

    useEffect(() => {
        if(props.type !== undefined) {
            setSelect(props.type)
        }
    }, [props.type])


    return (
        <div className="flex flex-col justify-center items-center bg-gray-120 w-fit p-2 rounded-lg m-2 ">
            <div className={"cursor-pointer " + (selected === "TEXT" ? " bg-gray-400 rounded-xl" : "")} onClick={() => setSelected("TEXT")}>
                <BsInputCursorText size="35" className="m-2" />
            </div>
            <div className={"cursor-pointer " + (selected === "CHECKBOX" ? " bg-gray-400 rounded-xl" : "")} onClick={() => setSelected("CHECKBOX")}>
                <ImCheckboxChecked size="30" className="m-2 " />
            </div>
            <div className={"cursor-pointer " + (selected === "LIST" ? " bg-gray-400 rounded-xl" : "")} onClick={() => setSelected("LIST")}>
                <CgSelectR size="40" className="m-1" />
            </div>
        </div>
    );
}

export default QuestionType;