"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MenuIcon, XIcon } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-xl font-bold text-gray-800">Reminder App</h1>
        </motion.div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close menu" : "Open menu"}>
            {isOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
        <motion.ul
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:relative top-full left-0 right-0 bg-white md:bg-transparent shadow-md md:shadow-none`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {["Home"].map((item) => (
            <li key={item} className="p-4 md:p-0 md:ml-6">
              <a href="#" className="text-gray-700 hover:text-blue-500 transition-colors">
                {item}
              </a>
            </li>
          ))}
        </motion.ul>
      </nav>
    </header>
  )
}

