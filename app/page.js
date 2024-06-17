'use client'
import Image from 'next/image'
import { permanentRedirect, useRouter } from 'next/navigation'

export default function Home() {
  permanentRedirect('/waitlist')
  return (
    <>
      
    </>
  )
}
