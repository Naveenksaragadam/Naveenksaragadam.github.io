'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

// Tools list matching user request + styling reference
const tools = [
    { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    { name: 'Arc', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Arc_Browser_logo.png' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Airflow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-original.svg' },
    { name: 'Minio', icon: 'https://min.io/resources/img/logo/MINIO_Bird.png' },
    { name: 'dbt', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dbt/dbt-original.svg' },
    { name: 'ClickHouse', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/clickhouse/clickhouse-original.svg' },
    { name: 'DBeaver', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dbeaver/dbeaver-original.svg' },
]

export default function UsesTile() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group relative flex flex-col justify-center h-full min-h-[200px] rounded-3xl bg-[#0a0a0a] border border-white/5 overflow-hidden"
        >
            {/* Inner Content Container */}
            <div className="relative flex flex-col items-center justify-center gap-8 py-10 w-full">

                {/* Marquee Container - Masked */}
                <div className="relative w-full overflow-hidden mask-linear-gradient">
                    {/* Shadow/Fade Overlays for depth */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

                    <div className="flex w-max">
                        <motion.div
                            animate={{ x: "-50%" }}
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: 20
                            }}
                            className="flex gap-4 px-4"
                        >
                            {[...tools, ...tools].map((tool, index) => (
                                <div
                                    key={`${tool.name}-${index}`}
                                    className="relative w-16 h-16 flex-shrink-0 bg-zinc-900/80 rounded-2xl border border-white/5 flex items-center justify-center p-3.5 group/icon hover:border-white/20 hover:bg-zinc-800 transition-all duration-300"
                                >
                                    <div className="relative w-full h-full">
                                        <img
                                            src={tool.icon}
                                            alt={tool.name}
                                            className="w-full h-full object-contain filter grayscale group-hover/icon:grayscale-0 transition-all duration-300 opacity-60 group-hover/icon:opacity-100 group-hover/icon:scale-110"
                                        />
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Text Bottom - Centered */}
                <div className="text-center space-y-1 relative z-10">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Uses</span>
                    <h3 className="text-base font-medium text-zinc-300">Check out my favorite tools</h3>
                </div>
            </div>

            {/* Subtle interactive glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    )
}
