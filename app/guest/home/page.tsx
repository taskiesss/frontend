import React from "react";
import Button from "@/app/_components/common/button";
import AnimatedWords from "./AnimatedWords";

export default function HomePage() {
  return (
    <main
      className="min-h-screen p-4 
        bg-[var(--background-color)] 
        text-[var(--accent-color)]"
    >
      <div className="flex flex-col gap-6 w-full mx-auto">
        {/* Section 1 */}
        <section className="flex flex-col gap-48 justify-center p-6 relative rounded-lg shadow-md bg-cover bg-center min-h-[500px]">
          {/* Background Image with Contrast and Opacity */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: 'url("/images/work.png")',
            }}
            aria-hidden="true"
          ></div>

          {/* Overlay (optional) */}
          <div
            className="absolute inset-0 backdrop-contrast-[0.7]"
            aria-hidden="true"
          ></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between ">
            <div className="md:w-1/2 flex flex-col gap-10">
              <AnimatedWords />
              <span className="text-3xl">
                Achieve your goals faster with seamless partnerships and shared
                vision. Let&apos;s build something great together!
              </span>
            </div>
            <div className="md:w-1/2"></div>
          </div>

          {/* Button */}
          <div className="relative z-10 flex justify-center w-full mt-4">
            <Button className="px-8 py-4 text-xl ">Get Started</Button>
          </div>
        </section>

        {/* Section 2 */}
        <section
          className="flex-1 p-6 
            rounded-lg shadow-md
            bg-[var(--foreground-color)]"
        >
          <h2 className="text-xl font-bold mb-4">Section Two</h2>
          <p>This is the second section. You can add more details here.</p>
        </section>

        {/* Section 3 */}
        <section
          className="flex-1 p-6 
            rounded-lg shadow-md
            bg-[var(--foreground-color)]"
        >
          <h2 className="text-xl font-bold mb-4">Section Three</h2>
          <p>
            The final section contains additional information or call-to-action.
          </p>
        </section>
      </div>
    </main>
  );
}
