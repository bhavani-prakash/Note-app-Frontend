import React from 'react'
import {PlusIcon} from 'lucide-react'
import {Link} from 'react-router'


const Navbar = () => {
  return (
    <div>
        <div className='nav'>
            <h1>! NOTE </h1>
            <div className='user-info'>
              <h2>WELLCOME</h2>
              <p>BHAVANI PRAKASH</p>
              </div>
            <Link to={"/create"} className='nav-link'> <p>Create</p>
             <PlusIcon size={15} className='plus-icon'/>
             </Link>
        </div>
    </div>
  )
}

export default Navbar