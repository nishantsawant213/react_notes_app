import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
const Navbar = ({searchQuery , setSearchQuery, userInfo}) =>{

    const navigate = useNavigate();

    const onLogout = ()=>{
        localStorage.clear()
        navigate('/login');
    }   

    const handleSearch = ()=>{
        setSearchQuery("")
    }

    return (
        <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
            <h2 className='text-xl font-medium text-black py-2'>Notes</h2>
        
        {userInfo &&  <SearchBar value={searchQuery} onChange={(e)=>{
            setSearchQuery(e.target.value);
            
        }} onClearSearch={()=>{setSearchQuery("")}}
        handleSearch={handleSearch}
        />}

        <ProfileInfo userInfo={userInfo}  onLogout={onLogout} />
        </div>
    )
}

export default Navbar