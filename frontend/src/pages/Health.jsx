import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, Stethoscope } from 'lucide-react'

export default function Health() {
    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <header className="mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#253D2E] text-[#B6E63E] rounded-2xl shadow-[6px_6px_0px_#B6E63E] border border-[#2a4d3a]">
                        <Activity size={36} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-[#253D2E] tracking-tight">Cattle Health Hub</h1>
                        <p className="text-[#4A6741] font-medium">State-of-the-art AI tools to monitor, predict, and diagnose health issues.</p>
                    </div>
                </div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/predict" className="glass-card p-8 hover:scale-[1.02] transition duration-300 group cursor-pointer border-l-4 border-[#253D2E] shadow-md hover:shadow-xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-[#253D2E] text-[#B6E63E] rounded-xl group-hover:bg-[#B6E63E] group-hover:text-[#253D2E] transition shadow-sm">
                            <Activity size={32} />
                        </div>
                        <h2 className="text-2xl font-black text-[#253D2E]">Vital Signs Analysis</h2>
                    </div>
                    <p className="text-[#4A6741] mb-6 font-medium">Analyze numerical health metrics like temperature, mobility, and appetite to predict potential illness risks.</p>
                    <span className="text-[#253D2E] font-bold group-hover:translate-x-2 transition inline-block bg-[#F4F7F4] px-4 py-2 rounded-lg border border-[#253D2E]/10">Run Analysis →</span>
                </Link>

                <Link to="/disease" className="glass-card p-8 hover:scale-[1.02] transition duration-300 group cursor-pointer border-l-4 border-[#B6E63E] shadow-md hover:shadow-xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-[#B6E63E] text-[#253D2E] rounded-xl group-hover:bg-[#253D2E] group-hover:text-[#B6E63E] transition shadow-sm">
                            <Stethoscope size={32} />
                        </div>
                        <h2 className="text-2xl font-black text-[#253D2E]">Visual Disease Scanner</h2>
                    </div>
                    <p className="text-[#4A6741] mb-6 font-medium">Upload or capture photos of physical symptoms (skin issues, eyes, etc.) for instant AI diagnosis.</p>
                    <span className="text-[#253D2E] font-bold group-hover:translate-x-2 transition inline-block bg-[#F4F7F4] px-4 py-2 rounded-lg border border-[#253D2E]/10">Scan Now →</span>
                </Link>
            </main>
        </div>
    )
}

