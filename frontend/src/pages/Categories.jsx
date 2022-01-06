import React, { useEffect, useState } from 'react';
import Category from '../components/Category';
import { getAllCategories } from "../_actions/Quizz_actions"
import { convertNameEngToFr } from "../utils/utils"



function Categories() {

    const [categoryList, setcategoryList] = useState([])

    useEffect(() => {
        getAllCategories().then(e => {
            setcategoryList(e);
        })
    }, [])

    return (
        <div className="flex w-full h-full m-auto bg-gray-100">
            <div className="grid 5xl:grid-cols-4 5xl:grid-rows-3 w-full  lsl:grid-cols-3 lsl:grid-rows-4 p-2 lsl:p-4 5xl:p-24 sm:grid-cols-2 sm-grid-rows-6  grid-cols-1 grid-rows-12 gap-y-6">
                {
                    categoryList.map((country, index) => {
                        let nameFr = convertNameEngToFr(country)
                        return <Category key={index} name={country} nameFr={nameFr} size={110}/>
                    })
                }

            </div>
        </div>


    );
}

export default Categories;