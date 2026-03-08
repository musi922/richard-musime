import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Just show an in-modal success state instead of opening a blank page
        setSent(true);
        // Optionally clear the form for the next message
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => { setSent(false); onClose(); }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.96 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[201] flex items-center justify-center p-6 pointer-events-none"
                    >
                        <div className="bg-[#0c0c10] border border-white/10 w-full max-w-xl p-10 relative pointer-events-auto shadow-2xl">
                            {/* Close */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 mono-label text-white/30 hover:text-white transition-colors"
                            >
                                [ ESC ]
                            </button>

                            <span className="mono-label text-lilac block mb-2">REACH OUT</span>
                            <h3 className="text-2xl font-serif italic text-white mb-8">Let's work together.</h3>

                            {sent ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-12"
                                >
                                    <span className="mono-label text-lilac text-lg">Message sent. I'll be in touch.</span>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="mono-label text-[9px] text-white/30">NAME</label>
                                            <input
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Your name"
                                                className="bg-white/[0.04] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-lilac/50 transition-colors placeholder:text-white/20"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="mono-label text-[9px] text-white/30">EMAIL</label>
                                            <input
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="your@email.com"
                                                className="bg-white/[0.04] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-lilac/50 transition-colors placeholder:text-white/20"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="mono-label text-[9px] text-white/30">SUBJECT</label>
                                        <select
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            required
                                            className="bg-white/[0.04] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-lilac/50 transition-colors appearance-none"
                                        >
                                            <option value="" className="bg-[#0c0c10]">What is this about?</option>
                                            <option value="Project Collaboration" className="bg-[#0c0c10]">Project Collaboration</option>
                                            <option value="Freelance Work" className="bg-[#0c0c10]">Freelance Work</option>
                                            <option value="SAP Consulting" className="bg-[#0c0c10]">SAP Consulting</option>
                                            <option value="General Inquiry" className="bg-[#0c0c10]">General Inquiry</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="mono-label text-[9px] text-white/30">MESSAGE</label>
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            placeholder="Tell me about your project..."
                                            className="bg-white/[0.04] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-lilac/50 transition-colors resize-none placeholder:text-white/20"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="mt-2 bg-white text-bg-dark text-sm font-medium py-4 px-8 hover:bg-lilac transition-colors duration-300 mono-label"
                                    >
                                        SEND MESSAGE →
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;
