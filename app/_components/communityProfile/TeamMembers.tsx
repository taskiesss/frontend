"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface CarouselItem {
  src: string;
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

  // Calculate image container size - use smooth scaling with transforms
  const getImageContainerStyle = (index: number) => {
    // Base size for all images
    const baseSize = 120;
    const activeSize = 150;

    const isActive = index === activeIndex;

    return {
      width: `${baseSize}px`,
      height: `${baseSize}px`,
      transform: isActive ? `scale(${activeSize / baseSize})` : "scale(1)",
      transition: "all 0.3s ease-in-out",
      transformOrigin: "center center",
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

  // Calculate positioning for all items
  const getCarouselItems = () => {
    // Calculate the position/offset for each item
    const itemWidth = 150; // Base width including margins

    return items.map((item, index) => {
      const distance = Math.abs(index - activeIndex);
      const visible = distance <= 2; // Show items within 2 positions of active

      // Scale factors
      let scale = 1;
      if (distance === 1) scale = 0.85;
      if (distance === 2) scale = 0.7;
      if (distance > 2) scale = 0.6;

      // Opacity factors
      let opacity = 1;
      if (distance === 1) opacity = 0.8;
      if (distance === 2) opacity = 0.6;
      if (distance > 2) opacity = 0.4;

      return (
        <div
          key={index}
          className="flex flex-col items-center cursor-pointer absolute transition-all duration-300"
          style={{
            left: `calc(50% + ${(index - activeIndex) * itemWidth}px)`,
            transform: `translateX(-50%) scale(${scale})`,
            opacity: visible ? opacity : 0,
            pointerEvents: visible ? "auto" : "none",
            zIndex: items.length - distance,
          }}
          onClick={() => handleItemClick(index)}
        >
          <div
            className={`relative rounded-full overflow-hidden border-4 transition-colors duration-300 ${
              activeIndex === index ? "border-blue-500" : "border-transparent"
            }`}
            style={getImageContainerStyle(index)}
          >
            {getImageElement(item.src, `Member ${index}`)}
          </div>

          {/* Add proper spacing for text that scales with the image */}
          <div className={`mt-6 text-center transition-all duration-300`}>
            <h3 className="font-bold text-center">{item.name}</h3>
            <p className="text-sm text-gray-600 text-center">{item.position}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-9/12 py-8 px-6 bg-[var(--foreground-color)] rounded-2xl">
      <h2 className="text-3xl font-bold mb-6">Team Members</h2>

      <div
        className="flex justify-center items-center overflow-hidden py-8 relative h-80"
        ref={carouselRef}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 rounded-full p-2 cursor-pointer z-20"
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

        {/* Carousel items */}
        <div className="relative w-full h-full">{getCarouselItems()}</div>

        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 rounded-full p-2 cursor-pointer z-20"
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
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              activeIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
