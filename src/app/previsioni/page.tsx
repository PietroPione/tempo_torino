'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CloudRain,
  Sun,
  Cloud,
  Wind,
  Thermometer,
  AlertTriangle,
  Navigation,
  Search,
  Menu
} from 'lucide-react';

const STAGIONI = ['Primavera', 'Estate', 'Autunno', 'Inverno'];
const PIOGGIA_OPTIONS = [
  'Sì',
  'No',
  'Forse tra un po\'',
  'Sì, anzi no anzi non so'
];

export default function PrevisioniPage() {
  const [stagione, setStagione] = useState('');
  const [temperatura, setTemperatura] = useState(0);
  const [pioggia, setPioggia] = useState('');
  const [affidabilita, setAffidabilita] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const generateRandomValues = useCallback(() => {
    setIsGenerating(true);

    // Effetto "slot machine" breve
    setTimeout(() => {
      setStagione(STAGIONI[Math.floor(Math.random() * STAGIONI.length)]);
      setTemperatura(Math.floor(Math.random() * (30 - 5 + 1)) + 5);
      setPioggia(PIOGGIA_OPTIONS[Math.floor(Math.random() * PIOGGIA_OPTIONS.length)]);
      setAffidabilita(Math.floor(Math.random() * (100 - 25 + 1)) + 25);
      setIsGenerating(false);
    }, 800);
  }, []);

  // Inizializzazione
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateRandomValues();
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [generateRandomValues]);

  // Timer di 5 secondi per ricarica automatica
  useEffect(() => {
    if (refreshCount >= 3) {
      const timeoutId = setTimeout(() => {
        setShowAlert(true);
      }, 0);
      return () => clearTimeout(timeoutId);
    }

    const timer = setTimeout(() => {
      setRefreshCount(prev => prev + 1);
      generateRandomValues();
    }, 3000);

    return () => clearTimeout(timer);
  }, [refreshCount, generateRandomValues]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-800 font-sans">
      {/* Header stile Google */}
      <header className="sticky top-0 bg-white shadow-sm z-10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Menu className="text-gray-500" />
          <div className="flex items-center space-x-1">
            <span className="text-xl font-medium">Torino</span>
            <Navigation size={16} className="text-blue-500 fill-blue-500" />
          </div>
        </div>
        <Search className="text-gray-500" />
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto p-4 space-y-6">

        {/* Card Stagione */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden relative">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Oggi sarà:</h2>
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                key="loading-stagione"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-4xl font-bold text-blue-600 italic"
              >
                Caricamento...
              </motion.div>
            ) : (
              <motion.div
                key={stagione}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="flex items-center space-x-4"
              >
                <span className="text-5xl font-bold text-gray-900">{stagione}</span>
                {stagione === 'Estate' && <Sun className="text-orange-400" size={48} />}
                {stagione === 'Inverno' && <CloudRain className="text-blue-300" size={48} />}
                {stagione === 'Autunno' && <Wind className="text-orange-700" size={48} />}
                {stagione === 'Primavera' && <Sun className="text-yellow-400" size={48} />}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Card Temperatura */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">La temperatura sarà:</h2>
          <div className="flex items-baseline space-x-2">
            <Thermometer className="text-red-500" />
            <motion.span
              key={temperatura}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl font-light text-gray-900"
            >
              {temperatura}°
            </motion.span>
          </div>
        </section>

        {/* Card Pioggia */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Pioverà:</h2>
          <motion.div
            key={pioggia}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-3"
          >
            <Cloud size={28} className="text-blue-400" />
            <span className="text-2xl font-medium text-gray-700">{pioggia}</span>
          </motion.div>
        </section>

        {/* Affidabilità */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Affidabilità previsioni:</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-gray-400">
              <span>MOLTO BASSA</span>
              <span>TOTALE</span>
            </div>
            <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${affidabilita}%` }}
                transition={{ duration: 1, type: 'spring' }}
              />
            </div>
            <div className="text-right font-medium text-blue-600">
              {affidabilita}%
            </div>
          </div>
        </section>

      </main>

      {/* Modal Alert Finale */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-red-600 text-white p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center space-y-6 border-4 border-white"
            >
              <div className="flex justify-center">
                <div className="bg-white rounded-full p-4">
                  <AlertTriangle size={48} className="text-red-600" />
                </div>
              </div>
              <h3 className="text-3xl font-black uppercase leading-tight">
                ALLERTA METEO!
              </h3>
              <p className="text-xl font-medium">
                Senti fai prima a guardare fuori, l&apos;ombrello fossi in te lo porterei.
              </p>
              <button
                onClick={() => {
                  setShowAlert(false);
                  setRefreshCount(0);
                  generateRandomValues();
                }}
                className="w-full bg-white text-red-600 font-bold py-4 rounded-2xl hover:bg-gray-100 transition-colors"
              >
                HO CAPITO, GRAZIE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
