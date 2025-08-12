import React from 'react'
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { toggleTheme } from '../store/themeSlice';
import { useDispatch, useSelector } from 'react-redux';

function Navbar() {

    const dispatch = useDispatch();
    const mode = useSelector((state) => state.theme.mode);

    return (
        <nav className='bg-white dark:bg-[#2b3845] dark:text-white flex justify-between z-50 shadow'>
            <h2 className='text-gray-950 dark:text-white text-sm lg:text-2xl py-8 lg:py-4 pl-3 lg:pl-22 font-extrabold'>Where in the world?</h2>

            <button
                type='button'
                className="flex justify-center items-center gap-2 mr-3 lg:mr-24 cursor-pointer text-sm"
                onClick={() => dispatch(toggleTheme())}
            >
                {
                    mode === 'light' ?
                        (
                            <div className='flex justify-center items-center gap-2 '>
                                <MdOutlineDarkMode />
                                <span>Dark Mode</span>
                            </div>
                        )
                        :
                        (
                            <div className='flex justify-center items-center gap-2'>
                                <MdOutlineLightMode />
                                <span>Light Mode</span>
                            </div>
                        )
                }
            </button >


        </nav >
    )
}

export default Navbar
