import React from 'react'
import EvoSearchBar from 'src/components/EvoSearchBar'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <EvoSearchBar />
      <Header />
      {children}
      <Footer />
    </div>
  )
}
