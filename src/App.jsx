import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        // Seed once then load products
        await fetch(`${API_BASE}/seed`, { method: "POST" }).catch(() => {});
        const res = await fetch(`${API_BASE}/products`);
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.quantity, 0), [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setDrawerOpen(true);
  };

  const updateQty = (id, qty) => {
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p)));
  };

  const checkout = async ({ subtotal, tax, total }) => {
    try {
      const payload = {
        customer_name: "Guest",
        customer_email: "guest@example.com",
        shipping_address: "123 Demo Street",
        items: cart.map((c) => ({
          product_id: c.id,
          title: c.title,
          price: c.price,
          quantity: c.quantity,
          image: c.image,
        })),
        subtotal,
        tax,
        total,
        status: "pending",
      };
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Checkout failed");
      setCart([]);
      alert("Order placed successfully!");
      setDrawerOpen(false);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar cartCount={cartCount} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Featured products</h1>
          <p className="text-slate-400 mt-1">A simple demo store with cart and checkout.</p>
        </div>

        {loading && <p className="text-slate-300">Loading products...</p>}
        {error && <p className="text-rose-400">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))}
        </div>
      </main>

      <CartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={cart}
        onCheckout={checkout}
        onUpdateQty={updateQty}
      />
    </div>
  );
}
