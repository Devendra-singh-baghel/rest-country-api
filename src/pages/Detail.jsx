import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountryDetails } from '../store/countryDetailsSlice'
import { fetchCountries } from '../store/countriesSlice'
import { useParams } from 'react-router'
import BackButton from '../components/BackButton'
import Loader from '../components/Loader'
import { Link } from 'react-router'

function Detail() {
    const { name } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.countryDetails);
    const { filtered } = useSelector((state) => state.countries);

    useEffect(() => {
        if (name) {
            dispatch(fetchCountryDetails(name));
        }
    }, [dispatch, name]);

    useEffect(() => {
        dispatch(fetchCountries({
            region: "All",
            fields: "name,region,flags,population,capital,borders,cca3"
        }));
    }, [dispatch, filtered.length]);

    const country = filtered.find(
        (c) => c.name.common.toLowerCase() === name.toLowerCase()
    );

    if (!country) return <p>Country not found</p>;

    const borderCountries = country.borders?.map((code) => {
        const match = filtered.find((c) => c.cca3 === code);
        return match ? match.name.common : code;
    })

    if (loading) return <Loader />;
    if (error) return <p>Error: {error}</p>;
    if (!data) return null;

    return (
        <div className='min-h-screen h-full bg-gray-50 dark:bg-[#202c37] pt-10 lg:pt-20'>

            <div className='ml-10 lg:ml-50 mb-10'>
                <BackButton />
            </div>

            <div className='flex flex-col lg:flex-row justify-around max-w-4/5 lg:max-w-3/4 mx-auto rounded'>
                <div>
                    <img src={data.flags?.svg} alt={data.flags?.alt || data.name?.common}
                        className='h-[200px] lg:h-[350px] w-[450px] rounded-l' />
                </div>

                <div className='flex flex-col gap-3 mt-14 lg:mt-6'>
                    <h2 className='text-gray-950 dark:text-white font-extrabold text-xl'>
                        {data.name?.common}
                    </h2>

                    <div className='flex flex-col lg:flex-row gap-10 lg:gap-20 text-gray-950 dark:text-white mt-3'>
                        <div className='text-sm space-y-4'>
                            <div>
                                <span className='font-bold'>Native Name: </span>
                                <span>{Object.values(data.name?.nativeName || {})[0]?.common}</span>
                            </div>
                            <div>
                                <span className='font-bold'>Population: </span>
                                <span>{data.population?.toLocaleString()}</span>
                            </div>
                            <div>
                                <span className='font-bold'>Region: </span>
                                <span>{data.region}</span>
                            </div>
                            <div>
                                <span className='font-bold'>Sub Region: </span>
                                <span>{data.subregion}</span>
                            </div>
                            <div>
                                <span className='font-bold'>Capital: </span>
                                <span>{data.capital?.join(', ')}</span>
                            </div>
                        </div>

                        <div className='text-sm space-y-2'>
                            <div>
                                <span className='font-bold'>Top Level Domain: </span>
                                <span>{data.tld?.join(', ')}</span>
                            </div>
                            <div>
                                <span className='font-bold'>Currencies: </span>
                                <span>{Object.values(data.currencies || {})[0]?.name}</span>
                            </div>
                            <div>
                                <span className='font-bold'>Languages: </span>
                                <span>{Object.values(data.languages || {}).join(', ')}</span>
                            </div>
                        </div>
                    </div>

                    {borderCountries?.length > 0 && (
                        <div className='flex flex-col lg:flex-row lg:items-center mt-5 lg:mt-6'>
                            <span className='font-bold text-sm w-40 text-gray-950 dark:text-white '>Border Countries: </span>
                            <div className='flex flex-wrap items-center mt-3 lg:mt-0'>
                                {borderCountries.map((border) => (
                                    <span
                                        key={border}
                                        className="ml-1 mt-1 bg-gray-50 dark:bg-[#2b3845] text-gray-950 dark:text-white px-4 py-2 border border-gray-300 dark:border-none rounded-xs text-xs shadow-md dark:hover:bg-gray-700 hover:bg-gray-200 duration-700 transition-all"
                                    >
                                        {border}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Detail
