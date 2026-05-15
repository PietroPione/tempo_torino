import Link from 'next/link';
import { CloudSun } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-blue-50">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-10 flex flex-col items-center text-center space-y-8">
        <div className="bg-blue-100 p-6 rounded-full">
          <CloudSun size={64} className="text-blue-500 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Meteo Italia
          </h1>
          <p className="text-gray-500">
            Le previsioni più accurate del web
          </p>
        </div>

        <Link
          href="/previsioni"
          className="group relative w-full inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-2xl hover:bg-blue-700 active:scale-95 shadow-md hover:shadow-xl"
        >
          <span>Scopri il meteo a Torino oggi</span>
          <div className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
            →
          </div>
        </Link>

        <p className="text-xs text-gray-400">
          © 2024 IlMeteo S.p.A. - Dati non garantiti
        </p>
      </div>
    </main>
  );
}
