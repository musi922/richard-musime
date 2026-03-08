import { motion } from 'framer-motion';

const tools = [
    { name: 'Figma', url: 'https://figma.com', icon: '🎨', desc: 'Design' },
    { name: 'VS Code', url: 'https://code.visualstudio.com', icon: '💻', desc: 'Editor' },
    { name: 'SAP BAS', url: 'https://tools.hana.ondemand.com', icon: '🔷', desc: 'SAP IDE' },
    { name: 'Slack', url: 'https://slack.com', icon: '💬', desc: 'Comms' },
    { name: 'Jira', url: 'https://atlassian.com/software/jira', icon: '📋', desc: 'Planning' },
    { name: 'Spotify', url: 'https://spotify.com', icon: '🎵', desc: 'Focus' },
    { name: 'Mymind', url: 'https://mymind.com', icon: '🧠', desc: 'Memory' },
    { name: 'Notion', url: 'https://notion.so', icon: '📓', desc: 'Notes' },
    { name: 'GitHub', url: 'https://github.com', icon: '🐙', desc: 'Code' },
    { name: 'Tana', url: 'https://tana.inc', icon: '🌿', desc: 'Knowledge' },
    { name: 'Linear', url: 'https://linear.app', icon: '📐', desc: 'Issues' },
    { name: 'Arc', url: 'https://arc.net', icon: '🌐', desc: 'Browser' },
    { name: 'Fantastical', url: 'https://flexibits.com/fantastical', icon: '📅', desc: 'Calendar' },
    { name: 'KeePass 2', url: 'https://keepass.info', icon: '🔐', desc: 'Passwords' },
    { name: 'npm', url: 'https://npmjs.com', icon: '📦', desc: 'Packages' },
    { name: 'Raycast', url: 'https://raycast.com', icon: '⚡', desc: 'Launcher' },
    { name: 'Mobile Sim', url: 'https://apps.apple.com', icon: '📱', desc: 'Testing' },
];

const Tools = () => {
    return (
        <section id="tools" className="bg-bg-dark text-white py-24 px-12 relative z-40 overflow-hidden border-t border-white/5">

            <div className="max-w-[1600px] mx-auto">

                {/* ── Section Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-16"
                >
                    <span className="mono-label text-lilac block mb-4">03 / TOOLBOX</span>
                    <h2 className="text-4xl md:text-6xl font-serif italic text-white leading-tight">
                        Tools
                    </h2>
                    <div className="h-px bg-white/10 mt-6 w-24" />
                    <p className="text-white/30 text-sm mt-6 max-w-xs">
                        The stack I rely on daily — tested, trusted, always evolving.
                    </p>
                </motion.div>

                {/* ── Tool Grid ── */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {tools.map((tool, i) => (
                        <motion.a
                            key={tool.name}
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.4, delay: i * 0.035 }}
                            className="group flex flex-col items-start gap-3 p-4 border border-white/[0.06] hover:border-lilac/40 hover:bg-white/[0.03] transition-all duration-300"
                        >
                            <span className="text-xl">{tool.icon}</span>
                            <div>
                                <span className="text-sm font-light text-white/70 group-hover:text-white transition-colors block leading-tight">
                                    {tool.name}
                                </span>
                                <span className="mono-label text-[8px] text-white/20 block mt-1">
                                    {tool.desc}
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tools;
