"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { fadeIn } from "../lib/motion"
import { Trash2, Search, Calendar } from "lucide-react"

interface Reminder {
  id: string
  text: string
  createdAt: string
}

interface ReminderListProps {
  reminders: Reminder[]
  onDeleteReminder: (id: string) => Promise<void>
}

export default function ReminderList({ reminders, onDeleteReminder }: ReminderListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  const filteredReminders = reminders.filter((reminder) => {
    const matchesSearch = reminder.text.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDate = dateFilter
      ? new Date(reminder.createdAt).toDateString() === new Date(dateFilter).toDateString()
      : true
    return matchesSearch && matchesDate
  })

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Your Reminders</h2>
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search reminders"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="flex-1 relative">
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        </div>
        <div className="max-w-2xl mx-auto">
          <AnimatePresence>
            {filteredReminders.map((reminder) => (
              <motion.div
                key={reminder.id}
                className="bg-white p-6 rounded-lg shadow-md mb-4 flex justify-between items-center"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
              >
                <div>
                  <p className="text-lg mb-2 text-gray-800">{reminder.text}</p>
                  <p className="text-sm text-gray-500">Added on: {new Date(reminder.createdAt).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => onDeleteReminder(reminder.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  aria-label="Delete reminder"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredReminders.length === 0 && (
            <p className="text-center text-gray-500">No reminders found. Try adjusting your search or filter.</p>
          )}
        </div>
      </div>
    </section>
  )
}

