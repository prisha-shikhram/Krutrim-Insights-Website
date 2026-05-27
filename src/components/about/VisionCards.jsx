// import icons
import { Quote } from 'lucide-react';

// import motion
import { motion } from 'framer-motion';

// vision card component
export default function VisionCard({ notes }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {notes.map((note, idx) => (
                <motion.div
                    key={idx}
                    className="group relative"
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: idx * 0.2
                    }}
                >
                    {/* Decorative Background Blur */}
                    <div
                        className={`absolute -inset-1 bg-linear-to-r ${note.accent} rounded-[40px] opacity-10 blur-xl group-hover:opacity-20
                        transition-opacity duration-500`}
                    />

                    <div
                        className="relative h-full bg-white border border-gray-100 rounded-4xl p-8 md:p-12 shadow-sm hover:shadow-xl
                        transition-all duration-500 flex flex-col"
                    >
                        {/* Header with Avatar and Tag */}
                        <div className="flex items-center gap-5 mb-8">
                            <div className="relative">
                                <div className={`absolute inset-0 bg-linear-to-r ${note.accent} rounded-full blur-sm opacity-40 animate-pulse`} />

                                <img
                                    src={note.image}
                                    alt={note.name}
                                    className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white shadow-lg bg-gray-50
                                    object-cover object-center"
                                />
                            </div>

                            <div>
                                <span
                                    className={`inline-block px-3 py-1 rounded-md bg-linear-to-r ${note.accent} text-[10px] font-black
                                    text-white tracking-widest mb-1`}
                                >
                                    {note.tag}
                                </span>

                                <h4 className="text-xl font-bold text-gray-900 leading-none">{note.name}</h4>
                                <p className="text-sm text-gray-500 mt-1">{note.role}</p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="relative">
                            <Quote className={`absolute -top-4 -left-4 w-10 h-10 opacity-5 text-blue-600`} />

                            <p className="text-lg md:text-xl text-gray-800 font-semibold leading-relaxed mb-6">
                                "{note.content}"
                            </p>

                            <p className="text-base text-gray-600 leading-relaxed italic">
                                {note.subContent}
                            </p>
                        </div>

                        {/* Bottom Accent Line */}
                        <div className="mt-auto pt-8">
                            <div className={`h-1.5 w-20 rounded-full bg-linear-to-r ${note.accent} opacity-30`} />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}