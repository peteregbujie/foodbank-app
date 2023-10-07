"use client"
import { useEffect, useRef } from "react"

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        className="rounded-lg py-2 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-3 top-2 h-6 w-6 text-gray-700"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M14.293 13.293a6 6 0 111.414-1.414l4.5 4.5a1 1 0 01-1.414 1.414l-4.5-4.5zM10 16a5.978 5.978 0 01-3.88-1.423A5.978 5.978 0 015 10a5.978 5.978 0 011.423-3.88A5.978 5.978 0 0110 5a5.978 5.978 0 013.88 1.423A5.978 5.978 0 0115 10a5.978 5.978 0 01-1.423 3.88A5.978 5.978 0 0110 15z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}

export default SearchBar
