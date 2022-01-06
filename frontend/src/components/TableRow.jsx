import React from 'react';
import Icon from './Icon';
import { BiEdit } from 'react-icons/bi'
import { FiPlay } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'

function TableRow(props) {

    const getStatus = (status) => {
        if (status === "Published") {
            return "Publié";
        }
        return "Brouillon"
    }
  
    const onEditClick = () => {
        props.setModal(true); 
        props.setId(props.id);
        props.setCurrentAction("edit")
    }

    const onDeleteClick = () => {
        props.setModal(true); 
        props.setId(props.id);
        props.setCurrentAction("delete")
    }


    const onPlayClick = () => {
        props.setModal(true); 
        props.setId(props.id);
        props.setCurrentAction("play")
    }


    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex ">
                    <div className="">
                        <Icon name={props.category} class="" size="60" />
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{props.title}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                {
                    getStatus(props.status) === "Publié" ?
                        <span className="px-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-200 text-black">
                            Publié
                        </span>
                        :
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-200 text-black">
                            Brouillon
                        </span>
                }

            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {props.rate === -1 ?
                <span>N/A</span> 
                :
                <span>{props.rate}</span>
                }
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center justify-around">

                {
                    getStatus(props.status) === "Publié" ?
                        <div className="flex flex-col text-center w-fit" onClick={() => onPlayClick()}>
                            <FiPlay className="font-bold cursor-pointer text-black mx-auto" size="25" />
                            <span className="text-[0.8em] sm:text-sm md:text-md lg:text-lg">Jouer</span>
                        </div>
                        :

                        <BiEdit className="font-bold cursor-pointer  text-black w-full" size="50" onClick={() => onEditClick() } />

                }
                        <RiDeleteBinLine className="font-bold cursor-pointer  text-black w-full" size="50" onClick={() => onDeleteClick() } />
                </div>
            </td>
        </tr>
    );
}

export default TableRow;