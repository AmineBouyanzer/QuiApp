import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosAdd } from 'react-icons/io'

function Navbar() {


    const navigate = useNavigate();

    return (
        <nav className="bg-white flex sm:flex-row justify-between border-b-2 border-gray-100 sm:h-16 h-24 min-h-min ssm:min-w-[550px] sm:px-6 mx-2 sm:m-0 sm:items-center items-left">
            <div className="flex sm:justify-items-start sm:items-center space-x-8">
                <div className="flex sm:flex-row flex-col sm:items-center items-left">
                    <h1 className="text-2xl sm:text-4xl text-white font-bold text-indigo-500 sm:p-2  sm:mr-8 hover:animate-spin">Quizz</h1>

                    <div className="flex flex-row items-left hover:bg-gray-100 rounded-lg" onClick={() => navigate("/")}>
                        <div className="font-raleway-sf text-white sm:mx-2 text-xl sm:p-2 cursor-pointer text-indigo-500 ">Accueil</div>
                    </div>
                    <div className="flex flex-row items-left hover:bg-gray-100 rounded-lg" onClick={() => navigate("/categories")}>
                        <div className="font-raleway-sf text-white sm:mx-2 text-xl sm:p-2 cursor-pointer text-indigo-500 ">Catégories</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row cursor-pointer bg-indigo-600 rounded-xl p-1 sm:p-2 my-auto sm:my-0 text-white h-fit shadow-sm hover:transition ease-in-out delay-50  hover:-translate-y-0.5  hover:bg-indigo-500" onClick={() => {navigate("/nouveau")}}>
                <IoIosAdd className="sm:self-center" size="25" /><span className="px-2">Nouveau Quizz</span>
            </div>

        </nav>
    );
}

export default Navbar;



