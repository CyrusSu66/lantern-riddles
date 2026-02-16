import { useEffect, useState } from 'react';
import { Lantern } from './Lantern';
import type { Riddle } from '../types';
import riddlesData from '../data/riddles.json';
import { motion, AnimatePresence } from 'framer-motion';
import bgImg from '../assets/bg_festive.png';
import horseImg from '../assets/horse_running.png';

// Staggered positions for 10 lanterns
// Staggered 3-2-3-2 Layout
const LANTERN_POSITIONS = [
    // Row 1 (3 items)
    { x: '20%', y: '10%' },
    { x: '50%', y: '10%' },
    { x: '80%', y: '10%' },
    // Row 2 (2 items)
    { x: '35%', y: '28%' },
    { x: '65%', y: '28%' },
    // Row 3 (3 items)
    { x: '20%', y: '46%' },
    { x: '50%', y: '46%' },
    { x: '80%', y: '46%' },
    // Row 4 (2 items)
    { x: '35%', y: '64%' },
    { x: '65%', y: '64%' },
];

export const GameScene = () => {
    const [activeRiddles, setActiveRiddles] = useState<Riddle[]>([]);
    const [solvedCount, setSolvedCount] = useState(0);

    useEffect(() => {
        // Shuffle and pick 10 riddles
        const shuffled = [...riddlesData].sort(() => 0.5 - Math.random());
        setActiveRiddles(shuffled.slice(0, 10));
    }, []);

    const handleSolve = () => {
        setSolvedCount(prev => prev + 1);
    };

    const isVictory = solvedCount >= 10;

    return (
        <div
            className="relative w-screen h-screen overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImg})` }}
        >
            {/* Lanterns Layer */}
            <div className="absolute inset-0 z-10">
                {activeRiddles.map((riddle, index) => (
                    <Lantern
                        key={riddle.id}
                        riddle={riddle}
                        x={LANTERN_POSITIONS[index].x}
                        y={LANTERN_POSITIONS[index].y}
                        delay={index * 0.1}
                        onSolve={handleSolve}
                    />
                ))}
            </div>

            {/* Horse Layer (Bottom) */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-1/3 z-0 pointer-events-none"
                style={{ mixBlendMode: 'multiply', filter: 'contrast(1.5) brightness(1.1)' }}
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                    repeat: Infinity,
                    duration: 15,
                    ease: "linear"
                }}
            >
                <img
                    src={horseImg}
                    alt="Running Horse"
                    className="h-full object-contain opacity-80"
                />
            </motion.div>

            {/* Victory Message */}
            <AnimatePresence>
                {isVictory && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <motion.h1
                            className="text-8xl md:text-9xl font-serif text-[#ffd700] drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            恭賀新禧
                        </motion.h1>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Info Layer */}
            <div className="absolute bottom-4 right-4 text-white/50 text-sm font-serif">
                已解謎題: {solvedCount} / 10
            </div>
        </div>
    );
};
