import React from "react";


import bwlogo from '../assests/baoswheelslogo.png';
import { Link } from "react-router-dom";

const UnAuthorizedVisit = () => {





  return (
    <div className='relative h-screen justify-end items-center w-full bg-primary'>
            <h2 className='flex flex-col h-screen items-center  justify-center font-russoone text-5xl text-baseextra4 text-center'>
                {''}
                <img src={bwlogo} alt='bwlogo' className='bg-secondary p-3 rounded-2xl mb-20' style={{
                  width:'500px'
                }}/>
                You are not Authorized for This Procedure ;{''}
                <Link to="/">
                <button className='bg-baseextra4 p-3 rounded-full text-primary font-russoone text-xl mt-5 hover:drop-shadow-2xl'>
                  Back to Login
                </button></Link>
            </h2>

    </div>
  )
}

export default UnAuthorizedVisit;
