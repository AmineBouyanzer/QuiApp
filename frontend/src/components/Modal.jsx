import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { quizzActions } from '../redux/quizzSlice';
import { useNavigate } from 'react-router';
import { unlockQuizz,deleteQuizz } from '../_actions/Quizz_actions';

function Modal(props) {
  const cancelButtonRef = useRef(null);
  const [password, setPassword] = useState("");
  const [wrongPass, setWrongPass] = useState(false)
  const [wrongPseudo, setWrongPseudo] = useState(false)
  const [pseudo, setPseudo] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modal = () => {
    return (props.open && props.id !== null);
  }

  const unlock = () => {
    const unlock = {
      "id": props.id,
      "password":password
    }
    if(props.action == "edit") {
      unlockQuizz(unlock).then(e => {
        if (e.status == 200) {
          setWrongPass(false);
          navigate("/edit/"+props.id)
        } else {
          setWrongPass(true)
        }
      })
    }else if(props.action == "delete") {
      unlockQuizz(unlock).then(e => {
        if (e.status == 200) {
          deleteQuizz(props.id).then(e => {
            if(e.status == 200) {
              setWrongPass(false);
              reset();
              window.location.reload();
            }else {
               setWrongPass(true)
            }
          })
        }else {
          setWrongPass(true)
        }
      })
    }else {
      if (pseudo.length != 0) {
        setWrongPseudo(false);
        dispatch(quizzActions.setName(pseudo))
        navigate("/game/"+props.id)
      } else  {
        setWrongPseudo(true);
      }
    }
  }

  const reset = () => {
    props.setModal(false);
    props.setId(null);
    dispatch(quizzActions.setName(""));
    setPassword("");
    setPseudo("");
    setWrongPseudo(false)
    setWrongPass(false)
  }

  const actionType = () => {
    if (props.action === "edit") {
      return <span>Déverouiller</span>
    } else if (props.action === "play") {
      return <span>Jouer</span>
    } else {
      return <span>Supprimer</span>
    }
  }

  return (
    <Transition.Root show={modal()} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={() => { reset() }}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {
                    props.action !== "play" ?
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <div className="mt-2">
                          <input
                            type="password"
                            className="mt-2 text-xl py-1 px-0.5 border-2 rounded-lg placetext-gray-500"
                            placeholder="Entrez le mot de passe"
                            value={password}
                            onChange={e => { setPassword(e.target.value) }}
                          />
                        </div>
                        <div className="p-2 text-red-500 text-sm">
                          {
                            wrongPass ?
                              <span> Mot de passe incorrect ! </span>
                              :
                              <span></span>
                          }
                        </div>
                      </div>
                      :
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <div className="mt-2">
                          <input
                            type="text"
                            className="mt-2 text-xl py-1 px-0.5 border-2 rounded-lg placetext-gray-500"
                            placeholder="Entrez votre pseudo"
                            value={pseudo}
                            onChange={e => { setPseudo(e.target.value) }}
                          />
                        </div>
                        <div className="p-2 text-red-500 text-sm">
                          {
                            wrongPseudo ?
                              <span> Entrez un pseudo ! </span>
                              :
                              <span></span>
                          }
                        </div>
                      </div>

                  }
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className={"w-full items-center justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm " + (props.action !== "delete" ? "bg-indigo-600 hover:bg-indigo-300" : "bg-red-600 hover:bg-red-300")}
                  onClick={() => unlock()}
                >
                  {
                    actionType()
                  }

                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md px-4 py-2 bg-white text-base border-2 font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm focus:ring-0 focus:outline-none"
                  onClick={() => { reset() }}
                  ref={cancelButtonRef}
                >
                  Retour
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal;