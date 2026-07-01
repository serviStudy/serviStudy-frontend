"use client";
import { motion } from 'framer-motion';
import type { TargetAndTransition } from 'framer-motion';
import Image from 'next/image';
import type { TurnitoState } from '../types/agent.types';

interface TurnitoAvatarProps {
  state?: TurnitoState;
  size?: number;
  className?: string;
  showRing?: boolean;
}

const containerVariants: Record<TurnitoState, TargetAndTransition> = {
  idle: {
    y: [0, -4, 0],
    transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
  },
  thinking: {
    rotate: [-3, 3, -3],
    transition: { repeat: Infinity, duration: 0.7, ease: 'easeInOut' },
  },
  speaking: {
    y: [0, -6, 0, -3, 0],
    transition: { repeat: Infinity, duration: 0.5, ease: 'easeInOut' },
  },
  happy: {
    y: [0, -8, 0],
    rotate: [-5, 5, -5, 5, 0],
    transition: { repeat: Infinity, duration: 0.6, ease: 'easeInOut', repeatType: 'reverse' },
  },
};

const ringVariants: Record<TurnitoState, TargetAndTransition> = {
  idle: { scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4], transition: { repeat: Infinity, duration: 3 } },
  thinking: { scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3], transition: { repeat: Infinity, duration: 0.7 } },
  speaking: { scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5], transition: { repeat: Infinity, duration: 0.5 } },
  happy: { scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6], transition: { repeat: Infinity, duration: 0.6 } },
};

export const TurnitoAvatar = ({
  state = 'idle',
  size = 48,
  className = '',
  showRing = false,
}: TurnitoAvatarProps) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Animated glow ring */}
      {showRing && (
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-400/30"
          animate={ringVariants[state]}
          style={{ borderRadius: '50%', scale: 1.3 }}
        />
      )}

      {/* Turnito image with state animation */}
      <motion.div
        animate={containerVariants[state]}
        className="relative"
        style={{ width: size, height: size }}
      >
        <Image
          src="/turnito.png"
          alt="Turnito"
          width={size}
          height={size}
          className="rounded-full object-cover select-none"
          draggable={false}
          priority
        />

        {/* Thinking dots overlay */}
        {state === 'thinking' && (
          <motion.div
            className="absolute -top-1 -right-1 flex gap-0.5 bg-white rounded-full px-1.5 py-0.5 shadow-md border border-gray-100"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {[0, 150, 300].map((delay) => (
              <span
                key={delay}
                className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </motion.div>
        )}

        {/* Happy sparkle */}
        {state === 'happy' && (
          <motion.div
            className="absolute -top-1 -right-1 text-yellow-400 text-sm"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            ✨
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
