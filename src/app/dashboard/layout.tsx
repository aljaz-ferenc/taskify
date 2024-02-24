import Sidebar from '@/components/Sidebar'
import React from 'react'

export default function Dashboard({children}: {children: React.ReactNode}) {
  return (
    <div className='flex'>
        <Sidebar/>
        {children}
    </div>
  )
}
