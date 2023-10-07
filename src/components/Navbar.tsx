// components/Navbar.js

import { HiUserCircle } from "react-icons/hi"
import SearchBar from "./Searchbar"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-primary p-4">
      <div className="text-lg font-semibold text-white">My Website</div>

      <SearchBar />
      <div className="relative">
        <button className="text-white">
          <HiUserCircle className="h-8 w-8" />
        </button>
        <div className="absolute right-0 top-5 hidden rounded-lg border border-gray-200 bg-white p-2 text-gray-800">
          <ul>
            <li className="py-1">Item 1</li>
            <li className="py-1">Item 2</li>
            <li className="py-1">Item 3</li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
