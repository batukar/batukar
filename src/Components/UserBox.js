import React from 'react';
import profileImage from '../Images/batuhan.jpg'

const UserBox = () => {
    return (
        <div className='group flex justify-between items-center mb-6 bg-dark-frame hover:bg-dark-innerFrame
                    cursor-pointer rounded-3xl py-2 px-2 transform transition-colors duration-200'>
            <img src="https://pbs.twimg.com/profile_images/1148597447758876676/hcMOPceG_400x400.jpg"
                 className='w-16 h-16 rounded-3xl'
                 alt="Profile-pic"/>
            <div className='flex flex-col'>
                <span className='font-bold text-lg text-black group-hover:text-gray-500 transform transition-colors'>Batuhan Karadağ</span>
                <span className='text-sm text-gray-400'>İnönü Üniversitesi</span>
            </div>
            <div className='flex space-x-1'>
                <div className='w-1 h-1 bg-gray-900 rounded-full' />
                <div className='w-1 h-1 bg-gray-900 rounded-full' />
                <div className='w-1 h-1 bg-gray-900 rounded-full' />
            </div>
        </div>
    );
};

export default UserBox;
