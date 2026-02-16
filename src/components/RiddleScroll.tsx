import { motion, AnimatePresence } from 'framer-motion';
import type { Riddle } from '../types';
import { useState } from 'react';

interface Props {
    riddle: Riddle;
    isOpen: boolean;
    onSolve: () => void;
    onClose: () => void;
}

export const RiddleScroll = ({ riddle, isOpen, onSolve }: Props) => {
    const [input, setInput] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === riddle.answer) {
            onSolve();
        } else {
            setIsError(true);
            setTimeout(() => setIsError(false), 500);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="absolute top-0 w-48 bg-[#fdf5e6] border-y-8 border-[#8b4513] shadow-lg z-50 overflow-hidden origin-top vector-paper"
                    style={{
                        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                        background: 'linear-gradient(to bottom, #fdf5e6 0%, #faebd7 100%)'
                    }}
                >
                    <div className="p-4 flex flex-col items-center">
                        {/* Scroll decorative top */}
                        <div className="w-full h-2 bg-[#deb887] mb-2"></div>

                        <p className="text-lg font-serif mb-4 text-black font-bold text-center leading-relaxed">
                            {riddle.question}
                        </p>

                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className={`w-full p-2 border-2 ${isError ? 'border-red-500 bg-red-50 animate-shake' : 'border-[#8b4513] bg-white'
                                    } rounded text-black font-serif text-center outline-none focus:ring-2 focus:ring-yellow-500 transition-colors`}
                                placeholder="輸入謎底..."
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="bg-[#b22222] text-[#gold] text-white font-bold py-1 px-4 rounded border-b-4 border-[#800000] hover:bg-[#cd5c5c] active:border-0 active:translate-y-1 transition-all"
                            >
                                解 謎
                            </button>
                        </form>

                        {/* Scroll decorative bottom */}
                        <div className="w-full h-2 bg-[#deb887] mt-2"></div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
