'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, Menu, X, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-md bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-950/50 border border-cyan-400/40 group-hover:border-cyan-300 transition-colors">
            <Zap className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-base font-black tracking-wider text-white">
                M SYNAPSES
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold">
                IIP
              </span>
            </div>
            <p className="text-[9px] font-mono tracking-tight text-slate-400 uppercase">
              Intelligent Infrastructure Platform
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-slate-300">
          <a href="#overview" className="hover:text-cyan-400 transition-colors">
            Overview
          </a>
          <a href="#solutions" className="hover:text-cyan-400 transition-colors">
            Solutions
          </a>
          <a href="#industries" className="hover:text-cyan-400 transition-colors">
            Industries
          </a>
          <a href="#architecture" className="hover:text-cyan-400 transition-colors">
            Architecture
          </a>
          <a href="#ai" className="hover:text-cyan-400 transition-colors">
            AI Agents
          </a>
          <a href="#pricing" className="hover:text-cyan-400 transition-colors">
            Enterprise
          </a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">
            Contact
          </a>
        </nav>

        {/* Desktop CTA actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/login"
            className="px-3.5 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-700"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono font-bold text-xs transition-all shadow-lg shadow-cyan-950/60"
          >
            <span>Launch Operations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#070e20] border-b border-slate-800 px-4 py-6 space-y-4 font-mono text-xs">
          <div className="flex flex-col space-y-3 text-slate-300">
            <a
              href="#overview"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-cyan-400"
            >
              Overview
            </a>
            <a
              href="#solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-cyan-400"
            >
              Solutions
            </a>
            <a
              href="#industries"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-cyan-400"
            >
              Industries
            </a>
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-cyan-400"
            >
              Architecture
            </a>
            <a
              href="#ai"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-cyan-400"
            >
              AI Agents
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-cyan-400"
            >
              Enterprise Tiers
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-cyan-400"
            >
              Contact Consultation
            </a>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <Link
              href="/login"
              className="w-full text-center py-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
            >
              Sign In to Platform
            </Link>
            <Link
              href="/dashboard"
              className="w-full text-center py-2.5 rounded bg-cyan-600 text-slate-950 font-bold"
            >
              Launch Operations Center
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
