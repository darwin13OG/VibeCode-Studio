/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Barcode, Plus, Minus, Trash2, Printer, CheckCircle, RefreshCw, ShoppingBag } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  code: string;
}

const SAMPLE_PRODUCTS = [
  { id: 'p1', name: 'Café Espresso Doble', price: 2.50, code: '7501001' },
  { id: 'p2', name: 'Sándwich Roast Beef', price: 5.80, code: '7501002' },
  { id: 'p3', name: 'Agua Mineral 500ml', price: 1.20, code: '7501003' },
  { id: 'p4', name: 'Galleta de Avena y Miel', price: 1.50, code: '7501004' },
];

export const ScanPosDemo: React.FC<{ isDark: boolean; onNotify?: (msg: string) => void }> = ({ isDark, onNotify }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('scan_pos_cart');
      return saved ? JSON.parse(saved) : [
        { id: 'p1', name: 'Café Espresso Doble', price: 2.50, qty: 2, code: '7501001' },
        { id: 'p2', name: 'Sándwich Roast Beef', price: 5.80, qty: 1, code: '7501002' },
      ];
    } catch {
      return [];
    }
  });

  const [barcodeInput, setBarcodeInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [ticketIssued, setTicketIssued] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('scan_pos_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = (product: typeof SAMPLE_PRODUCTS[0]) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setTicketIssued(null);
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
    setTicketIssued(null);
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setTicketIssued(null);
  };

  const simulateCameraScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const randomProduct = SAMPLE_PRODUCTS[Math.floor(Math.random() * SAMPLE_PRODUCTS.length)];
      addToCart(randomProduct);
      setIsScanning(false);
      if (onNotify) onNotify(`¡Escaneado!: ${randomProduct.name} ($${randomProduct.price.toFixed(2)})`);
    }, 850);
  };

  const handleManualBarcode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;
    const match = SAMPLE_PRODUCTS.find(p => p.code === barcodeInput.trim());
    if (match) {
      addToCart(match);
      setBarcodeInput('');
      if (onNotify) onNotify(`Producto agregado: ${match.name}`);
    } else {
      if (onNotify) onNotify(`Código no encontrado (${barcodeInput}). Prueba con 7501001 a 7501004.`);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  const checkoutAndPrint = () => {
    if (cart.length === 0) return;
    const ticketId = 'TCK-' + Math.floor(100000 + Math.random() * 900000);
    setTicketIssued(ticketId);
    
    // Save to sales history
    try {
      const history = JSON.parse(localStorage.getItem('scan_pos_history') || '[]');
      history.unshift({
        ticketId,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        itemsCount: cart.reduce((sum, i) => sum + i.qty, 0),
        total: total.toFixed(2),
      });
      localStorage.setItem('scan_pos_history', JSON.stringify(history.slice(0, 10)));
    } catch {
      // ignore
    }

    if (onNotify) onNotify(`Venta completada con éxito. Ticket #${ticketId}`);
  };

  return (
    <div className={`rounded-2xl p-5 border transition-all duration-300 ${
      isDark ? 'bg-[#161618] border-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
    }`}>
      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold tracking-tight">Terminal Scan POS v1.4</h4>
            <p className="text-xs text-slate-400">Almacenamiento Local Activo (localStorage)</p>
          </div>
        </div>
        <button
          onClick={simulateCameraScan}
          disabled={isScanning}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all active:scale-95 ${
            isScanning
              ? 'bg-emerald-600 text-white animate-pulse'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white'
          }`}
        >
          <Barcode className="w-3.5 h-3.5" />
          {isScanning ? 'Escaneando cámara...' : 'Simular Escáner'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-4">
        {/* Left column: Quick products catalog & manual code */}
        <div className="md:col-span-6 flex flex-col gap-3">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Productos Rápidos</span>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {SAMPLE_PRODUCTS.map(product => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className={`text-left p-2.5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                    isDark
                      ? 'bg-zinc-900/70 border-white/5 hover:border-emerald-500/40 hover:bg-zinc-800/80'
                      : 'bg-white border-slate-200 hover:border-emerald-500/40 hover:shadow-sm'
                  }`}
                >
                  <p className="text-xs font-semibold truncate">{product.name}</p>
                  <div className="flex items-center justify-between mt-1 text-xs">
                    <span className="font-mono text-emerald-500 font-bold">${product.price.toFixed(2)}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{product.code}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Barcode input */}
          <form onSubmit={handleManualBarcode} className="flex gap-2 mt-1">
            <input
              type="text"
              value={barcodeInput}
              onChange={e => setBarcodeInput(e.target.value)}
              placeholder="Ingresa código (ej: 7501001)..."
              className={`flex-1 px-3 py-1.5 text-xs rounded-lg border outline-none font-mono transition-colors ${
                isDark
                  ? 'bg-zinc-900 border-white/10 text-white focus:border-emerald-500'
                  : 'bg-white border-slate-300 text-slate-900 focus:border-emerald-500'
              }`}
            />
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-medium bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Agregar
            </button>
          </form>
        </div>

        {/* Right column: Cart & Receipt */}
        <div className={`md:col-span-6 rounded-xl p-3.5 border flex flex-col justify-between ${
          isDark ? 'bg-zinc-900/60 border-white/5' : 'bg-white border-slate-200'
        }`}>
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-white/5 dark:border-white/10">
              <span className="text-xs font-semibold">Cesta de Compra ({cart.reduce((a, b) => a + b.qty, 0)})</span>
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3 h-3" /> Vaciar
                </button>
              )}
            </div>

            <div className="max-h-36 overflow-y-auto divide-y divide-white/5 my-2 space-y-1 pr-1">
              {cart.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  La cesta está vacía. Escanea o pulsa un producto.
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between py-1.5 text-xs">
                    <div className="truncate flex-1 pr-2">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">${item.price.toFixed(2)} c/u</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 rounded-md border border-white/10 px-1 py-0.5">
                        <button onClick={() => updateQty(item.id, -1)} className="p-0.5 hover:text-emerald-400">
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="font-mono text-xs w-4 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="p-0.5 hover:text-emerald-400">
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                      <span className="font-mono font-semibold w-12 text-right">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                      <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-rose-400 p-1">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Totals & Checkout Button */}
          <div className="pt-3 border-t border-white/5 dark:border-white/10 space-y-1.5">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Subtotal:</span>
              <span className="font-mono">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Impuesto IVA (16%):</span>
              <span className="font-mono">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold pt-1">
              <span>Total a Cobrar:</span>
              <span className="font-mono text-emerald-500">${total.toFixed(2)}</span>
            </div>

            {ticketIssued ? (
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center justify-between mt-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Ticket emitido #{ticketIssued}</span>
                </div>
                <button
                  onClick={() => { setTicketIssued(null); clearCart(); }}
                  className="px-2 py-0.5 text-[11px] bg-emerald-500 text-white rounded font-medium hover:bg-emerald-600 transition-colors"
                >
                  Nueva Venta
                </button>
              </div>
            ) : (
              <button
                onClick={checkoutAndPrint}
                disabled={cart.length === 0}
                className={`w-full mt-2 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] ${
                  cart.length > 0
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/20'
                    : 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Printer className="w-3.5 h-3.5" />
                Cobrar e Imprimir Ticket (${total.toFixed(2)})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
