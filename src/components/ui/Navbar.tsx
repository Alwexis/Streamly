"use client";

import { geistSans, inter } from "@/lib/fonts";
import clsx from "clsx";
import { CircleUser, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Navbar() {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (searchQuery.length < 1) {
      setToggleSearch(!toggleSearch);
      if (!toggleSearch) {
        inputRef.current?.focus();
      }
    }
  }

  return (
    <nav className="sticky top-0 z-50 py-4 md:py-3 px-6 w-full flex justify-between items-center bg-neutral-950/90 backdrop-blur-sm shadow-md">
      <section className={`${inter.className} flex items-center space-x-8`}>
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <Image src="/streamly no text 512.webp" alt="Streamly Logo without text" width={512} height={512} className="w-8 md:w-10" />
            <h2 className={`hidden md:block ${geistSans.className} text-white text-lg font-bold`}>Streamly</h2>
          </div>
        </Link>
        <Link href="/movies">
          <span className="text-base font-semibold text-neutral-300 hover:text-neutral-100 transition-all">
            Películas
          </span>
        </Link>
        <Link href="/series">
          <span className="text-base font-semibold text-neutral-300 hover:text-neutral-100 transition-all">
            Series
          </span>
        </Link>
      </section>
      <section className="flex items-center space-x-2 text-white">
        <form className={clsx(
          "hidden md:flex items-center space-x-2 transition-all ease-in-out rounded-sm px-2 py-2",
          {
            "bg-white/10": toggleSearch,
          }
        )}>
          <input className={clsx(
            "transition-all duration-300 ease-in-out outline-none px-2 text-sm text-neutral-100",
            {
              "w-48": toggleSearch,
              "w-0": !toggleSearch,
            }
          )} type="text" placeholder="Search" ref={inputRef} />
          <button type="button" title={`${toggleSearch ? "Search" : "Toggle searchbar" }`} onClick={handleSearch}
            className="cursor-pointer">
            {
              toggleSearch ? <X /> : <Search />
            }
          </button>
        </form>
        <button>
          <CircleUser />
        </button>
      </section>
    </nav>
  )
}