"use client";

import { useState } from "react";
import { Menu, SquareX } from "lucide-react";

import SideNavItem from "./SideNavItem";
import { Category } from "@/types/sanity";
import SearchInput from "../SearchInput";

export default function SideNavClient({
  categories,
}: {
  categories: Category[];
}) {
  const currentYear = new Date().getFullYear();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden p-4 self-end flex justify-between w-full gap-x-4 ">
        <SearchInput />
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 left-32 shadow-sm bg-white z-50 p-6 md:hidden text-right  rounded-md">
          <button onClick={() => setIsOpen(false)} className="mb-4">
            <SquareX />
          </button>
          {categories.map((category) => (
            <SideNavItem {...category} key={category.title} />
          ))}
        </div>
      )}

      <div className="hidden grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2  overflow-y-auto md:flex">
        <div className=" w-full rounded-md md:flex-col h-auto overflow-y-auto">
          {categories.map((category) => (
            <SideNavItem {...category} key={category.title} />
          ))}
        </div>

        <footer className="p-3 mt-3 text-center bg-gray-50 ">
          © {currentYear} erikbeltrandev
        </footer>
      </div>
    </>
  );
}
