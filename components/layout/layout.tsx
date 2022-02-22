import React from 'react'
import NextHead from 'next/head'
import { Navbar } from '../navbar/navbar'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-200">
      <NextHead>
        <title>Photo Album</title>
        <link rel="icon" href="/favicon.ico" />
      </NextHead>

      <Navbar />

      <div className="container mx-auto">{children}</div>
    </div>
  )
}
