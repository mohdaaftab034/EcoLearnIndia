import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Play, Pause, RotateCcw, TrendingUp, Leaf, Zap, Droplets, Recycle } from 'lucide-react';

const VirtualSimulation = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameState, setGameState] = useState({
    population: 100000,
    happiness: 70,
    pollution: 60,
    energy: 50,
    water: 80,
    greenSpace: 30,
    waste: 40,
    budget: 1000000,
    carbonFootprint: 75,
    biodiversity: 45
  });

  const [selectedAction, setSelectedAction] = useState(null);
  const [gameTime, setGameTime] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const actions = [
    {
      id: 'solar_farm',
      name: 'Build Solar Farm',
      description: 'Construct renewable energy infrastructure',
      cost: 200000,
      effects: { energy: 15, pollution: -10, carbonFootprint: -12 },
      icon: '☀️',
      category: 'energy'
    },
    {
      id: 'public_transport',
      name: 'Expand Public Transport',
      description: 'Add electric buses and metro lines',
      cost: 500000,
      effects: { pollution: -15, happiness: 8, carbonFootprint: -20 },
      icon: '🚌',
      category: 'transport'
    },
    {
      id: 'recycling_center',
      name: 'Build Recycling Center',
      description: 'Process waste into reusable materials',
      cost: 150000,
      effects: { waste: -20, pollution: -8, budget: 50000 },
      icon: '♻️',
      category: 'waste'
    },
    {
      id: 'urban_forest',
      name: 'Plant Urban Forest',
      description: 'Create green spaces throughout the city',
      cost: 100000,
      effects: { greenSpace: 20, pollution: -12, happiness: 10, biodiversity: 15 },
      icon: '🌳',
      category: 'green'
    },
    {
      id: 'water_treatment',
      name: 'Water Treatment Plant',
      description: 'Clean and recycle wastewater',
      cost: 300000,
      effects: { water: 25, pollution: -10, happiness: 5 },
      icon: '💧',
      category: 'water'
    },
    {
      id: 'green_buildings',
      name: 'Green Building Standards',
      description: 'Mandate eco-friendly construction',
      cost: 250000,
      effects: { energy: 10, pollution: -8, happiness: 6, carbonFootprint: -10 },
      icon: '🏢',
      category: 'energy'
    }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setGameTime(prev => prev + 1);
        simulateTimeProgression();
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const simulateTimeProgression = () => {
    setGameState(prev => {
      const newState = { ...prev };
      newState.population += Math.floor(Math.random() * 1000) + 500;
      newState.pollution += Math.floor(Math.random() * 3) + 1;
      newState.waste += Math.floor(Math.random() * 2) + 1;
      newState.budget += 50000;

      if (newState.pollution > 80) {
        newState.happiness -= 2;
        newState.biodiversity -= 1;
      }
      if (newState.greenSpace > 60) {
        newState.happiness += 1;
        newState.pollution -= 1;
      }
      if (newState.energy < 30) {
        newState.happiness -= 3;
        addNotification('Energy crisis! Citizens are unhappy');
      }
      if (newState.water < 20) {
        newState.happiness -= 5;
        addNotification('Water shortage! Immediate action required');
      }

      Object.keys(newState).forEach(key => {
        if (key !== 'population' && key !== 'budget') {
          newState[key] = Math.max(0, Math.min(100, newState[key]));
        }
      });
      return newState;
    });
  };

  const addNotification = message => {
    setNotifications(prev => [...prev, message].slice(-3));
    setTimeout(() => setNotifications(prev => prev.slice(1)), 5000);
  };

  const executeAction = action => {
    if (gameState.budget < action.cost) {
      addNotification('Insufficient budget!');
      return;
    }
    setGameState(prev => {
      const newState = { ...prev, budget: prev.budget - action.cost };
      Object.entries(action.effects).forEach(([key, value]) => {
        if (value !== undefined) {
          newState[key] = Math.max(0, Math.min(100, (newState[key] || 0) + value));
        }
      });
      return newState;
    });
    addNotification(`${action.name} implemented successfully!`);
    setSelectedAction(null);
  };

  const resetSimulation = () => {
    setGameState({
      population: 100000,
      happiness: 70,
      pollution: 60,
      energy: 50,
      water: 80,
      greenSpace: 30,
      waste: 40,
      budget: 1000000,
      carbonFootprint: 75,
      biodiversity: 45
    });
    setGameTime(0);
    setIsPlaying(false);
    setNotifications([]);
  };

  const getStatusColor = (value, inverse = false) => {
    if (inverse) return value < 30 ? 'text-green-600' : value < 70 ? 'text-yellow-600' : 'text-red-600';
    return value > 70 ? 'text-green-600' : value > 30 ? 'text-yellow-600' : 'text-red-600';
  };

  const getProgressColor = (value, inverse = false) => {
    if (inverse) return value < 30 ? 'bg-green-500' : value < 70 ? 'bg-yellow-500' : 'bg-red-500';
    return value > 70 ? 'bg-green-500' : value > 30 ? 'bg-yellow-500' : 'bg-red-500';
  };

  const formatNumber = num => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      {/* Notifications */}
      {/* Statistics Panel */}
      {/* Actions Panel */}
      {/* Action Modal */}
    </div>
  );
};

export default VirtualSimulation;
