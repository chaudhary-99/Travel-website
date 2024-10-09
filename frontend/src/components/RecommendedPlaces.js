import React, { useEffect, useRef, useState } from 'react';
import PopularDestinationsCard from './cards/PopularDestinationsCard';

const RecommendedPlaces = () => {
    const scrollContainerRef = useRef(null);
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        // Fetch popular destinations from backend
        const fetchDestinations = async () => {
            try {
                const response = await fetch('http://localhost:8000/popular-destinations'); // Adjust URL if needed
                const data = await response.json();
                setDestinations(data);
                console.log(data)
            } catch (error) {
                console.error("Error fetching destinations:", error);
            }
        };

        fetchDestinations();
    }, []);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { scrollLeft } = scrollContainerRef.current;
            const scrollAmount = 350;
            scrollContainerRef.current.scrollTo({
                left: scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="px-5 mb-20">
            <div className="flex justify-between">
                <div>
                    <div className="pl-[3.1vw] text-4xl font-bold">Popular  Destinations</div>
                    <div className="pl-[3.1vw] text-lg text-gray-500">From historical cities to natural spectaculars, come see the best of the world!</div>
                </div>
                <div className="flex items-center hidden lg:flex">
                    <div className="h-9 cursor-pointer mr-[15px]" onClick={() => scroll('left')}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-full hover:scale-110 hover:fill-gray-500 transition-transform duration-300">
                            <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM231 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L376 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-182.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L119 273c-9.4-9.4-9.4-24.6 0-33.9L231 127z" />
                        </svg>
                    </div>
                    <div className="h-9 cursor-pointer" onClick={() => scroll('right')}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-full hover:scale-110 hover:fill-gray-500 transition-transform duration-300">
                            <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="w-full overflow-x-scroll no-scrollbar" ref={scrollContainerRef}>
                <div className="flex mt-10 w-max">
                    {destinations.map(dest => (
                        <PopularDestinationsCard key={dest.id} destination={dest} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecommendedPlaces;
