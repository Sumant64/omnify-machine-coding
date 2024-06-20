'use client'
import Image from 'next/image'
import { permanentRedirect, useRouter } from 'next/navigation'

export default function Home() {

  // redirection of page
  permanentRedirect('/waitlist');
  
  return (
    <>
      
    </>
  )
}
