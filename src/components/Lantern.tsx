import { motion, AnimatePresence } from 'framer-motion';
import type { Riddle } from '../types';
import { RiddleScroll } from './RiddleScroll';
import lanternImg from '../assets/lantern.png';
import confetti from 'canvas-confetti';
import { useState } from 'react';

interface Props {
    riddle: Riddle;
    x: string; // percentage
    y: string; // percentage
    delay: number;
    onSolve: () => void;
}

export const Lantern = ({ riddle, x, y, delay, onSolve }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSolved, setIsSolved] = useState(false);

    const handleSolve = () => {
        // Firework effect
        const rect = document.getElementById(`lantern-${riddle.id}`)?.getBoundingClientRect();
        if (rect) {
            const xRatio = (rect.left + rect.width / 2) / window.innerWidth;
            const yRatio = (rect.top + rect.height / 2) / window.innerHeight;

            confetti({
                particleCount: 150,
                spread: 100,
                origin: { x: xRatio, y: yRatio },
                colors: ['#ff0000', '#ffd700', '#ffa500'],
                gravity: 0.8,
                scalar: 1.2
            });
        }

        setIsSolved(true);
        setIsOpen(false);
        onSolve();
    };

    return (
        <AnimatePresence>
            {!isSolved && (
                <motion.div
                    id={`lantern-${riddle.id}`}
                    className="absolute cursor-pointer z-20"
                    style={{ left: x, top: y }}
                    initial={{ y: -500, opacity: 0 }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        rotate: [2, -2, 2],
                    }}
                    exit={{ scale: 1.5, opacity: 0, filter: 'brightness(2)', transition: { duration: 0.5 } }}
                    transition={{
                        y: { duration: 1, delay: delay, type: 'spring' },
                        rotate: {
                            repeat: Infinity,
                            duration: 4 + Math.random() * 2,
                            ease: "easeInOut",
                            repeatType: "mirror"
                        }
                    }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <img
                        src={lanternImg}
                        alt="Lantern"
                        className="w-16 md:w-20 h-auto hover:scale-110 transition-transform duration-300"
                        style={{
                            mixBlendMode: 'multiply',
                            filter: 'contrast(1.5) brightness(1.1)',
                            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
                            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)'
                        }}
                    />

                    <div className="absolute top-full left-1/2 -translate-x-1/2">
                        <RiddleScroll
                            riddle={riddle}
                            isOpen={isOpen}
                            onSolve={handleSolve}
                            onClose={() => setIsOpen(false)}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
