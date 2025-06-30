import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-2">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800 drop-shadow">Active Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
        <Link href='/dashboard/user' className='flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-yellow-300 hover:bg-yellow-50'>
          <span className="text-2xl mb-2">👤</span>
          <span className="font-semibold">Manage User</span>
        </Link>
        <Link href='/dashboard/interpreter' className='flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-yellow-300 hover:bg-yellow-50'>
          <span className="text-2xl mb-2">🗣️</span>
          <span className="font-semibold">Manage Interpreter</span>
        </Link>
        <Link href='/dashboard/attraction' className='flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-yellow-300 hover:bg-yellow-50'>
          <span className="text-2xl mb-2">🏛️</span>
          <span className="font-semibold">Manage Attraction</span>
        </Link>
        <Link href='/dashboard/booking' className='flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-yellow-300 hover:bg-yellow-50'>
          <span className="text-2xl mb-2">📅</span>
          <span className="font-semibold">Manage Booking</span>
        </Link>
        <Link href='/dashboard/language' className='flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-yellow-300 hover:bg-yellow-50'>
          <span className="text-2xl mb-2">🌐</span>
          <span className="font-semibold">Manage Language</span>
        </Link>
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Management of Relations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        <Link href='/dashboard/availability-attraction' className='flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-blue-200 hover:bg-blue-50'>
          <span className="text-2xl mb-2">🕒🏛️</span>
          <span className="font-semibold">Attraction's Availability</span>
        </Link>
        <Link href='/dashboard/interpreterxlanguage' className='flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-blue-200 hover:bg-blue-50'>
          <span className="text-2xl mb-2">🗣️🌐</span>
          <span className="font-semibold">Interpreter x Language</span>
        </Link>
        <Link href='/dashboard/availability-interpreter' className='flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-blue-200 hover:bg-blue-50'>
          <span className="text-2xl mb-2">🕒🗣️</span>
          <span className="font-semibold">Interpreter's Availability</span>
        </Link>
        <Link href='/dashboard/interpreterxattraction' className='flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-blue-200 hover:bg-blue-50'>
          <span className="text-2xl mb-2">🗣️🏛️</span>
          <span className="font-semibold">Interpreter x Attraction</span>
        </Link>
      </div>
    </div>
  );
}
