import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router';

function BackButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className='bg-gray-50 dark:bg-[#2b3845] text-gray-950 dark:text-white px-4 py-2 border border-gray-300 dark:border-none rounded-xs text-xs shadow-md inline-block  cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 duration-700 transition-all'
        >
            <div className='flex justify-center items-center gap-3'>
                <IoIosArrowRoundBack size={20} />
                <span>Back</span>
            </div>
        </button>
    );
}

export default BackButton;
