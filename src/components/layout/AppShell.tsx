import { Link, useLocation } from '@tanstack/react-router'
import { useState, createContext, useContext, useEffect, type ReactNode } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Home01Icon,
  Edit01Icon,
  Settings02Icon,
  RssIcon,
  Menu01Icon,
  Cancel01Icon,
  SparklesIcon,
  Moon02Icon,
  Sun03Icon,
} from '@hugeicons/core-free-icons'

// Theme Context for dark/light mode
type Theme = 'dark' | 'light' | 'system'

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'dark' | 'light'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const stored = localStorage.getItem('numedia-theme') as Theme | null
    if (stored) setTheme(stored)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    let resolved: 'dark' | 'light' = 'dark'

    if (theme === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } else {
      resolved = theme
    }

    root.classList.remove('light', 'dark')
    root.classList.add(resolved)
    setResolvedTheme(resolved)
    localStorage.setItem('numedia-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Navigation items
const navItems = [
  { to: '/', label: 'Dashboard', icon: Home01Icon },
  { to: '/content-lab', label: 'Content Lab', icon: Edit01Icon },
  { to: '/feeds', label: 'RSS Feeds', icon: RssIcon },
  { to: '/settings', label: 'Settings', icon: Settings02Icon },
]

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
      aria-label="Toggle theme"
    >
      <HugeiconsIcon
        icon={resolvedTheme === 'dark' ? Sun03Icon : Moon02Icon}
        size={20}
        className="text-sidebar-foreground"
      />
    </button>
  )
}

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const location = useLocation()

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50 transform transition-transform duration-300 ease-in-out flex flex-col lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-5 border-b border-sidebar-border">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <HugeiconsIcon icon={SparklesIcon} size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">Camedia</h1>
            <p className="text-xs text-muted-foreground">AI Content Automator</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto p-2 hover:bg-sidebar-accent rounded-lg lg:hidden"
            aria-label="Close menu"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={20} className="text-sidebar-foreground" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to ||
              (item.to !== '/' && location.pathname.startsWith(item.to))

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md shadow-sidebar-primary/25'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
              >
                <HugeiconsIcon icon={item.icon} size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-semibold">
                U
              </div>
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">User</p>
                <p className="text-xs text-muted-foreground">100 tokens</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  )
}

function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="h-14 border-b border-border bg-background/80 backdrop-blur-sm flex items-center px-4 gap-4 lg:hidden">
      <button
        onClick={onMenuClick}
        className="p-2 hover:bg-accent rounded-lg transition-colors"
        aria-label="Open menu"
      >
        <HugeiconsIcon icon={Menu01Icon} size={22} className="text-foreground" />
      </button>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
          <HugeiconsIcon icon={SparklesIcon} size={18} className="text-white" />
        </div>
        <span className="font-semibold text-foreground">Camedia AI</span>
      </div>
    </header>
  )
}

export function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content area */}
        <div className="lg:pl-64 flex flex-col min-h-screen">
          <TopBar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default AppShell
