import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import toast from 'react-hot-toast'
import {Link} from 'react-router'
import { Loader, Loader2, LoaderCircleIcon, LoaderPinwheel, LucideLoaderCircle, Trash } from 'lucide-react'
import {formatDate} from '../utils/format-date.js'

const Home = () => {

  const [isRateLimited , setIsrateLimited] = useState(false); 
  const [notes,setNotes]= useState([]);
  const [loading,setloading] = useState(true);
  const [deletingID,setDeletingID]=useState(null)

useEffect(()=>{
  const fetchNotes =async ()=>{
    try {
      const res = await axios.get("https://note-app-backend-dced.onrender.com/api/notes/");
      console.log(res.data)
      setNotes(res.data) 
      setIsrateLimited(false)
    } catch (error) {
      console.log(error)
      if(error.response.status === 429){
        setIsrateLimited(true)
      }
      else{
        toast.error("Failed to fetch notes")
      }
      
    }
    finally{
      setloading(false)
    }
  }
  fetchNotes();
},[])

const deleteNote=   async (note_id)=>{
  setDeletingID(note_id)
  try {
    await axios.delete(`https://note-app-backend-dced.onrender.com/api/notes/${note_id} `)
    setNotes((prevNotes) => prevNotes.filter((n) => n._id !== note_id));
    toast.success("Note deleted Successfully ")

  } catch (error) {
    toast.error("Error in deleting note !")
    
  }
  finally{
    setDeletingID(null)
  }
}

  return (
    <div>
    <Navbar />

    {isRateLimited && <p> Too many requests ! please try again later </p>}

    {loading && <h1 className='loading'> <Loader className='loader-icon' size={32}/> Getting Notes..</h1>}
    {notes.length >0 && !isRateLimited && (<div className='notes-parent'> 
      {notes.map((note) =>(
        <div   key={note._id}>

        <div  className='note'>

          <h3 className='note-title'>{note.title}</h3>
          <p className='note-content'>{note.content}</p>

          <div className='created-at'>
             <div className='date'> <div>{formatDate(note.createdAt)} </div>  <div>{ deletingID === note._id ? (<Loader className='loader-icon-deleting' />) : (<span className='trash-icon' onClick={()=>{deleteNote(note._id)}}> <Trash size={20} color='red'/></span> ) } </div></div> 
          </div>

          
        </div>
        </div>
      ))}
      </div>)}

    </div>
  )
}

export default Home