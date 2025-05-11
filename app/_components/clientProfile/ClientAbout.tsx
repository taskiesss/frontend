"use client";
import React from "react";

interface AboutSectionProps {
  description: string;
}

export default function AboutSection({ description }: AboutSectionProps) {
  const fakeDescription =
    "I am a highly skilled and dedicated professional with extensive experience in web development, design, and project management. My expertise spans a wide range of technologies, including JavaScript, React, Node.js, and MongoDB, allowing me to build robust and scalable applications. I have a strong passion for creating user-friendly interfaces and optimizing backend systems to ensure seamless performance. Over the years, I have worked on numerous projects, from small startups to large enterprises, delivering high-quality solutions tailored to clients' needs. I thrive in collaborative environments and enjoy solving complex problems with innovative approaches. My goal is to continue growing as a developer while helping businesses achieve their digital goals through cutting-edge technology and creative design. Whether you need a dynamic website, a powerful API, or a complete full-stack solution, I am here to bring your vision to life.";

  return (
    <div className="p-6 bg-[var(--foreground-color)] rounded-lg shadow-md ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">About</h2>
      </div>
      <p>{description || fakeDescription}</p>
    </div>
  );
}
