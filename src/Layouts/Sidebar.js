import React, {useState} from 'react';
import {
    ExploreIcon,
    HomeIcon,
    MessageIcon,
    MoreIcon,
    NotificationIcon,
    ProfileIcon
} from '../Icons/Icon'
import logo from '../Images/batukar.png'
import SideLinks from "../Components/SideLinks";
import UserBox from "../Components/UserBox";

// ? icon array list
const sideLinks = [
    {
        name: 'Home',
        icon: HomeIcon,
    },
    {
        name: 'Explore',
        icon: ExploreIcon,
    },
    {
        name: 'Notification',
        icon: NotificationIcon,
    },
    {
        name: 'Message',
        icon: MessageIcon,
    },
    {
        name: 'Profile',
        icon: ProfileIcon,
    },
    {
        name: 'More',
        icon: MoreIcon,
    }
]

const Sidebar = () => {
    const[activate, setActivate] = useState('Home')

    const handleMenuItemClick = (name) => {
        setActivate(name)
    }

    return (
        <div className='flex flex-col justify-between w-72 px-2 pt-2'>
            <div className=''>
                <div className='mt-1 mb-4 flex items-center justify-center w-16 h-16 rounded-full
                    hover:bg-dark-innerFrame transition cursor-pointer'>
                    <img src={logo} alt="batukar" className='w-12'/>
                </div>
                <nav className='mx-1 py-1 px-1 bg-dark-frame 2xl:rounded-2xl'>
                    <ul>{sideLinks.map(item => (
                        <SideLinks
                            key={item.name}
                            name={item.name}
                            Icon={item.icon}
                            activate={activate}
                            onMenuItemClick={handleMenuItemClick}
                        />
                    ))}</ul>
                </nav>
                <button className='mt-5 bg-dark-frame text-white rounded-full py-3 px-8 w-full shadow-lg
                    hover:bg-dark-innerFrame transform transition-colors duration-400'>CV</button>
            </div>
            <UserBox/>
        </div>
    );
};

export default Sidebar;
