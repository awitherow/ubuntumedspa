import React from "react";
import Script from "next/script";
import NextLink from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en" className={inter.className}>
      <Script strategy="afterInteractive" id="gtag" src="https://www.googletagmanager.com/gtag/js?id=G-FBEPLGSS9L" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FBEPLGSS9L');
        `}
      </Script>
      <body className="bg-black">
        <ToastContainer />
        <div
          className="min-h-screen max-w-8xl mx-auto w-full bg-black text-white bg-contain bg-no-repeat bg-top relative overflow-hidden"
          style={{ backgroundImage: "url(/bg.png)" }}
        >
          <div className="flex items-start justify-between w-full px-6 py-6">
            <NextLink href="/" passHref>
              <div className="flex items-center justify-start">
                <Image className="hidden md:block" width={50} height={50} src="/ubuntu.png" alt="Ubuntu Med Spa logo" />
                <div className="flex flex-col items-start justify-center ml-2">
                  <h1 className="text-md sm:text-lg md:text-xl text-white font-bold">Ubuntu Med Spa</h1>
                  <p className="hidden md:block mt-0 text-sm md:text-base text-white font-light">
                    Plasma Rich Platelet Health Therapy
                  </p>
                </div>
              </div>
            </NextLink>

            <div className="flex items-center">
              <a href="#services" className="mx-2 text-white-600 hover:text-white">
                Services
              </a>
              <NextLink href="/blog" passHref className="mx-2 text-white-600 hover:text-white">
                Blog
              </NextLink>
            </div>
          </div>
          <div className="w-full flex items-center justify-center flex-col flex-grow mt-8 px-4 md:px-9 lg:px-18 xl:px-27">
            {children}
          </div>
          <footer className="text-center text-white mt-16">
            <div className="p-4 text-center">
              © 2023 Copyright:
              <NextLink className="text-white" href="/">
                Ubuntu Med Spa
              </NextLink>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
