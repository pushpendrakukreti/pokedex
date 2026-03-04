import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface MainLayoutProps {
  children: ReactNode
  showHeader?: boolean
  showFooter?: boolean
}

/**
 * MainLayout component that wraps page content with header and footer.
 */
export function MainLayout({ children, showHeader = true, showFooter = true }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {showHeader && <Header />}
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  )
}

export default MainLayout
