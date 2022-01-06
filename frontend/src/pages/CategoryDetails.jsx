import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import { useParams } from "react-router-dom";
import { getCategory } from '../_actions/Quizz_actions'   

function CategoryDetails() {

    const { category } = useParams();
    const [tab, setTab] = useState([])
    const [page, setPage] = useState(1)
    const [max, setMax] = useState(null)
    const [hasCharged, setHasCharged] = useState(false)

    useEffect(() => {
        getCategory(category).then(e => {
            setTab(e.slice( ((page - 1) * 5), (((page - 1) * 5) + 5)))
            setMax(e.length)
            setHasCharged(true)
        })
    }, [page, max])

    const incrementPage = () => {
        setPage(page + 1)
    }

    const decrementPage = () => {
        setPage(page - 1)
    }

    return (
        <div className="w-full min-w-min sm:h-full h-[1400px] bg-gray-100">
            {
                hasCharged ?
                <Table quizz={tab} incrementPage={incrementPage} decrementPage={decrementPage} page={page} max={max} />
                : 
                <div></div>
            }

        </div>

    );
}

export default CategoryDetails;