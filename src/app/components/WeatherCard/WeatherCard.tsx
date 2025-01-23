"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  Sun, CloudRain, Wind, Droplets } from 'lucide-react';

interface WeatherCardProps {
  location?: string;
  country?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ 
  location = "Buenos Aires",
  country = "Argentina" 
}) => {
  const [isSunny, setIsSunny] = useState(true);
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  
  const toggleWeather = () => {
    setIsSunny(prev => !prev);
  };

  return (
    <motion.div
      className="w-56 h-[310px] rounded-3xl overflow-hidden shadow-lg relative cursor-pointer bg-white/5 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onClick={toggleWeather}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background with animated gradient */}
      <motion.div 
        className="absolute inset-0 transition-all duration-500"
        animate={{
          background: isSunny 
            ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)' 
            : 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 50%, #9ca3af 100%)'
        }}
      />

      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {isSunny ? (
          // Sun rays
          [...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-1 bg-yellow-200/30"
              style={{
                top: '30%',
                left: '50%',
                transformOrigin: 'left center',
                transform: `rotate(${i * 30}deg)`,
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))
        ) : (
          // Rain drops
          [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-3 bg-blue-200/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: -10,
              }}
              animate={{
                y: [0, 400],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
            />
          ))
        )}
      </div>

      {/* Content Container */}
      <div className="relative p-6 h-full flex flex-col">
        {/* Weather Icon Section - Moved higher */}
        <div className="relative w-full h-32 flex justify-center mb-4">
          <AnimatePresence mode="wait">
            {isSunny ? (
              <motion.div
                key="sun"
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <Sun className="w-16 h-16 text-yellow-500" />
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sun className="w-24 h-24 text-yellow-500/30" />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="rain"
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <CloudRain className="w-24 h-24 text-gray-600" />
                <motion.div
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Droplets className="w-6 h-6 text-blue-400" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Location and Date */}
        <div className="text-center mb-2">
          <h2 className="text-gray-700 font-medium text-xl mb-1">{location}</h2>
          <p className="text-gray-500 text-sm">{country} • {currentDate}</p>
        </div>

        {/* Temperature Display */}
        <div className="text-center mb-2">
          <motion.div 
            className="text-2xl font-bold text-gray-800 mb-2"
            key={isSunny ? "sunny" : "rainy"}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isSunny ? "23°" : "18°"}
          </motion.div>
          <span className="text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full">
            Celsius
          </span>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div className="flex items-center gap-2 bg-white/20 rounded-xl p-3">
            <Wind className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-xs font-medium text-gray-700">
                {isSunny ? "12 km/h" : "24 km/h"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/20 rounded-xl p-3">
            <Droplets className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {isSunny ? "45%" : "82%"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;

