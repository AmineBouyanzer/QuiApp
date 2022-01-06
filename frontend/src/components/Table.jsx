import React, { useEffect } from 'react';
import { useState } from 'react';
import TableRow from './TableRow';
import Modal from './Modal'


function Table(props) {

    useEffect(() => {
    }, [props.quizz])

    const [open, setOpen] = useState(false)
    const [currentId, setCurrentId] = useState(null)
    const [action, setAction] = useState("edit")

    const setModal = (value) => {
        setOpen(value);
    }

    const setId = (value) => {
        setCurrentId(value);
    }

    const setCurrentAction = (value) => {
        setAction(value);
    }

    return (
        <div className="flex flex-col bg-gray-100 ">
            <div className="overflow-x-auto">
                <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden mx-6 sm:mx-0 ">
                        <table className="l:w-2/3 mx-2 w-1/3 mx-auto my-4 border border-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Catégorie
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Titre
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Statut
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Note
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {
                                    props.quizz.map((value) => {
                                        if (value.status !== "Archived") {
                                            return <TableRow id={value.id} category={value.category} title={value.name} rate={value.rating} status={value.status} key={value.name} setModal={setModal} setCurrentAction={setCurrentAction} setId={setId} />
                                        }
                                    })
                                }
                            </tbody>
                        </table>
                        <div className='flex flex-row items-center justify-center'>
                            <button className={"p-2 mx-2  rounded-md text-white " + (props.page == 1 ? "bg-indigo-300 cursor-default" : "bg-indigo-600 cursor-pointer")} disabled={props.page == 1} onClick={() => props.decrementPage()}> Prec</button>
                            <span>{props.page}</span>
                            <button className={"p-2 mx-2  rounded-md text-white " + ((props.page * 5) >= props.max ? "bg-indigo-300 cursor-default" : "bg-indigo-600 cursor-pointer")} disabled={(props.page * 5) >= props.max} onClick={() => props.incrementPage()}>Suiv</button>
                        </div>
                            <Modal open={open} id={currentId} setModal={setModal} setId={setId} action={action} />
                        </div>
                    </div>
                </div>
            </div>
            );
}

            export default Table;