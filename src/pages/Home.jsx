import React, { useEffect, useState } from 'react'
import CountriesCard from '../components/CountriesCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries, searchCountries, resetSearch } from '../store/countriesSlice'
import FilterBox from '../components/FilterBox';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router';
import Loader from '../components/Loader';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";


function Home() {

    const dispatch = useDispatch();
    const { filtered, loading, error } = useSelector((state) => state.countries);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("Filter by Region");


    // pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;


    useEffect(() => {
        dispatch(fetchCountries({
            region: "All",
            fields: "name,region,flags,population,capital"
        }));
    }, [dispatch]);


    //filter handler
    const handleRegionSelect = (region) => {
        dispatch(fetchCountries({
            region,
            fields: "name,region,flags,population,capital"
        }));
        setSearchTerm("");
        setSelectedRegion(region);
        setCurrentPage(1);
    };


    // Search handler
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term.trim() === "") {
            dispatch(resetSearch());
        } else {
            dispatch(searchCountries(term));
        }
        setCurrentPage(1);
    };

    if (loading) return <Loader />;
    if (error) return <p>Error: {error}</p>


    // Pagination calculations
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const indexOfLastCountry = currentPage * itemsPerPage;
    const indexOfFirstCountry = indexOfLastCountry - itemsPerPage;
    const currentItems = filtered.slice(indexOfFirstCountry, indexOfLastCountry);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Pagination logic to show max 5 pages
    const getPageNumbers = () => {
        let start = Math.max(currentPage - 2, 1);
        let end = Math.min(start + 4, totalPages);

        // Adjust start if we don't have enough pages at the end
        start = Math.max(end - 4, 1);

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    return (
        <div className='min-h-screen h-full bg-gray-100 dark:bg-[#202c37] dark:text-white lg:px-14 pb-10'>
            <div className='flex flex-col lg:flex-row gap-14 lg:gap-0 justify-between mb-5 py-8 px-5 lg:p-8'>
                <div className='text-sm relative lg:w-1/4 md:w-1/3 sm:w-2/4 w-full'>
                    <SearchBar
                        placeholder="Search for a country..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <div className='text-sm'>
                    <FilterBox
                        selected={selectedRegion}
                        onRegionSelect={handleRegionSelect}
                    />
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14'>
                {
                    currentItems.map((country) => (
                        <Link to={`/country/${country.name.common}`} key={country.name.common} className='flex justify-center items-center cursor-pointer hover:-translate-y-2 duration-300 transition-all'>
                            <CountriesCard
                                flag={country.flags.png}
                                alt={country.name.common}
                                country={country.name.common}
                                population={country.population.toLocaleString()}
                                region={country.region}
                                capital={country.capital?.[0]}
                            />
                        </Link>
                    ))
                }
            </div>


            {/* Pagination UI */}
            <div className="flex items-center justify-between w-full max-w-80 mx-auto mt-14 text-gray-500 font-medium">
                {/* Prev Button */}
                <button
                    type="button"
                    aria-label="prev"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-full bg-slate-200/50 disabled:opacity-50 cursor-pointer"
                >
                    <FaAngleLeft size={40} />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-2 text-sm font-medium">
                    {getPageNumbers().map((num) => (
                        <button
                            key={num}
                            onClick={() => goToPage(num)}
                            className={`h-10 w-10 flex items-center justify-center cursor-pointer aspect-square ${currentPage === num
                                ? "text-indigo-500 border border-indigo-200 rounded-full"
                                : ""
                                }`}
                        >
                            {num}
                        </button>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    type="button"
                    aria-label="next"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="rounded-full bg-slate-200/50 disabled:opacity-50 cursor-pointer"
                >
                    <FaAngleRight size={40} />
                </button>
            </div>
        </div>
    )
}

export default Home