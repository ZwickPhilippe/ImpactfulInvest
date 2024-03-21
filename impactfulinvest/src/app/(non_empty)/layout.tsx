'use client';
import '@/app/globals.css'
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Snackbar from '@/components/elements/overlay/snackbar/snackbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className='min-h-screen bg-gray-100'>
    {/* <Navbar/> */}
    <Snackbar/>
    <div className='overflow-x-hidden max-w-[1440px] mx-auto'>
      <div className='w-full p-8'>
        {children}
      </div>
    </div>
  </main>
}