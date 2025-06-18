import React from "react";
import Button from "@/app/_components/common/button";
import AnimatedWords from "./AnimatedWords";
import Image from "next/image";

export default function HomePage() {
  return (
    <main
      className="min-h-screen py-7 
        bg-[var(--background-color)] 
        text-[var(--accent-color)]"
    >
      <div className="flex flex-col w-full mx-auto">
        {/* Section 1 */}
        <section className="flex flex-col gap-48 justify-center p-10 relative rounded-lg shadow-md bg-cover bg-center min-h-[500px]">
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
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
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
            <Button className="px-8 py-4 text-xl">Get Started</Button>
          </div>
        </section>

        {/* Section 2 */}

        <section className="flex-1 py-24  shadow-md bg-[var(--foreground-color)]">
          <div className="p-6">
            <h3 className="text-3xl font-bold text-center mb-20">
              How to Hire a Freelancers through Taskaya
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="flex flex-col items-center text-center p-7 bg-[var(--background-color)] shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                <Image
                  src="/images/open.png"
                  alt="Post Your Job Icon"
                  width={80}
                  height={80}
                  className="mb-4"
                />
                <h4 className="text-xl font-semibold mb-7">
                  Post Your Job (For Free!)
                </h4>
                <p className="text-sm text-[var(--accent-color)] opacity-80">
                  Post a job and share with us your all your requirements. The
                  more information you include, the easier you find the perfect
                  freelancer for your job.
                </p>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col items-center text-center p-7 bg-[var(--background-color)] shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                <Image
                  src="/images/message.png"
                  alt="Filter Proposals Icon"
                  width={80}
                  height={80}
                  className="mb-4"
                />
                <h4 className="text-xl font-semibold mb-7">
                  Filter the Proposals
                </h4>
                <p className="text-sm text-[var(--accent-color)] opacity-80">
                  Browse through freelancers’ proposals, profiles, and compare
                  before choosing the right freelancer for the job.
                </p>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col items-center text-center p-7 bg-[var(--background-color)] shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                <Image
                  src="/images/chat.png"
                  alt="Interview Freelancers Icon"
                  width={80}
                  height={80}
                  className="mb-4"
                />
                <h4 className="text-xl font-semibold mb-7">
                  Interview Shortlisted Freelancers
                </h4>
                <p className="text-sm text-[var(--accent-color)] opacity-80">
                  Use Taskaya’s chat box to select and talk with or interview
                  your top freelancers and discuss the job details to pick your
                  final freelancer and start right away.
                </p>
              </div>

              {/* Card 4 */}
              <div className="flex flex-col items-center text-center p-5 rounded-lg bg-[var(--background-color)] shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
                <Image
                  src="/images/secure.png"
                  alt="Pay Safely Icon"
                  width={80}
                  height={80}
                  className="mb-4"
                />
                <h4 className="text-xl font-semibold mb-2">Pay Safely</h4>
                <p className="text-sm text-[var(--accent-color)] opacity-80">
                  With secure payments you’ll receive invoices through Taskaya.
                  We hold the money until the project is completed, and you
                  approve its release to the freelancer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="flex-1 p-6 rounded-lg shadow-md bg-[var(--foreground-color)]">
          <h2 className="text-xl font-bold mb-4">Section Three</h2>
          <p>
            The final section contains additional information or call-to-action.
          </p>
        </section>
      </div>
    </main>
  );
}
