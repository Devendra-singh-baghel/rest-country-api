import React, { forwardRef } from "react";
import { GrSearch } from "react-icons/gr";

function SearchBar({
    placeholder = "Search...",
    value,
    onChange,
    className = ""
},
    ref) {
    return (
        <div
            className={`text-sm bg-white dark:bg-[#2b3845] dark:text-white relative w-full rounded shadow dark:shadow-lg  hover:bg-gray-200 dark:hover:bg-gray-700 duration-500 transition-all ${className}`}
        >
            <input
                ref={ref}
                type="search"
                aria-label={placeholder}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="py-3 pl-12 pr-4 rounded w-full outline-none text-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-100"
            />
            <GrSearch className="absolute top-4 left-5 opacity-55 text-gray-500 dark:text-gray-300" />
        </div>
    );
}


export default React.forwardRef(SearchBar);
