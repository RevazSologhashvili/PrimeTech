"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathname = usePathname()

    const isActive = (path: string) => path === pathname;

    return (
        <div className='my-5'>
            <header className='max-w-[90%] rounded-full bg-white flex items-center justify-between text-gray-600 px-5 py-3 mx-auto border shadow-md'>
                <Link href={'/'}>
                    {/* <Image src={"/logo.png"} width={100} height={50} alt='logo' className='aspect-video object-cover' /> */}
                    <h2 className='text-center text-gray-700'>LOGO</h2>
                </Link>

                <nav className='flex-1 ml-10'>
                    <ul className='list-none flex items-center gap-5 text-md font-semibold'>
                        <li className={`${isActive('/') ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'} px-3 py-2 rounded-md text-center transition-colors duration-300`}><Link href={'/'}>მთავარი</Link></li>
                        <li className={`${isActive('/contact') ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'} px-3 py-2 rounded-md text-center transition-colors duration-300`}><Link href={'/contact'}>კონტაქტი</Link></li>
                    </ul>
                </nav>

                {/* Search ? */}
            </header>
        </div>
    )
}
