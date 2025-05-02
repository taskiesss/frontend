"use client";

import Link from "next/link";

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
  bottomText = "© 2025 YourCompany, Inc. All rights reserved.",
}: FooterProps) {
  return (
    <footer
      className={`mt-40 flex w-full ${className} justify-center items-center bg-gradient-to-b to-[--hover-color] from-[#cee0f7] dark:from-[--foreground-color] dark:to-[--btn-color]  dark:brightness-95 `}
    >
      <div className="w-full px-20 py-12 sm:px-24 lg:px-28 self-center flex flex-col ">
        <div className="grid grid-cols-2 gap-60 sm:grid-cols-3 md:grid-cols-4 justify-center">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-solid py-2 text-center ">
                {section.title}
              </h3>
              <ul className="mt-3 space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx} className="text-center">
                    <Link
                      href={link.href}
                      className="text-md hover:text-[--button-hover-background-color]  dark:hover:text-[var(--button-hover-background-color)] transition-all hover:underline "
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
        <div className="w-full mt-20 pt-8 border-t border-solid ">
          <p className="text-md text-muted-foreground text-center">
            {bottomText}
          </p>
        </div>
      </div>
    </footer>
  );
}
