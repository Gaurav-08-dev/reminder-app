"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import ReminderForm from "../components/ReminderForm"
import ReminderList from "../components/ReminderList"

interface Reminder {
  id: string
  text: string
  createdAt: string
}

export default function Home() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const storedReminders = localStorage.getItem("reminders")
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders))
  }, [reminders])

  const addReminder = async (text: string) => {
    const newReminder = {
      id: Date.now().toString(),
      text,
      createdAt: new Date().toISOString(),
    }
    setReminders((prev) => [...prev, newReminder])
  }

  const deleteReminder = async (id: string) => {
    setReminders((prev) => prev.filter((reminder) => reminder.id !== id))
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <ReminderForm onAddReminder={addReminder} />
      {isLoading ? (
        <div className="text-center py-12">Loading reminders...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : (
        <ReminderList reminders={reminders} onDeleteReminder={deleteReminder} />
      )}
    </main>
  )
}

