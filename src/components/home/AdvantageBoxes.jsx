// import icons
import { useState } from "react";
import { ArrowRight } from "lucide-react";

// import link
import { Link } from "react-router-dom";

// advantage boxes component
export default function AdvantageBoxes({ advantages }) {
    // Track active card index for mobile toggle behavior
    const [activeCard, setActiveCard] = useState(null);

    // handle card clicking for mobile devices
    const handleCardClick = (index) => {
        if (window.innerWidth < 768) {
            setActiveCard(activeCard === index ? null : index);
        }
    };

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {advantages.map((item, index) => {
                const isFlipped = activeCard === index;

                return (
                    <div
                        key={index}
                        onClick={() => handleCardClick(index)}
                        className="group h-87.5 perspective-[1000px] cursor-pointer md:cursor-default"
                    >
                        {/* Inner Wrapper for Flip */}
                        {/* Combines dynamic state classes for mobile and group-hover utilities for desktop */}
                        <div
                            className={`relative h-full w-full transition-all duration-500 transform-3d md:group-hover:transform-[rotateY(180deg)] 
                                ${isFlipped ? "transform-[rotateY(180deg)]"
                                    : ""
                                }`}
                        >
                            {/* Front Side */}
                            <div className="absolute inset-0 h-full w-full rounded-2xl border border-gray-200 bg-gray-50 shadow-sm backface-hidden">
                                <div className="h-2/3 w-full overflow-hidden rounded-t-2xl">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div className="flex h-1/3 items-center justify-between px-6 bg-white rounded-b-2xl">
                                    <h3 className="text-lg font-bold text-gray-900 pr-5">{item.title}</h3>
                                    <ArrowRight className="h-5 w-5 text-[#0189c7]" />
                                </div>
                            </div>

                            {/* Back Side */}
                            <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#0189c7] p-8 text-white backface-hidden transform-[rotateY(180deg)]">
                                <div className="flex flex-col h-full justify-center items-center text-center">
                                    <div className="mb-4 rounded-full bg-white p-4 text-[#0189c7]">
                                        {item.icon}
                                    </div>

                                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-sm leading-relaxed text-blue-50">
                                        {item.description}
                                    </p>

                                    <div onClick={(e) => e.stopPropagation()}>
                                        <Link to="/about">
                                            <button
                                                className="mt-6 text-sm font-semibold border-b border-white pb-1 hover:text-blue-200 
                                                transition-colors cursor-pointer"
                                            >
                                                Learn More
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}