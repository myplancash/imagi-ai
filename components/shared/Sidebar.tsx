'use client' // casuse we're using browser functinalities like hooks, turning this component from server-side component by default into a client-side 

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import {navLinks} from '@/constants/index'
import { usePathname } from 'next/navigation';
import { Sign } from 'crypto';
import { Button } from '../ui/button';

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className='sidebar'>
      <div className='flex size-full flex-col gap-4'>
        <Link href='/' className='sidebar-logo'>
          <Image src='/assets/images/logo-text.svg' alt='logo' width={180} height={28}/>
        </Link>

        <nav className='sidebar-nav'>
          <SignedIn>
            <ul className='sidebar-nav_elements'>
              {navLinks.slice(0, 6).map((link) => {
                const isActive = link.route === pathname
                return (
                  <li key={link.route} className={`${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'} group sidebar-nav_element`}>
                    <Link className='sidebar-link' href={link.route}>
                      <Image 
                        src={link.icon}
                        alt={link.label}
                        width={24}
                        height={24}
                        className={`${isActive && 'brightness-200'}`}
                      />
                      {link.label}
                    </Link>
                    
                  </li>
                )
              })}
              </ul>

              <ul className='sidebar-nav_elements'>
                {navLinks.slice(6).map((link) => {
                const isActive = link.route === pathname
                return (
                  <li key={link.route} className={`${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'} group sidebar-nav_element`}>
                    <Link className='sidebar-link' href={link.route}>
                      <Image 
                        src={link.icon}
                        alt={link.label}
                        width={24}
                        height={24}
                        className={`${isActive && 'brightness-200'}`}
                      />
                      {link.label}
                    </Link>
                    
                  </li>
                  )
                })}
                <li className='flex-center p-4 gap-2 cursor-pointer'>
                  <UserButton afterSignOutUrl='/' showName />
                </li> 
              </ul>
          </SignedIn>
          <SignedOut>
            <Button asChild className='button bg-purple-gradient cover'>
              <Link href='/sign-in'>Login</Link>
            </Button>
          </SignedOut>
        </nav>

         
      </div>
    </aside> 
  )
}

export default Sidebar