"use client";
import { AiFillProject } from "react-icons/ai"; 
import { FaTasks } from "react-icons/fa"; 
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";


export default function Sidebar() {

  return (
    <aside className="h-screen bg-[#002327] flex flex-col p-3">
      {/* <Link className='sidebar-link flex items-center text-white' href={"/dashboard/tasks"}>
        <FaTasks /> <span>Tasks</span>
      </Link> */}
      <SidebarButton
        icon={<FaTasks size={20}/>}
        href="/dashboard/tasks"
      >
        Tasks
      </SidebarButton>
      
      <SidebarButton
        icon={<AiFillProject  size={20}/>}
        href="/dashboard/projects"
      >
        Projects
      </SidebarButton>
      <div className='mt-auto' >
      <UserButton afterSignOutUrl="/" />
      </div>
    </aside>
  );
}

interface SidebarButtonProps{
  icon: React.ReactNode
  href: string
  children: React.ReactNode
}

function SidebarButton({children, icon, href}: SidebarButtonProps){
  const pathname = usePathname()
  const isActive = pathname.startsWith(href)

  return (
    <Link href={href} className={`sidebar-button ${isActive && 'bg-[#1a393c]'}`}>
      {icon}
      <div className={`${isActive && 'sidebar-button-active'}`}>
      {children}
      </div>
    </Link>
  )
}