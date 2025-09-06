import { create } from 'zustand'
import { LESSON_IMAGES, CHALLENGE_IMAGES, AVATARS } from '../assets/assets'

export const useStore = create((set, get) => ({
  user: {
    id: '1',
    name: 'Arjun Sharma',
    email: 'arjun.sharma@student.edu',
    school: 'Delhi Public School, Mumbai',
    grade: '10th',
    points: 2450,
    level: 8,
    badges: [],
    streak: 12,
    avatar: AVATARS.arjun
  },

  lessons: [
    {
      id: '1',
      title: 'Climate Change Basics',
      description: 'Understanding the science behind climate change and its impact on India',
      category: 'Climate',
      duration: '15 min',
      difficulty: 'beginner',
      points: 100,
      completed: true,
      image: LESSON_IMAGES.climate,
      sdgGoals: [13, 14, 15]
    },
    {
      id: '2',
      title: 'Water Conservation Techniques',
      description: 'Learn practical water saving methods for homes and schools',
      category: 'Water',
      duration: '20 min',
      difficulty: 'beginner',
      points: 120,
      completed: false,
      image: LESSON_IMAGES.water,
      sdgGoals: [6, 14]
    },
    {
      id: '3',
      title: 'Renewable Energy in India',
      description: 'Explore solar, wind, and other renewable energy sources',
      category: 'Energy',
      duration: '25 min',
      difficulty: 'intermediate',
      points: 150,
      completed: false,
      image: LESSON_IMAGES.energy,
      sdgGoals: [7, 13]
    },
    {
      id: '4',
      title: 'Biodiversity Conservation',
      description: "Protecting India's rich flora and fauna",
      category: 'Wildlife',
      duration: '18 min',
      difficulty: 'intermediate',
      points: 130,
      completed: false,
      image: LESSON_IMAGES.biodiversity,
      sdgGoals: [14, 15]
    }
  ],

  challenges: [
    {
      id: '1',
      title: 'Plant 100 Trees Challenge',
      description: 'Organize a tree plantation drive in your community',
      category: 'Action',
      difficulty: 'medium',
      points: 500,
      duration: '30 days',
      participants: 1247,
      status: 'active',
      progress: 65,
      image: CHALLENGE_IMAGES.trees
    },
    {
      id: '2',
      title: 'Zero Waste Week',
      description: 'Reduce your household waste to zero for one week',
      category: 'Lifestyle',
      difficulty: 'hard',
      points: 300,
      duration: '7 days',
      participants: 892,
      status: 'active',
      progress: 23,
      image: CHALLENGE_IMAGES.waste
    },
    {
      id: '3',
      title: 'Clean Water Initiative',
      description: 'Organize a water body cleaning drive',
      category: 'Community',
      difficulty: 'medium',
      points: 400,
      duration: '14 days',
      participants: 567,
      status: 'upcoming',
      image: CHALLENGE_IMAGES.water
    }
  ],

  badges: [
    {
      id: '1',
      name: 'Climate Champion',
      description: 'Completed 5 climate-related lessons',
      icon: '🌍',
      rarity: 'common',
      earnedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Water Warrior',
      description: 'Saved 1000 liters of water',
      icon: '💧',
      rarity: 'rare'
    },
    {
      id: '3',
      name: 'Tree Hugger',
      description: 'Planted 50 trees',
      icon: '🌳',
      rarity: 'epic'
    },
    {
      id: '4',
      name: 'Eco Legend',
      description: 'Reached level 10',
      icon: '👑',
      rarity: 'legendary'
    }
  ],

  setUser: (user) => set({ user }),

  updateUserPoints: (points) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            points: state.user.points + points,
            level: Math.floor((state.user.points + points) / 500) + 1
          }
        : null
    })),

  completeLesson: (lessonId) =>
    set((state) => ({
      lessons: state.lessons.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, completed: true } : lesson
      )
    })),

  joinChallenge: (challengeId) =>
    set((state) => ({
      challenges: state.challenges.map((challenge) =>
        challenge.id === challengeId
          ? { ...challenge, participants: challenge.participants + 1 }
          : challenge
      )
    })),

  earnBadge: (badgeId) =>
    set((state) => {
      const badge = state.badges.find((b) => b.id === badgeId)
      if (badge && state.user) {
        return {
          user: {
            ...state.user,
            badges: [...state.user.badges, { ...badge, earnedAt: new Date() }]
          }
        }
      }
      return state
    })
}))
