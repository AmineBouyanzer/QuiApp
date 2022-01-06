import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';


function Category(props) {

    const navigate = useNavigate();
    const [name, setName] = useState(props.name.charAt(0).toLowerCase() + props.name.slice(1))


    return (
        <div className={"flex flex-col  w-full hover:text-indigo-900 font-bold  h-full cursor-pointer text-center justify-around border border-gray-300  bg-white shadow-lg mx-auto w-2/3 rounded-xl hover:transition ease-in-out delay-50  hover:-translate-y-1 "} onClick={() => navigate('/categories/'+ name)}>
           
                <Icon name={props.name} size={props.size} className="flex w-fit"/>
                <span className={(props.className === undefined ? "flex justify-center py-2 sm:text-2xl text-xl truncate" : props.className)}>{props.nameFr}</span>

        </div>
    );
}

export default Category;