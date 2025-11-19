import { X } from "lucide-react";

export default function CartDrawer({ open, onClose, items, onCheckout, onUpdateQty }) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-slate-900 border-l border-white/10 transform transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-white font-semibold">Your Cart</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5"><X className="w-5 h-5 text-slate-200"/></button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-180px)]">
          {items.length === 0 && (
            <p className="text-slate-400">Your cart is empty.</p>
          )}
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 bg-slate-800/40 border border-white/10 rounded-xl p-3">
              <img src={item.image} alt={item.title} className="w-16 h-16 rounded object-cover" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h4 className="text-white font-medium pr-2 line-clamp-1">{item.title}</h4>
                  <span className="text-slate-300 text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))} className="w-7 h-7 rounded bg-white/10 text-white">-</button>
                  <span className="text-slate-200 w-6 text-center">{item.quantity}</span>
                  <button onClick={() => onUpdateQty(item.id, item.quantity + 1)} className="w-7 h-7 rounded bg-white/10 text-white">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between text-slate-300 text-sm">
            <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300 text-sm mt-1">
            <span>Tax</span><span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-white font-semibold mt-2">
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={() => onCheckout({ subtotal, tax, total })}
            disabled={items.length === 0}
            className="w-full mt-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  );
}
