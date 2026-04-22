import { Button } from '@/components/ui/button'

type GoogleAuthButtonProps = {
  label: string
  onClick: () => void
}

export function GoogleAuthButton({ label, onClick }: GoogleAuthButtonProps) {
  return (
    <Button
      type="button"
      variant="secondary"
      onClick={onClick}
      className="w-full gap-2 border border-black/10 bg-white text-[#1f1f1f] hover:bg-[#f6f6f6] dark:border-white/15 dark:bg-[#2f2521] dark:text-[#f6dfd0] dark:hover:bg-[#3b2f2a]"
    >
      <GoogleMark />
      <span>{label}</span>
    </Button>
  )
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path
        fill="#FFC107"
        d="M43.61 20.08H42V20H24v8h11.3C33.65 32.66 29.23 36 24 36c-6.63 0-12-5.37-12-12s5.37-12 12-12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.05 6.05 29.27 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20c0-1.34-.14-2.65-.39-3.92z"
      />
      <path
        fill="#FF3D00"
        d="M6.31 14.69l6.57 4.82C14.66 15.11 18.98 12 24 12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.05 6.05 29.27 4 24 4c-7.68 0-14.36 4.34-17.69 10.69z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.17 0 9.86-1.98 13.41-5.2l-6.2-5.24C29.13 35.15 26.68 36 24 36c-5.21 0-9.62-3.33-11.28-7.96l-6.52 5.02C9.49 39.56 16.23 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.61 20.08H42V20H24v8h11.3a12.06 12.06 0 0 1-4.09 5.56l.01-.01 6.2 5.24C36.98 39.13 44 34 44 24c0-1.34-.14-2.65-.39-3.92z"
      />
    </svg>
  )
}