import { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

function FilterBox({ selected, onRegionSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    // const [selected, setSelected] = useState("Filter by Region");
    const dropdownRef = useRef(null);

    const options = ["All", "Africa", "America", "Asia", "Europe", "Oceania"];

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (region) => {
        // setSelected(region);
        setIsOpen(false);
        onRegionSelect(region); // send to parent
    };

    return (
        <div ref={dropdownRef} className="w-40 text-sm relative ">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="filter-box"
                className="w-full text-left px-4 pr-2 py-3 rounded bg-white text-gray-800 dark:bg-[#2b3845] dark:text-white shadow dark:shadow-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 duration-500 transition-all"
            >
                {selected}
                <span className={`transform transition ${isOpen ? "rotate-180" : ""} absolute right-2`}>
                    <RiArrowDropDownLine size={20} className="opacity-70" />
                </span>
            </button>

            {isOpen && (
                <ul className="w-full bg-white dark:bg-[#2b3845] dark:text-white rounded shadow-md mt-1 py-2 absolute animate-fadeIn">
                    {options.map((region) => (
                        <li
                            key={region}
                            className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                            onClick={() => handleSelect(region)}
                        >
                            {region}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default FilterBox;
