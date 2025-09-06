import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Bot, Send, Mic, MicOff, Volume2, VolumeX, Brain, Lightbulb,
  Target, TrendingUp, Leaf, Recycle, Droplets, Zap
} from 'lucide-react';
import { useStore } from '../store/useStore';

const EnhancedAIMentor = () => {
  const { t } = useTranslation();
  const { user, updateUserPoints } = useStore();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const aiPersonalities = [
    {
      name: 'EcoSage',
      avatar: '🌱',
      specialty: 'General Environmental Guidance',
      greeting: "Hello! I'm EcoSage, your environmental mentor. How can I help you make a positive impact today?"
    },
    {
      name: 'ClimateGuard',
      avatar: '🌍',
      specialty: 'Climate Change & Sustainability',
      greeting: "Hi there! I'm ClimateGuard, specializing in climate action. Let's work together to fight climate change!"
    },
    {
      name: 'BioHelper',
      avatar: '🦋',
      specialty: 'Biodiversity & Wildlife Conservation',
      greeting: "Welcome! I'm BioHelper, your guide to protecting biodiversity. Ready to learn about wildlife conservation?"
    },
    {
      name: 'GreenTech',
      avatar: '⚡',
      specialty: 'Renewable Energy & Technology',
      greeting: "Hey! I'm GreenTech, your renewable energy expert. Let's explore sustainable technologies together!"
    }
  ];

  const quickSuggestions = [
    'How can I reduce my carbon footprint?',
    'What are the best plants for air purification?',
    'How to start composting at home?',
    'Renewable energy options for homes',
    'Water conservation techniques',
    'Sustainable transportation ideas'
  ];

  useEffect(() => {
    const greeting = {
      id: '1',
      type: 'ai',
      content: aiPersonalities[selectedPersonality].greeting,
      timestamp: new Date(),
      suggestions: quickSuggestions.slice(0, 3)
    };
    setMessages([greeting]);
  }, [selectedPersonality]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateAIResponse = async (userMessage) => {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const personality = aiPersonalities[selectedPersonality];
    let response = '';
    let actionItems = [];
    let suggestions = [];

    if (userMessage.toLowerCase().includes('carbon footprint')) {
      response = `Great question! Here are personalized ways to reduce your carbon footprint in India:

🚗 **Transportation**: Use public transport, cycle, or walk for short distances. Consider electric vehicles for longer trips.

🏠 **Home Energy**: Switch to LED bulbs, use solar water heaters, and optimize AC usage (set to 24°C).

🍽️ **Diet**: Eat more local, seasonal foods. Reduce meat consumption and avoid food waste.

♻️ **Waste**: Practice the 3 R's - Reduce, Reuse, Recycle. Compost organic waste.

Based on your current level (${user?.level}), I recommend starting with transportation changes!`;

      actionItems = [
        {
          id: 'cf1',
          title: 'Track Daily Transportation',
          description: 'Log your daily commute and identify opportunities to use eco-friendly transport',
          points: 100,
          difficulty: 'easy',
          category: 'Transportation'
        },
        {
          id: 'cf2',
          title: 'Home Energy Audit',
          description: 'Conduct a comprehensive energy audit of your home',
          points: 200,
          difficulty: 'medium',
          category: 'Energy'
        }
      ];

      suggestions = [
        'How to calculate my carbon footprint?',
        'Best electric vehicles in India',
        'Solar panel installation guide'
      ];
    } else if (userMessage.toLowerCase().includes('plants') || userMessage.toLowerCase().includes('air purification')) {
      response = `Excellent choice! Here are the best air-purifying plants for Indian homes:

🌿 **Snake Plant (Sansevieria)**: Releases oxygen at night, perfect for bedrooms. Very low maintenance!

🍃 **Money Plant (Pothos)**: Removes formaldehyde and benzene. Grows well in water or soil.

🌱 **Areca Palm**: Natural humidifier and excellent air purifier. Ideal for living rooms.

🌺 **Peace Lily**: Removes ammonia, benzene, and formaldehyde. Beautiful white flowers!

🌿 **Rubber Plant**: Great for removing toxins and adding green beauty to your space.

Pro tip: Place 2-3 plants per 100 sq ft for maximum air purification effect!`;

      actionItems = [
        {
          id: 'ap1',
          title: 'Create Indoor Garden',
          description: 'Set up an indoor garden with 5 air-purifying plants',
          points: 150,
          difficulty: 'easy',
          category: 'Biodiversity'
        }
      ];

      suggestions = [
        'How to care for indoor plants?',
        'Best plants for different rooms',
        'DIY plant fertilizers'
      ];
    } else if (userMessage.toLowerCase().includes('composting')) {
      response = `Composting is fantastic! Here's how to start composting at home in India:

🥬 **What to Compost**: Vegetable peels, fruit scraps, tea leaves, coffee grounds, dry leaves, paper waste.

🚫 **Avoid**: Meat, dairy, oils, diseased plants, pet waste.

🏠 **Methods**:
- **Bin Composting**: Use a plastic bin with holes for aeration
- **Pit Composting**: Dig a 3x3 feet pit in your garden
- **Vermicomposting**: Use earthworms for faster decomposition

⚖️ **Golden Rule**: 3:1 ratio of brown (dry) to green (wet) materials.

🔄 **Process**: Layer materials, turn weekly, keep moist but not soggy. Ready in 2-3 months!

Your compost will reduce household waste by 30% and create nutrient-rich soil!`;

      actionItems = [
        {
          id: 'comp1',
          title: 'Start Kitchen Composting',
          description: 'Set up a basic composting system for kitchen waste',
          points: 200,
          difficulty: 'medium',
          category: 'Waste Management'
        }
      ];

      suggestions = [
        'Troubleshooting compost problems',
        'Using finished compost',
        'Vermicomposting setup'
      ];
    } else {
      response = `That's an interesting question about environmental sustainability! As ${personality.name}, I specialize in ${personality.specialty.toLowerCase()}.

I'd love to help you learn more about this topic. Based on your current progress (Level ${user?.level} with ${user?.points} eco-points), I can provide personalized guidance.

Could you be more specific about what aspect you'd like to explore? For example:
- Practical actions you can take
- Scientific background
- Local solutions for India
- Step-by-step implementation guides

I'm here to make environmental learning engaging and actionable for you!`;

      suggestions = quickSuggestions.slice(0, 3);
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response,
      timestamp: new Date(),
      suggestions,
      actionItems
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: 'I apologize, but I encountered an error. Please try asking your question again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    inputRef.current?.focus();
  };

  const handleActionItemAccept = (actionItem) => {
    updateUserPoints(actionItem.points);
    console.log('Action item accepted:', actionItem);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto">
      {/* AI Personality Selector */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">AI Environmental Mentor</h2>
          <div className="flex space-x-2">
            <button
              onClick={toggleSpeaking}
              className={`p-2 rounded-lg transition-colors ${isSpeaking ? 'bg-white text-blue-600' : 'bg-blue-400 text-white hover:bg-blue-300'}`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {aiPersonalities.map((personality, index) => (
            <button
              key={index}
              onClick={() => setSelectedPersonality(index)}
              className={`p-3 rounded-lg text-left transition-all ${selectedPersonality === index
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'bg-blue-400 text-white hover:bg-blue-300'
                }`}
            >
              <div className="text-2xl mb-1">{personality.avatar}</div>
              <div className="text-sm font-medium">{personality.name}</div>
              <div className="text-xs opacity-80">{personality.specialty}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.type === 'user' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-900'
                  }`}
              >
                {message.type === 'ai' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{aiPersonalities[selectedPersonality].avatar}</span>
                    <span className="text-sm font-medium">{aiPersonalities[selectedPersonality].name}</span>
                  </div>
                )}

                <div className="whitespace-pre-wrap text-sm">{message.content}</div>

                {message.suggestions && (
                  <div className="mt-3 space-y-1">
                    <p className="text-xs opacity-75">Quick suggestions:</p>
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="block w-full text-left text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                {message.actionItems && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs opacity-75">Recommended actions:</p>
                    {message.actionItems.map((item) => (
                      <div key={item.id} className="bg-green-50 border border-green-200 rounded-lg p-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-green-900">{item.title}</h4>
                            <p className="text-xs text-green-700">{item.description}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                {item.points} points
                              </span>
                              <span
                                className={`text-xs px-2 py-1 rounded ${item.difficulty === 'easy'
                                    ? 'bg-blue-100 text-blue-800'
                                    : item.difficulty === 'medium'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}
                              >
                                {item.difficulty}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleActionItemAccept(item)}
                            className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded transition-colors"
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="text-xs opacity-50 mt-2">{message.timestamp.toLocaleTimeString()}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{aiPersonalities[selectedPersonality].avatar}</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleListening}
            className={`p-2 rounded-lg transition-colors ${isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about environmental sustainability..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-3">
          {quickSuggestions.slice(0, 3).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedAIMentor;
