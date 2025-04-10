"use client";
import React, { useState } from "react";

interface StarRatingProps {
  maxRating?: number;
  defaultRating?: number;
  color?: string;
  size?: number;
  messages?: string[];
  className?: string;
  onSetRating?: (rating: number) => void;
  allowHalf?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  maxRating = 5,
  defaultRating = 0,
  color = "var(--accent-color)",
  size = 48,
  messages = [],
  className = "",
  onSetRating = () => {},
  allowHalf = false,
}) => {
  const [rating, setRating] = useState<number>(
    allowHalf ? defaultRating : Math.round(defaultRating)
  );
  const [tempRating, setTempRating] = useState<number>(0);

  function handleRating(newRating: number) {
    const adjustedRating = allowHalf ? newRating : Math.round(newRating);
    setRating(adjustedRating);
    onSetRating(adjustedRating);
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Star Container */}
      <div className="flex">
        {Array.from({ length: maxRating }, (_, i) => {
          const starValue = i + 1;
          const currentRating = tempRating || rating;

          return (
            <Star
              key={i}
              starValue={starValue}
              currentRating={currentRating}
              onRate={(isHalf) =>
                handleRating(i + (allowHalf && isHalf ? 0.5 : 1))
              }
              onHoverIn={(isHalf) =>
                setTempRating(i + (allowHalf && isHalf ? 0.5 : 1))
              }
              onHoverOut={() => setTempRating(0)}
              color={color}
              size={size}
              allowHalf={allowHalf}
            />
          );
        })}
      </div>

      {/* Rating Text */}
      <p
        className="m-0 leading-none"
        style={{ color, fontSize: `${size / 1.5}px` }}
      >
        {messages.length === maxRating * 2 && rating !== null
          ? messages[
              Math.floor((tempRating || rating) * (allowHalf ? 2 : 1)) - 1
            ]
          : (tempRating || rating)?.toFixed(1) || ""}
      </p>
    </div>
  );
};

interface StarProps {
  starValue: number;
  currentRating: number;
  onRate: (isHalf: boolean) => void;
  onHoverIn: (isHalf: boolean) => void;
  onHoverOut: () => void;
  color: string;
  size: number;
  allowHalf: boolean;
}

const Star: React.FC<StarProps> = ({
  starValue,
  currentRating,
  onRate,
  onHoverIn,
  onHoverOut,
  color,
  size,
  allowHalf,
}) => {
  const full = currentRating >= starValue;
  const half =
    allowHalf && currentRating >= starValue - 0.5 && currentRating < starValue;

  return (
    <span
      role="button"
      className="block cursor-pointer relative"
      style={{ width: `${size}px`, height: `${size}px` }}
      onMouseLeave={onHoverOut}
    >
      {/* Empty Star Outline */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke={color}
        className="w-full h-full absolute top-0 left-0"
        strokeWidth={2}
      >
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>

      {/* Filled Star with ClipPath */}
      {(full || half) && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
          className="w-full h-full absolute top-0 left-0"
        >
          {allowHalf && (
            <clipPath id={`star-clip-${starValue}-${size}`}>
              <rect x="0" y="0" width={half ? "50%" : "100%"} height="100%" />
            </clipPath>
          )}
          <path
            clipPath={
              allowHalf ? `url(#star-clip-${starValue}-${size})` : undefined
            }
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      )}

      {/* Hover/Click Areas */}
      <span
        className="absolute top-0 left-0 w-1/2 h-full"
        onClick={(e) => {
          e.stopPropagation();
          onRate(true); // Half rating if allowed
        }}
        onMouseEnter={(e) => {
          e.stopPropagation();
          onHoverIn(true); // Hover for half rating if allowed
        }}
      />
      <span
        className="absolute top-0 right-0 w-1/2 h-full"
        onClick={(e) => {
          e.stopPropagation();
          onRate(false); // Full rating
        }}
        onMouseEnter={(e) => {
          e.stopPropagation();
          onHoverIn(false); // Hover for full rating
        }}
      />
    </span>
  );
};

export default StarRating;
