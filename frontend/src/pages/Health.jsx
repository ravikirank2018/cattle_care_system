import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, Stethoscope } from 'lucide-react'

export default function Health() {
    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <header className="service-hero bg-gradient-to-r from-red-500 to-pink-600 text-white p-10 rounded-3xl shadow-lg mb-8">
                <div className="service-hero-inner">
                    <h1 className="text-4xl font-bold mb-4">Cattle Health Hub</h1>
                    <p className="opacity-90 max-w-2xl">State-of-the-art AI tools to monitor, predict, and diagnose health issues in your herd. Early detection saves lives.</p>
                </div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/predict" className="glass-card p-8 hover:scale-[1.02] transition duration-300 group cursor-pointer border-l-4 border-indigo-500">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition">
                            <Activity size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Vital Signs Analysis</h2>
                    </div>
                    <p className="text-gray-600 mb-4">Analyze numerical health metrics like temperature, mobility, and appetite to predict potential illness risks.</p>
                    <span className="text-indigo-600 font-bold group-hover:translate-x-2 transition inline-block">Run Analysis →</span>
                </Link>

                <Link to="/disease" className="glass-card p-8 hover:scale-[1.02] transition duration-300 group cursor-pointer border-l-4 border-emerald-500">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full group-hover:bg-emerald-600 group-hover:text-white transition">
                            <Stethoscope size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Visual Disease Scanner</h2>
                    </div>
                    <p className="text-gray-600 mb-4">Upload or capture photos of physical symptoms (skin issues, eyes, etc.) for instant AI diagnosis.</p>
                    <span className="text-emerald-600 font-bold group-hover:translate-x-2 transition inline-block">Scan Now →</span>
                </Link>
            </main>
        </div>
    )
}
