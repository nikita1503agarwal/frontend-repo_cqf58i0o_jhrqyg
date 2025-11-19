export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-slate-800/60 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-colors">
      <div className="aspect-square overflow-hidden bg-slate-900">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <h3 className="text-white font-medium line-clamp-1">{product.title}</h3>
        <p className="text-slate-400 text-sm line-clamp-2 mt-1">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-blue-300 font-semibold">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAdd(product)}
            className="rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-1.5"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
