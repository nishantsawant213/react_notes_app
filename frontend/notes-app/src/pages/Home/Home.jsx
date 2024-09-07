import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import Toast from '../../components/ToastMessange/Toast.jsx'
import EmptyCard from '../../components/Cards/EmptyCard.jsx'

const Home = () => {

    const [openAddEditModel, setOpenAddEditModel] = useState({
        isShown: false,
        type: "add",
        data: null,
    });
    const [showToastMsg, setshowToastMsg] = useState({
        isShown: false,
        message: "",
        type: "",
    });

    const [userInfo, setUserInfo] = useState(null);
    const [allNotes, setAllNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const filteredNotes = allNotes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const getUserInfo = async () => {
        try {
            console.log('this is login');

            const response = await axiosInstance.get("/getuser");

            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }

        } catch (error) {
            console.log(error);
            if (error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    }



    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/allnotes");
            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes);
            }

        } catch (error) {
            console.log('an unexpected error occured, please try again');
        }
    }

    const editNote = async (notedetails) => {
        setOpenAddEditModel({ isShown: true, data: notedetails, type: "edit" })
    }


    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };



    const handleShowToast = (message, type) => {
        setshowToastMsg({
            isShown: true,
            message,
            type
        })
    }

    const handleCloseToast = () => {
        setshowToastMsg({
            isShown: false,
            message: "",
        })
    }

    const handleDeleteNote = async (noteData) => {
        try {
            const response = await axiosInstance.get("/deletenote/" + noteData._id,)
            console.log(response);
            if (response.data && !response.data.error) {
                console.log('working');
                handleShowToast("Note Deleted Successfully", "delete");
                getAllNotes();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                console.log('an unexpected error occured, please try again');
            }
        }
    }

    const updateIsPinned = async (noteData) => {
        try {
            const response = await axiosInstance.put("/updatenotepinned/" + noteData._id, {
                "isPinned": !noteData.isPinned,
            })
            console.log(response);
            if (response.data && response.data.note) {
                handleShowToast("Note Pinned successfully");
                getAllNotes();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                console.log('an unexpected error occured, please try again');
            }
        }
    }



    useEffect(() => {
        getAllNotes();
        getUserInfo();
        console.log('allnotes', allNotes)
        return () => {

        }
    }, [])


    return (
        <>
            <div className='container'>
                <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} userInfo={userInfo} />

                <div className="container mx-auto p-2">
                    {
                        filteredNotes.length > 0 ? (
                            <div className="grid grid-cols-3 gap-4 mt-8">
                                {filteredNotes.map((note, index) => {
                                    return <NoteCard
                                        key={note._id}
                                        title={note.title}
                                        content={note.content}
                                        date={note.createdOn}
                                        tags={note.tags}
                                        isPinned={note.isPinned}
                                        onDelete={() => handleDeleteNote(note)}
                                        onEdit={() => (editNote(note))}
                                        onPinNote={() => updateIsPinned(note)}
                                    />
                                })}
                            </div>) : <EmptyCard />
                    }

                </div>
                <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-10 bottom-10' onClick={() => {
                    setOpenAddEditModel({
                        isShown: true, type: "add", data: null
                    });
                }} >
                    <MdAdd className='text-[32px] text-white' />
                </button>

                <Modal
                    isOpen={openAddEditModel.isShown}
                    onRequestClose={() => { }}
                    style={{
                        overlay: {
                            backgroundColor: "rgba(0,0,0,0.2)",
                        }
                    }}
                    contentLabel=""
                    className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
                >
                    <AddEditNotes
                        type={openAddEditModel.type}
                        noteData={openAddEditModel.data}
                        onClose={() => {
                            setOpenAddEditModel({
                                isShown: false,
                                data: null,
                                type: "add"
                            })
                        }}
                        getAllNotes={getAllNotes}
                        showToastMsg={handleShowToast}
                    />
                </Modal>

                <Toast
                    isShown={showToastMsg.isShown}
                    message={showToastMsg.message}
                    type={showToastMsg.type}
                    onClose={handleCloseToast}


                />
            </div>



        </>
    )


}

export default Home