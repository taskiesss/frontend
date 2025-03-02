"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface CarouselItem {
  src: string;
  alt: string;
  name: string;
  position: string;
}

interface HorizontalCarouselProps {
  items: CarouselItem[];
}

export default function HorizontalCarousel({ items }: HorizontalCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(Math.floor(items.length / 2));
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Handle mouse/touch down
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  // Handle mouse/touch move
  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = startX - clientX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeIndex < items.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else if (diff < 0 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
      setIsDragging(false);
    }
  };

  // Handle mouse/touch up
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Add and remove event listeners
  useEffect(() => {
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDragMove);
    document.addEventListener("touchend", handleDragEnd);

    return () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, startX, activeIndex]);

  // Get visible items - only show 5 at a time
  const getVisibleItems = () => {
    const result = [];
    const visibleCount = 5;
    const halfVisible = Math.floor(visibleCount / 2);

    let startIdx = activeIndex - halfVisible;
    let endIdx = activeIndex + halfVisible;

    // Adjust start and end indexes if they go out of bounds
    if (startIdx < 0) {
      endIdx = Math.min(endIdx - startIdx, items.length - 1);
      startIdx = 0;
    }

    if (endIdx >= items.length) {
      startIdx = Math.max(0, startIdx - (endIdx - items.length + 1));
      endIdx = items.length - 1;
    }

    for (let i = startIdx; i <= endIdx; i++) {
      if (i >= 0 && i < items.length) {
        result.push({ item: items[i], index: i });
      }
    }

    return result;
  };

  // Calculate item size and opacity based on distance from center
  const getItemStyle = (index: number) => {
    const distance = Math.abs(index - activeIndex);

    // Base size - center item is largest
    let scale = 1;
    if (distance === 1) scale = 0.85;
    if (distance === 2) scale = 0.7;
    if (distance > 2) scale = 0.6;

    // Base opacity - center item is fully opaque
    let opacity = 1;
    if (distance === 1) opacity = 0.8;
    if (distance === 2) opacity = 0.6;
    if (distance > 2) opacity = 0.4;

    return {
      transform: `scale(${scale})`,
      opacity,
      transition: "all 0.3s ease",
      zIndex: items.length - distance,
    };
  };

  // Handle click to directly set active item
  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  // Check if image is a remote URL or local path
  const isRemoteImage = (src: string) => {
    return src.startsWith("http://") || src.startsWith("https://");
  };

  // Get proper image element based on source
  const getImageElement = (src: string, alt: string) => {
    if (isRemoteImage(src)) {
      return <Image src={src} alt={alt} fill className="object-cover" />;
    } else {
      // For local images, use a different approach
      // Either use a relative path without Image component or adjust path for Image
      return (
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${src.startsWith("/") ? src : `/${src}`})`,
          }}
        />
      );
    }
  };

  const visibleItems = getVisibleItems();

  return (
    <div className="w-9/12 py-8 px-6 bg-[var(--foreground-color)] rounded-2xl">
      <h2 className="text-3xl font-bold mb-6">Team Members</h2>

      <div
        className="flex justify-center items-center gap-4 overflow-hidden py-8 relative"
        ref={carouselRef}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 rounded-full p-2 cursor-pointer z-10"
          onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
          style={{
            opacity: activeIndex > 0 ? 1 : 0.5,
            cursor: activeIndex > 0 ? "pointer" : "not-allowed",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </div>

        <div className="flex justify-center items-center gap-4 transition-transform duration-300">
          {visibleItems.map(({ item, index }) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer transition-all duration-300"
              style={getItemStyle(index)}
              onClick={() => handleItemClick(index)}
            >
              <div
                className={`relative rounded-full overflow-hidden mb-2 border-4 ${
                  activeIndex === index
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                style={{
                  width: activeIndex === index ? "150px" : "120px",
                  height: activeIndex === index ? "150px" : "120px",
                }}
              >
                {getImageElement(item.src, item.alt)}
              </div>
              <h3 className="font-bold text-center">{item.name}</h3>
              <p className="text-sm text-gray-600 text-center">
                {item.position}
              </p>
            </div>
          ))}
        </div>

        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 rounded-full p-2 cursor-pointer z-10"
          onClick={() =>
            activeIndex < items.length - 1 && setActiveIndex(activeIndex + 1)
          }
          style={{
            opacity: activeIndex < items.length - 1 ? 1 : 0.5,
            cursor: activeIndex < items.length - 1 ? "pointer" : "not-allowed",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              activeIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
