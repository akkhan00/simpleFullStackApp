import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <div className='h-screen bg-black text-white flex flex-col justify-center items-center'>
            <h1 className='font-bold text-3xl p-4'>Signup</h1>
            <form className='w-10/12 p-5 flex flex-col shadow-lg shadow-gray-800 rounded-md bg-indigo-600 bg-opacity-5'>
                <input type="email" className='bg-black p-2 my-3 border-b-2 focus:border-2 border-gray-300 rounded-lg outline-none' placeholder='Email Address' />
                <input type="password" className='bg-black p-2 my-3 border-b-2 focus:border-2 border-gray-300 rounded-lg outline-none' placeholder='Password' />
                <Link to="/login" className='my-2 p-1 text-right cursor-pointer text-blue-600'>Already have an account ?</Link>
                <button className='bg-blue-900 my-3 p-2 rounded-md'>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup