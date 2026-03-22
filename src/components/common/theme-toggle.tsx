import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title="Toggle theme"
    >
      {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
    </Button>
  )
}

