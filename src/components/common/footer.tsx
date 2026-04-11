import { Instagram, Mail, Phone, Facebook } from 'lucide-react'
import { FaXTwitter } from 'react-icons/fa6'

export function Footer() {
  return (
    <footer className="border-t border-white/70 bg-white/60 py-10 backdrop-blur-sm dark:border-white/10 dark:bg-[#221b18]/70">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <p className="text-sm text-truffle/80 dark:text-[#f6dfd0]/80">Royale Bakes Cake Boutique</p>
          <p className="text-xs text-truffle/60 dark:text-[#f6dfd0]/60">Handcrafted with seasonal ingredients since 4000 BCE.</p>
        </div>

        <div className="flex items-center gap-4 text-truffle/80 dark:text-[#f6dfd0]/80">
          <a href="tel:9897169420" className="transition-colors hover:text-truffle dark:hover:text-[#f6dfd0]">
            <Phone size={20} />
          </a>
          <a href="mailto:mihir.s.sawant17@gmail.com" className="transition-colors hover:text-truffle dark:hover:text-[#f6dfd0]">
            <Mail size={20} />
          </a>
          <a href="https://instagram.com/mihir.s_" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-truffle dark:hover:text-[#f6dfd0]">
            <Instagram size={20} />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-truffle dark:hover:text-[#f6dfd0]">
            <FaXTwitter size={20} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-truffle dark:hover:text-[#f6dfd0]">
            <Facebook size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}
