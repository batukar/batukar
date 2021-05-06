import React from 'react';

const SideLink = ({name, Icon, activate, onMenuItemClick}) => {
    const isActive = activate === name;
    return (
        <li className='group' onClick={() => onMenuItemClick(name)}>
            <a href={name.toLowerCase()} className='block text-xl mb-2 cursor-pointer pointer-events-none'>
                <div className='inline-block'>
                    <div className={`flex items-center group-hover:bg-dark-content group-hover:text-dark-frame
                         rounded-2xl pl-5 pr-8 py-3 ${isActive ? "text-dark-content" : ""}`}>
                        <Icon/>
                        <span className='ml-4 font-bold'>{name}</span>
                    </div>
                </div>
            </a>
        </li>
    );
};

export default SideLink;
