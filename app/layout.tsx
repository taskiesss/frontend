// app/layout.tsx
import type { Metadata } from "next";
import { Providers } from "./_store/_providers/Providers";
import "./_styles/globals.css";
import { Inter } from "next/font/google";
import { DarkModeProvider } from "./_store/_contexts/DarkModeContext";
import DarkModeToggleButton from "./_components/common/DarkModeButton";
import QueryProvider from "./_store/_providers/QueryProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Taskaya",
  icons: {
    icon: "/images/upLogo.png",
  },

  description: "A platform to connect and share with your communities.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <DarkModeProvider>
            <Providers>
              {children}
              <DarkModeToggleButton />
            </Providers>
          </DarkModeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
