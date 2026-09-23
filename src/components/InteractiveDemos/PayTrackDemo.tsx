/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, Plus, Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Transaction {
  id: string;
  concept: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

const DEFAULT_TRANSACTIONS: Transaction[] = [
  { id: 't1', concept: 'Pago Proyecto Frontend Cloudflare', amount: 1450, type: 'income', category: 'Freelance', date: 'Hoy' },
  { id: 't2', concept: 'Suscripción Servidor Edge & Dominio', amount: 35, type: 'expense', category: 'Infraestructura', date: 'Ayer' },
  { id: 't3', concept: 'Anticipo MVP Scan POS', amount: 800, type: 'income', category: 'Clientes', date: '18 Sep' },
  { id: 't4', concept: 'Licencia UI Kits & Assets', amount: 69, type: 'expense', category: 'Software', date: '15 Sep' },
];

export const PayTrackDemo: React.FC<{ isDark: boolean; onNotify?: (msg: string) => void }> = ({ isDark, onNotify }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('pay_track_transactions');
      return saved ? JSON.parse(saved) : DEFAULT_TRANSACTIONS;
    } catch {
      return DEFAULT_TRANSACTIONS;
    }
  });

  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [category, setCategory] = useState('Servicios');

  useEffect(() => {
    try {
      localStorage.setItem('pay_track_transactions', JSON.stringify(transactions));
    } catch {
      // ignore
    }
  }, [transactions]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!concept.trim() || isNaN(num) || num <= 0) return;

    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      concept: concept.trim(),
      amount: num,
      type,
      category,
      date: 'Ahora',
    };

    setTransactions(prev => [newTx, ...prev]);
    setConcept('');
    setAmount('');
    if (onNotify) {
      onNotify(`${type === 'income' ? 'Ingreso' : 'Gasto'} registrado: ${newTx.concept} ($${newTx.amount})`);
    }
  };

  const removeTx = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const netBalance = totalIncome - totalExpense;

  return (
    <div className={`rounded-2xl p-5 border transition-all duration-300 ${
      isDark ? 'bg-[#161618] border-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center">
            <Wallet className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold tracking-tight">Pay Track Web Analytics</h4>
            <p className="text-xs text-slate-400">Flujo Financiero Local (Cifrado Cliente)</p>
          </div>
        </div>
        <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20">
          En Vivo (localStorage)
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3 my-4">
        <div className={`p-3 rounded-xl border ${
          isDark ? 'bg-zinc-900/60 border-white/5' : 'bg-white border-slate-200'
        }`}>
          <span className="text-[11px] text-slate-400 font-medium block">Balance Neto</span>
          <span className={`text-base font-bold font-mono ${netBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            ${netBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className={`p-3 rounded-xl border ${
          isDark ? 'bg-zinc-900/60 border-white/5' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>Ingresos</span>
            <TrendingUp className="w-3 h-3 text-emerald-400" />
          </div>
          <span className="text-base font-bold font-mono text-emerald-400">
            +${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className={`p-3 rounded-xl border ${
          isDark ? 'bg-zinc-900/60 border-white/5' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>Gastos</span>
            <TrendingDown className="w-3 h-3 text-rose-400" />
          </div>
          <span className="text-base font-bold font-mono text-rose-400">
            -${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Quick Add Form */}
      <form onSubmit={handleAdd} className={`p-3 rounded-xl border mb-4 ${
        isDark ? 'bg-zinc-900/40 border-white/5' : 'bg-white border-slate-200'
      }`}>
        <span className="text-xs font-semibold block mb-2 text-slate-400">Registrar Movimiento Rápido</span>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          <input
            type="text"
            placeholder="Concepto (ej: Factura MVP)..."
            value={concept}
            onChange={e => setConcept(e.target.value)}
            className={`sm:col-span-4 px-3 py-1.5 text-xs rounded-lg border outline-none ${
              isDark ? 'bg-zinc-950 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          />
          <input
            type="number"
            placeholder="Monto ($)..."
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className={`sm:col-span-3 px-3 py-1.5 text-xs rounded-lg border outline-none font-mono ${
              isDark ? 'bg-zinc-950 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          />
          <select
            value={type}
            onChange={e => setType(e.target.value as 'income' | 'expense')}
            className={`sm:col-span-3 px-2 py-1.5 text-xs rounded-lg border outline-none ${
              isDark ? 'bg-zinc-950 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          >
            <option value="income">Ingreso (+)</option>
            <option value="expense">Gasto (-)</option>
          </select>
          <button
            type="submit"
            className="sm:col-span-2 py-1.5 px-3 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <Plus className="w-3 h-3" /> Añadir
          </button>
        </div>
      </form>

      {/* Transactions List */}
      <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
        {transactions.map(tx => (
          <div
            key={tx.id}
            className={`flex items-center justify-between p-2 rounded-lg border text-xs transition-colors ${
              isDark ? 'bg-zinc-900/30 border-white/5 hover:bg-zinc-800/40' : 'bg-white border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5 truncate flex-1">
              <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
              }`}>
                {tx.type === 'income' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              </div>
              <div className="truncate">
                <p className="font-medium truncate">{tx.concept}</p>
                <span className="text-[10px] text-slate-400 font-mono">{tx.date} · {tx.category}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-mono font-bold ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
              </span>
              <button
                onClick={() => removeTx(tx.id)}
                className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
