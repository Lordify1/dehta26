import { colorMap } from "@/components/Tools/Misc";
import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

type StarRatingProps = {
    totalStars?: number;
    selected?: number;
    onRatingChange?: (rating: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({ totalStars = 5, selected = 0, onRatingChange }) => {
    const [hover, setHover] = useState(0);
    const [internalSelected, setInternalSelected] = useState(selected);

    // Update internal state if selected prop changes
    React.useEffect(() => {
        setInternalSelected(selected);
    }, [selected]);

    const handleClick = (starValue: number) => {
        setInternalSelected(starValue);
        if (onRatingChange) {
            onRatingChange(starValue);
        }
    };

    return (
        <div className="flex flex-row">
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <span
                        key={index}
                        onClick={() => handleClick(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                        style={{ cursor: "pointer" }}
                    >
                        {starValue <= (hover || internalSelected) ? (
                            <FaStar className={`${colorMap.text_primary} text-lg`} />
                        ) : (
                            <FaRegStar className="text-lg text-gray-400" />
                        )}
                    </span>
                );
            })}
        </div>
    );
};

export default StarRating;