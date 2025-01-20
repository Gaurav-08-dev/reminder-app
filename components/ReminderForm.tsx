"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { fadeIn } from "../lib/motion"

interface ReminderFormProps {
  onAddReminder: (text: string) => Promise<void>
}

export default function ReminderForm({ onAddReminder }: ReminderFormProps) {
  const [reminder, setReminder] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reminder.trim()) return

    setIsSubmitting(true)
    setError("")

    try {
      await onAddReminder(reminder)
      setReminder("")
    } catch (err) {
      setError("Failed to add reminder. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 py-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          Add a Reminder
        </motion.h2>
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <input
            type="text"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            placeholder="Enter your reminder"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            required
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Reminder"}
          </button>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </motion.form>
      </div>
    </section>
  )
}

