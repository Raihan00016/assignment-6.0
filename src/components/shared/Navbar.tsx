"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Workouts", href: "/workouts" },
  { name: "My Plan", href: "/my-plan" },
];

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Workouts");
  const [menuOpen, setMenuOpen] = useState(false);

  const planCount = 0;
  const savedCount = 0;

  return (
    <nav className="bg-black border-b border-zinc-800 px-4 sm:px-6">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
     
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={logo}
            alt="FitLog logo"
            width={24}
            height={24}
            priority
          />
          <span className="text-white font-bold tracking-wide text-lg">
            FITLOG
          </span>
        </Link>




        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = activeLink === link.name;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveLink(link.name)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-lime-400 text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>


        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            Plan
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-400 text-xs font-bold text-black">
              {planCount}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            Saved
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-700 text-xs font-bold text-white">
              {savedCount}
            </span>
          </div>
        </div>


        <button
          className="md:hidden text-zinc-300"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>


      {menuOpen && (
        <div className="md:hidden border-t border-zinc-800 pb-4">
          <div className="flex flex-col gap-1 pt-3">
            {navLinks.map((link) => {
              const isActive = activeLink === link.name;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.name);
                    setMenuOpen(false);
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-medium w-fit transition-colors ${
                    isActive
                      ? "bg-lime-400 text-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-5">
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              Plan
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-400 text-xs font-bold text-black">
                {planCount}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              Saved
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-700 text-xs font-bold text-white">
                {savedCount}
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}