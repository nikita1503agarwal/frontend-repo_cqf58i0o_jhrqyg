import { ShoppingCart, Search, Menu } from "lucide-react";

export default function Navbar({ cartCount }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-900/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="md:hidden p-2 rounded-lg hover:bg-white/5">
            <Menu className="w-5 h-5 text-slate-200" />
          </button>
          <div className="flex items-center gap-2">
            <img src="/flame-icon.svg" alt="logo" className="w-7 h-7" />
            <span className="text-white font-semibold tracking-tight">BlueStore</span>
          </div>
        </div>
        <div className="hidden md:flex items-center flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <input
              className="w-full rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder:text-slate-400 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Search products..."
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative rounded-xl px-3 py-2 text-slate-200 hover:bg-white/5">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
