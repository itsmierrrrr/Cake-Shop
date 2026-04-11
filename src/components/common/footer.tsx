import { Instagram, Mail, Phone, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-white/70 bg-white/60 py-10 backdrop-blur-sm dark:border-white/10 dark:bg-[#221b18]/70">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <p className="text-sm text-truffle/80 dark:text-[#f6dfd0]/80">Royale Bakes Cake Boutique</p>
          <p className="text-xs text-truffle/60 dark:text-[#f6dfd0]/60">Handcrafted with seasonal ingredients since 4000 BCE.</p>
        </div>

        <div className="flex items-center gap-4 text-truffle/80 dark:text-[#f6dfd0]/80">
          <Phone size={20} />
          <Mail size={20} />
          <Instagram size={20} />
          <Twitter size={20} />
        </div>
      </div>
    </footer>
  )
}
