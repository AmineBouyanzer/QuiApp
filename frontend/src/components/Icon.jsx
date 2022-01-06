import React from 'react';
import { FaCar, FaMapMarkedAlt, FaDog, FaGamepad, FaReact, FaBriefcaseMedical } from 'react-icons/fa'
import { BiFootball } from 'react-icons/bi'
import { RiMusic2Fill } from 'react-icons/ri'
import { GiBrain } from 'react-icons/gi'
import { CgScreen } from 'react-icons/cg'
import { MdOutlineComputer } from 'react-icons/md'
import { GiNotebook } from 'react-icons/gi'

function Icon(props) {

    const displayIcon = () => {
        switch (props.name) {
            case 'Sports':
                return <BiFootball className="mx-auto my-auto" size={props.size} />
            case 'Automotive':
                return <FaCar className="mx-auto my-auto" size={props.size} />
            case 'Geography':
                return <FaMapMarkedAlt className="mx-auto my-auto" size={props.size} />
            case 'Music':
                return <RiMusic2Fill className="mx-auto my-auto" size={props.size} />
            case 'Animals':
                return <FaDog className="mx-auto my-auto" size={props.size} />
            case 'Video_games':
                return <FaGamepad className="mx-auto my-auto" size={props.size} />
            case 'General_Culture':
                return <GiBrain className="mx-auto my-auto" size={props.size} />
            case 'Science':
                return <FaReact className="mx-auto my-auto" size={props.size} />
            case 'Movies':
                return <CgScreen className="mx-auto my-auto" size={props.size} />
            case 'Computer_science':
                return <MdOutlineComputer className="mx-auto my-auto" size={props.size} />
            case 'Medicine':
                return <FaBriefcaseMedical className="mx-auto my-auto" size={props.size} />
            case 'Literature':
                return <GiNotebook className="mx-auto my-auto" size={props.size} />
        }
    }


    
    return (
        <div className={props.class == null ? "flex " : props.class}>
            {displayIcon()}
        </div>
    );
}

export default Icon;