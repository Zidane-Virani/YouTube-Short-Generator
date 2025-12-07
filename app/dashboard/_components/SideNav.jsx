'use client'
import React from 'react'
import Link from 'next/link'
import { PanelsTopLeft, PlusCircle, ArrowUpCircle, User } from 'lucide-react'
import { usePathname } from 'next/navigation'

export const SideNav = () => {

    const pathname = usePathname()
    console.log(pathname)
    const MenuOption = [
        {
          id: 1,
          name: 'Dashboard',
          path: '/dashboard',
          icon: PanelsTopLeft
        },
        {
          id: 2,
          name: 'Create New',
          path: '/dashboard/create-new',
          icon: PlusCircle
        },
        {
          id: 3,
          name: 'Upgrade',
          path: '/upgrade',
          icon: ArrowUpCircle
        },
        {
          id: 4,
          name: 'Account',
          path: '/account',
          icon: User
        }
      ]
  return (
    <div className='w-64 h-screen shadow-md p-5 rounded-md'>
      <div className='space-y-2'>
        {MenuOption.map((menu) => (
          <Link
            key={menu.id}
            href={menu.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors duration-150 ${
              pathname === menu.path
                ? 'bg-gray-900 text-white'
                : 'hover:bg-gray-200'
            }`}
          >
            <menu.icon size={18} />
            <span className='text-sm font-medium'>{menu.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SideNav