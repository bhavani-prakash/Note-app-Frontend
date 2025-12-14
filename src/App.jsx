import React from 'react'
import Home from './pages/Home'
import CreateNote from './pages/CreateNote'
import { Route,Routes } from 'react-router'
import NotesDetailsPage from './pages/NotesDetailsPage'
import toast from "react-hot-toast"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/note/:id" element={<NotesDetailsPage />} />
      </Routes>
    </div>
  )
}

export default App