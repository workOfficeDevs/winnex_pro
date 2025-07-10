import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
export function usePersonalizedDashboard() {
    const [currentMessage, setCurrentMessage] = useState(null);
    const [messageHistory, setMessageHistory] = useState([]);
    const { data: user } = useQuery({ queryKey: ['/api/auth/user'], retry: false });
    const { data: userStats } = useQuery({ queryKey: ['/api/user/stats'], retry: false });
    const { data: balance } = useQuery({ queryKey: ['/api/user/balance'], retry: false });
    const getTimeOfDay = useCallback(() => {
        const hour = new Date().getHours();
        if (hour < 6)
            return 'night';
        if (hour < 12)
            return 'morning';
        if (hour < 18)
            return 'afternoon';
        if (hour < 22)
            return 'evening';
        return 'night';
    }, []);
    const getUserName = useCallback(() => {
        if (!user)
            return 'Champion';
        return user.firstName || 'Champion';
    }, [user]);
    const generateWelcomeMessage = useCallback(() => {
        const timeOfDay = getTimeOfDay();
        const userName = getUserName();
        const currentBalance = balance?.balance || 0;
        const timeGreetings = {
            morning: {
                greetings: ['Rise and shine', 'Good morning', 'Morning glory', 'Early bird'],
                emojis: ['🌅', '☀️', '🌞', '🐦']
            },
            afternoon: {
                greetings: ['Good afternoon', 'Afternoon champion', 'Midday warrior', 'Afternoon legend'],
                emojis: ['☀️', '🌤️', '💪', '⚡']
            },
            evening: {
                greetings: ['Good evening', 'Evening champion', 'Sunset warrior', 'Prime time'],
                emojis: ['🌅', '🌇', '⭐', '🔥']
            },
            night: {
                greetings: ['Good evening', 'Night owl', 'Late night legend', 'Midnight warrior'],
                emojis: ['🌙', '🦉', '⭐', '🌟']
            }
        };
        const timeData = timeGreetings[timeOfDay];
        const randomGreeting = timeData.greetings[Math.floor(Math.random() * timeData.greetings.length)];
        const randomEmoji = timeData.emojis[Math.floor(Math.random() * timeData.emojis.length)];
        const messages = [
            `${randomGreeting}, ${userName}! Ready to dominate today's betting action?`,
            `Welcome back, ${userName}! Your winning streak awaits ${randomEmoji}`,
            `${randomGreeting}, ${userName}! Time to turn predictions into profits!`,
            `Hey ${userName}! Today's your day to strike it big ${randomEmoji}`,
            `${randomGreeting}, champion! Your crypto fortune is calling!`
        ];
        const balanceMessages = currentBalance > 0
            ? [
                `You've got $${currentBalance} ready for action!`,
                `Your balance of $${currentBalance} is locked and loaded!`,
                `$${currentBalance} in the tank - let's make it grow!`
            ]
            : [
                `Time to fuel up your betting adventure!`,
                `Your next big win is just a deposit away!`,
                `Ready to add some crypto firepower?`
            ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const randomBalanceMessage = balanceMessages[Math.floor(Math.random() * balanceMessages.length)];
        return {
            id: `welcome_${Date.now()}`,
            type: 'welcome',
            title: randomMessage,
            message: randomBalanceMessage,
            emoji: randomEmoji,
            priority: 'high',
            duration: 5000,
            action: currentBalance === 0 ? {
                text: 'Add Crypto',
                href: '/deposit'
            } : undefined
        };
    }, [getTimeOfDay, getUserName, balance]);
    const generateStreakMessage = useCallback(() => {
        const stats = userStats;
        if (!stats?.currentStreak || stats.currentStreak < 3)
            return null;
        const streakMessages = {
            3: { text: 'On fire! 3 wins in a row!', emoji: '🔥' },
            5: { text: 'Unstoppable! 5 win streak!', emoji: '⚡' },
            7: { text: 'Legendary! 7 wins straight!', emoji: '👑' },
            10: { text: 'GOAT STATUS! 10 win streak!', emoji: '🐐' }
        };
        const streakData = streakMessages[stats.currentStreak] ||
            { text: `INSANE! ${stats.currentStreak} wins in a row!`, emoji: '🚀' };
        return {
            id: `streak_${Date.now()}`,
            type: 'streak',
            title: streakData.text,
            message: 'Keep the momentum going, champion!',
            emoji: streakData.emoji,
            priority: 'high',
            duration: 4000
        };
    }, [userStats]);
    const generateBalanceAlert = useCallback(() => {
        const currentBalance = balance?.balance || 0;
        if (currentBalance === 0) {
            return {
                id: `balance_empty_${Date.now()}`,
                type: 'balance',
                title: 'Ready for Action?',
                message: 'Add some crypto to start your winning journey!',
                emoji: '💰',
                priority: 'medium',
                duration: 4000,
                action: {
                    text: 'Deposit Now',
                    href: '/deposit'
                }
            };
        }
        else if (currentBalance > 1000) {
            return {
                id: `balance_high_${Date.now()}`,
                type: 'balance',
                title: 'High Roller Alert!',
                message: `You've got $${currentBalance} - time for some big moves!`,
                emoji: '💎',
                priority: 'medium',
                duration: 3000
            };
        }
        return null;
    }, [balance]);
    const generateRandomTip = useCallback(() => {
        const tips = [
            {
                title: 'Pro Tip: AI Assistant',
                message: 'Use our AI predictions for better betting decisions!',
                emoji: '🤖',
                action: { text: 'Try AI', href: '/ai-assistant' }
            },
            {
                title: 'Smart Move: Live Betting',
                message: 'Watch live matches and bet on changing odds!',
                emoji: '📺',
                action: { text: 'Go Live', href: '/live-betting' }
            },
            {
                title: 'Level Up: Achievements',
                message: 'Complete challenges to unlock exclusive rewards!',
                emoji: '🏆',
                action: { text: 'View Progress', href: '/profile' }
            },
            {
                title: 'Crypto Advantage',
                message: 'Multiple cryptocurrencies accepted - choose your favorite!',
                emoji: '🚀',
                action: { text: 'Deposit', href: '/deposit' }
            }
        ];
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        return {
            id: `tip_${Date.now()}`,
            type: 'tip',
            title: randomTip.title,
            message: randomTip.message,
            emoji: randomTip.emoji,
            priority: 'low',
            duration: 6000,
            action: randomTip.action
        };
    }, []);
    const generatePersonalizedMessage = useCallback(() => {
        // Priority order: Streak > Balance > Welcome > Random Tip
        const streakMessage = generateStreakMessage();
        if (streakMessage)
            return streakMessage;
        const balanceMessage = generateBalanceAlert();
        if (balanceMessage)
            return balanceMessage;
        // Show welcome message randomly 30% of the time
        if (Math.random() < 0.3) {
            return generateWelcomeMessage();
        }
        return generateRandomTip();
    }, [generateStreakMessage, generateBalanceAlert, generateWelcomeMessage, generateRandomTip]);
    const showMessage = useCallback((message) => {
        setCurrentMessage(message);
        setMessageHistory(prev => [message, ...prev.slice(0, 9)]); // Keep last 10 messages
        setTimeout(() => {
            setCurrentMessage(null);
        }, message.duration);
    }, []);
    const dismissMessage = useCallback(() => {
        setCurrentMessage(null);
    }, []);
    const triggerPersonalizedMessage = useCallback(() => {
        const message = generatePersonalizedMessage();
        showMessage(message);
    }, [generatePersonalizedMessage, showMessage]);
    const getMotivationalQuote = useCallback(() => {
        const quotes = [
            { text: "Every expert was once a beginner.", emoji: "🌟" },
            { text: "Fortune favors the bold!", emoji: "⚡" },
            { text: "Your next big win is one bet away.", emoji: "🎯" },
            { text: "Champions are made in moments like these.", emoji: "👑" },
            { text: "Trust your instincts and the data.", emoji: "🧠" },
            { text: "Today's risk is tomorrow's reward.", emoji: "💎" }
        ];
        return quotes[Math.floor(Math.random() * quotes.length)];
    }, []);
    // Auto-trigger welcome message on component mount
    useEffect(() => {
        const timer = setTimeout(() => {
            triggerPersonalizedMessage();
        }, 1000);
        return () => clearTimeout(timer);
    }, [triggerPersonalizedMessage]);
    return {
        currentMessage,
        messageHistory,
        showMessage,
        dismissMessage,
        triggerPersonalizedMessage,
        generateWelcomeMessage,
        getMotivationalQuote,
        getUserName
    };
}
