import React, {useState, useEffect} from 'react';
import Table from '../components/Table';
import {getAllQuiz} from "../_actions/Quizz_actions"

function Home() {

    const [tab, setTab] = useState([])
    const [page, setPage] = useState(1)
    const [max, setMax] = useState(null)
    const [hasCharged, setHasCharged] = useState(false)
    

    useEffect(() => {
        getAllQuiz().then(e => {
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
        <div className="w-full sm:h-full h-[1400px] min-w-min bg-gray-100">
            {
                hasCharged ? 
                <Table quizz={tab} incrementPage={incrementPage} decrementPage={decrementPage} page={page} max={max}/>
                : 
                <div></div>
            }
           
            {/* <div className='flex flex-row items-center justify-center'>
            <button className={"p-2 mx-2  rounded-md text-white " + (page == 1 ? "bg-indigo-300 cursor-default" : "bg-indigo-600 cursor-pointer")} disabled={page == 1} onClick={decrementPage}> Prec</button>
            <span>{page}</span>
            <button className={"p-2 mx-2  rounded-md text-white " + ((page * 5) >= max ? "bg-indigo-300 cursor-default" : "bg-indigo-600 cursor-pointer")}  disabled={(page * 5) >= max} onClick={incrementPage}>Suiv</button>

            </div> */}
        </div>
    );
}


export default Home;