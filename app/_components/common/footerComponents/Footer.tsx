"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

export type FooterLink = {
  title: string;
  href: string;
  external?: boolean;
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
};

export type FooterProps = {
  sections: FooterSection[];
  className?: string;
  bottomText?: string;
};

export default function Footer({
  sections,
  className,
  bottomText = "© 2024 Taskaya. All rights reserved.",
}: FooterProps) {
  const socialLinks = [
    { icon: faFacebook, href: "https://facebook.com", label: "Facebook" },
    { icon: faTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: faLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: faInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: faGithub, href: "https://github.com", label: "GitHub" },
  ];

  return (
    <footer
      className={`mt-40 w-full ${className} bg-[var(--background-color)] border-t border-[var(--border-color)]`}
    >
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--accent-color)]">
              Taskaya
            </h2>
            <p className="text-[var(--accent-color)] opacity-80">
              Connecting talented freelancers with innovative projects. Your
              trusted platform for seamless collaboration.
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-color)] hover:text-[var(--btn-color)] transition-colors"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} className="text-xl" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-lg font-semibold text-[var(--accent-color)] border-b border-[var(--border-color)] pb-2">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="text-[var(--accent-color)] opacity-80 hover:text-[var(--btn-color)] hover:opacity-100 transition-all duration-200"
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-[var(--border-color)] pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold text-[var(--accent-color)] mb-4">
              Subscribe to our Newsletter
            </h3>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--background-color)] text-[var(--accent-color)] focus:outline-none focus:border-[var(--btn-color)]"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-[var(--btn-color)] text-[var(--btn-clr-secondary)] rounded-lg hover:bg-[var(--button-hover-background-color)] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border-color)] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[var(--accent-color)] opacity-80 text-sm">
              {bottomText}
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-[var(--accent-color)] opacity-80 hover:text-[var(--btn-color)] hover:opacity-100 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-[var(--accent-color)] opacity-80 hover:text-[var(--btn-color)] hover:opacity-100 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-[var(--accent-color)] opacity-80 hover:text-[var(--btn-color)] hover:opacity-100 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
