import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Bot, Send, Lightbulb, Leaf, Recycle, Zap, User, Sparkles } from 'lucide-react';

const AIMentor = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'ai',
      content: `Namaste! 🙏 I'm your AI Environmental Mentor. I'm here to help you learn about sustainability, answer your eco-questions, and guide you on your green journey!\n\nWhat would you like to explore today?`,
      timestamp: new Date(),
      suggestions: [
        'How can I reduce plastic waste at home?',
        'What are the best plants for air purification?',
        'How to start composting?',
        'Energy saving tips for students'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickActions = [
    {
      id: 'eco-tips',
      label: 'Daily Eco Tips',
      icon: <Lightbulb className="w-4 h-4" />,
      prompt: 'Give me 3 simple eco-friendly tips I can implement today'
    },
    {
      id: 'plant-care',
      label: 'Plant Care',
      icon: <Leaf className="w-4 h-4" />,
      prompt: 'How do I take care of indoor plants and which ones are best for beginners?'
    },
    {
      id: 'recycling',
      label: 'Recycling Guide',
      icon: <Recycle className="w-4 h-4" />,
      prompt: 'What items can I recycle at home and how should I sort them?'
    },
    {
      id: 'energy-saving',
      label: 'Energy Saving',
      icon: <Zap className="w-4 h-4" />,
      prompt: 'How can I reduce my energy consumption and save electricity at home?'
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateAIResponse = async (userMessage) => {
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));

    const responses = {
      plastic: `🌊 Great question about plastic waste! Here are effective ways to reduce plastic at home:

1. **Replace single-use items**: Use reusable bags, water bottles, and containers
2. **Buy in bulk**: Reduces packaging waste significantly
3. **Choose glass/steel**: For food storage instead of plastic containers
4. **DIY cleaning products**: Make natural cleaners to avoid plastic bottles
5. **Refuse plastic straws**: Carry a steel or bamboo straw

💡 **Pro tip**: Start with one change per week. Small steps lead to big impact!

Would you like specific recipes for DIY cleaning products?`,

      plants: `🌱 Excellent choice! Plants are nature's air purifiers. Here are the best beginner-friendly options:

**Top Air-Purifying Plants:**
1. **Snake Plant** 🐍 - Releases oxygen at night, very low maintenance
2. **Pothos** 🍃 - Grows in low light, removes formaldehyde
3. **Spider Plant** 🕷️ - Easy to propagate, removes carbon monoxide
4. **Peace Lily** 🌸 - Beautiful flowers, removes ammonia and benzene
5. **Rubber Plant** 🌿 - Large leaves, removes toxins effectively

**Care Tips:**
- Water when top soil feels dry
- Most plants prefer indirect sunlight
- Wipe leaves weekly for better air purification

Want specific care instructions for any of these plants?`,

      composting: `♻️ Composting is amazing for reducing waste! Here's how to start:

**What to Compost:**
✅ **Greens**: Kitchen scraps, fruit peels, vegetable waste
✅ **Browns**: Dry leaves, paper, cardboard pieces
✅ **Others**: Coffee grounds, eggshells, tea bags

**What NOT to Compost:**
❌ Meat, dairy, oils, pet waste, diseased plants

**Simple Method:**
1. Get a container with holes for air
2. Layer greens and browns (1:3 ratio)
3. Turn weekly and keep slightly moist
4. Ready in 2-3 months!

🌱 **Bonus**: Your plants will love the nutrient-rich compost!

Need help choosing the right composting container?`,

      energy: `⚡ Smart energy saving creates a big environmental impact! Here are student-friendly tips:

**Immediate Actions:**
1. **LED bulbs**: Use 75% less energy than regular bulbs
2. **Unplug devices**: Even when off, they consume "phantom power"
3. **Natural light**: Study near windows during day
4. **Fan over AC**: Use fans first, AC only when necessary

**Study Habits:**
- Charge devices during day using solar power
- Use power strips to easily turn off multiple devices
- Share charging stations with roommates

**Advanced Tips:**
- Solar phone chargers for outdoor study
- Energy-efficient laptops over desktops
- Cold water for washing clothes

💡 **Impact**: These changes can reduce your carbon footprint by 30%!

Want to calculate your current energy usage?`,

      default: `🤔 That's an interesting question! While I focus on environmental topics, I can help you with:

🌱 **Sustainability practices**
🏠 **Eco-friendly home solutions**  
🌍 **Climate change education**
♻️ **Waste reduction strategies**
🌿 **Green lifestyle tips**
🔋 **Renewable energy basics**

What specific environmental topic would you like to explore? I'm here to make learning about sustainability fun and practical!`
    };

    let responseContent = responses.default;
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('plastic') || lowerMessage.includes('waste')) {
      responseContent = responses.plastic;
    } else if (lowerMessage.includes('plant') || lowerMessage.includes('air')) {
      responseContent = responses.plants;
    } else if (lowerMessage.includes('compost') || lowerMessage.includes('organic')) {
      responseContent = responses.composting;
    } else if (lowerMessage.includes('energy') || lowerMessage.includes('electricity') || lowerMessage.includes('power')) {
      responseContent = responses.energy;
    }

    const suggestions = [
      'Tell me more about this topic',
      'What are the environmental benefits?',
      'How can I get started today?',
      'Are there any challenges I should know about?'
    ];

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: responseContent,
      timestamp: new Date(),
      suggestions: Math.random() > 0.5 ? suggestions : undefined
    };
  };

  const sendMessage = async (content) => {
    if (!content.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(content);
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      const errorMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try asking your question again!',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickAction = (action) => {
    sendMessage(action.prompt);
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">🤖 {t('aiMentor')}</h2>
            <p className="text-sm opacity-90">Your Personal Environmental Guide</p>
          </div>
          <div className="ml-auto">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action)}
              className="flex items-center space-x-2 p-2 text-xs bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
            >
              {action.icon}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                  }`}
              >
                {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`rounded-2xl p-3 ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
                  }`}
              >
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>

                {message.suggestions && (
                  <div className="mt-3 space-y-1">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="block w-full text-left text-xs p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                      >
                        💡 {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                <div className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl p-3">
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

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('mentorPlaceholder')}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white p-3 rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIMentor;
