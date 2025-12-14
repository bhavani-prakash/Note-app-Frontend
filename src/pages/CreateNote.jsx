import axios from 'axios';
import { ArrowLeft, BackpackIcon, SendToBack, StepBack, StepBackIcon } from 'lucide-react';

import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useNavigate,Link } from 'react-router';

const CreateNote = () => {

  const [title,setTitle]= useState(null);
  const [content,setContent]=useState(null);
  const [loading,setLoading]=useState(false)
  const Navigate = useNavigate() ;

  const pushDataToDB = async (e)=>{
    e.preventDefault();
    console.log(title)
    console.log(content)
    if(!title.trim() || !content.trim()){
      toast.error("All feilds are required !");
      return;
    }

    setLoading(true)
    try {
      await axios.post("https://note-app-backend-dced.onrender.com/api/notes" , {
        title,
        content
      })
      Navigate('/')
      
      toast.success("Note created succesfully ")
      
     
    } catch (error) {
      toast.error(" ! Error ")
      console.log(error)
      
    }
    finally{
      setLoading(false)
    }

    

  }


  return (
    <div>
      <div className='creat-note-div'>
      
       <form onSubmit={pushDataToDB} className='create-note-form'>
        <h1>Create Note</h1>
        <label className='title'>Title :</label>
        <input type="text" onChange={(e)=>setTitle(e.target.value)} />
        <label> Content :</label>
        <input type="text" onChange={(e)=>setContent(e.target.value)} />
        <div className='btn-div'>
              <button type='submit' className='note-submit-btn'>{loading ? "creating..." : "Create Note"}</button>
              <Link to="/">
            <button type="button" className='back-to-home'><ArrowLeft size={15}></ArrowLeft> Back</button>
          </Link>
        </div>
       </form>
      </div>
    </div>
  )
}

export default CreateNote