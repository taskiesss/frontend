import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faUsers,
  faHandshake,
  faLightbulb,
  faHeart,
  faStar,
  faUsersCog,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--background-color)] text-[var(--accent-color)]">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="text-center space-y-6">
          <FontAwesomeIcon
            icon={faRocket}
            className="text-6xl mb-6 text-[var(--btn-color)]"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Taskaya</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-[var(--accent-color)]">
            Connecting talented freelancers with innovative projects. Taskaya is
            your trusted platform for seamless collaboration and professional
            growth.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12 bg-[var(--foreground-color)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Taskaya?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: faShieldAlt,
                title: "Secure Platform",
                description:
                  "Your security is our priority. We ensure safe transactions and protected personal information.",
              },
              {
                icon: faUsers,
                title: "Quality Talent",
                description:
                  "Access a pool of verified professionals ready to bring your projects to life.",
              },
              {
                icon: faHandshake,
                title: "Easy Collaboration",
                description:
                  "Streamlined communication and project management tools for efficient teamwork.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-[var(--background-color)] shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <FontAwesomeIcon
                  icon={feature.icon}
                  className="text-4xl mb-4 text-[var(--btn-color)]"
                />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[var(--accent-color)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: faLightbulb,
              title: "Innovation",
              description:
                "Constantly evolving to provide the best freelancing experience.",
            },
            {
              icon: faHeart,
              title: "Trust",
              description:
                "Building reliable relationships between clients and freelancers.",
            },
            {
              icon: faStar,
              title: "Excellence",
              description:
                "Committed to delivering outstanding results in every project.",
            },
            {
              icon: faUsersCog,
              title: "Community",
              description:
                "Fostering a supportive environment for professional growth.",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="text-center p-6 border border-[var(--border-color)] rounded-lg hover:bg-[var(--foreground-color)] transition-colors"
            >
              <FontAwesomeIcon
                icon={value.icon}
                className="text-3xl mb-4 text-[var(--btn-color)]"
              />
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-[var(--accent-color)]">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-[var(--foreground-color)]">
        <div className="max-w-4xl mx-auto text-center">
          <FontAwesomeIcon
            icon={faRocket}
            className="text-5xl mb-6 text-[var(--btn-color)]"
          />
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8">
            Join our growing community of freelancers and clients today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/signup"}>
              <button className="px-8 py-3 bg-[var(--btn-color)] text-[var(--btn-clr-secondary)] rounded-lg hover:bg-[var(--button-hover-background-color)] transition-colors flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faUsers} />
                Join as Freelancer
              </button>
            </Link>
            <Link href={"/signup"}>
              <button className="px-8 py-3 border-2 border-[var(--btn-color)] text-[var(--accent-color)] rounded-lg hover:bg-[var(--btn-color)] hover:text-[var(--btn-clr-secondary)] transition-colors flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faHandshake} />
                Hire Talent
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
