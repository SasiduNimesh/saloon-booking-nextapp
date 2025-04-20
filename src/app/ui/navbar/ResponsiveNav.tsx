"use client"
import React, { useState } from 'react'
import Nav from './Nav'
import MobileNav from './MobileNav'

const ResponsiveNav = () => {
  const [showNav , setShowNav] = useState(false);
  const openNavHandle = () => setShowNav(true);
  const closeNavHandle = () => setShowNav(false);
  return (
    <div>
        <Nav openNav={openNavHandle} />
        <MobileNav 
          showNav={showNav} 
          closeNav={closeNavHandle} 
        />
    </div>
  )
}

export default ResponsiveNav