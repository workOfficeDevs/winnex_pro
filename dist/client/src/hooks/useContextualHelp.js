import { useState, useCallback } from 'react';
import { useLocation } from 'wouter';
const CONTEXTUAL_HELP_TIPS = {
    '/': [
        {
            id: 'welcome_dashboard',
            title: 'Welcome to Winnex Pro! 🎉',
            content: 'Your crypto betting adventure starts here! Check out live matches, place bets, and track your performance.',
            emoji: '🎉',
            priority: 'high',
            page: '/',
            trigger: 'onload',
            position: { x: 50, y: 20 },
            shown: false
        },
        {
            id: 'balance_help',
            title: 'Crypto Balance 💰',
            content: 'Your balance shows in real-time. Click deposit to add funds with Bitcoin, Ethereum, or other cryptos!',
            emoji: '💰',
            priority: 'medium',
            page: '/',
            trigger: 'interaction',
            position: { x: 80, y: 10 },
            shown: false
        }
    ],
    '/sports': [
        {
            id: 'sports_betting',
            title: 'Sports Betting Hub ⚽',
            content: 'Browse live and upcoming matches. Click on odds to add them to your bet slip!',
            emoji: '⚽',
            priority: 'high',
            page: '/sports',
            trigger: 'onload',
            position: { x: 50, y: 30 },
            shown: false
        },
        {
            id: 'live_betting_tip',
            title: 'Live Betting 🔥',
            content: 'Watch for the LIVE indicator! Odds change in real-time during matches.',
            emoji: '🔥',
            priority: 'medium',
            page: '/sports',
            trigger: 'interaction',
            position: { x: 70, y: 50 },
            shown: false
        }
    ],
    '/casino': [
        {
            id: 'casino_games',
            title: 'Casino Games 🎲',
            content: 'Try your luck with slots, poker, and table games. All games use your crypto balance!',
            emoji: '🎲',
            priority: 'high',
            page: '/casino',
            trigger: 'onload',
            position: { x: 50, y: 25 },
            shown: false
        }
    ],
    '/ai-assistant': [
        {
            id: 'ai_predictions',
            title: 'AI Betting Assistant 🤖',
            content: 'Get 94.2% accurate predictions! Our AI analyzes thousands of data points.',
            emoji: '🤖',
            priority: 'high',
            page: '/ai-assistant',
            trigger: 'onload',
            position: { x: 50, y: 20 },
            shown: false
        }
    ],
    '/deposit': [
        {
            id: 'crypto_deposit',
            title: 'Crypto Deposits 🚀',
            content: 'Choose your cryptocurrency and get your unique wallet address. Deposits are usually instant!',
            emoji: '🚀',
            priority: 'high',
            page: '/deposit',
            trigger: 'onload',
            position: { x: 50, y: 30 },
            shown: false
        }
    ],
    '/profile': [
        {
            id: 'profile_achievements',
            title: 'Your Gaming Profile ⭐',
            content: 'Track your achievements, betting history, and level progress. Show off your accomplishments!',
            emoji: '⭐',
            priority: 'medium',
            page: '/profile',
            trigger: 'onload',
            position: { x: 50, y: 25 },
            shown: false
        }
    ],
    '/leaderboard': [
        {
            id: 'leaderboard_competition',
            title: 'Leaderboard Competition 👑',
            content: 'See top players and climb the ranks! Compete in daily, weekly, and monthly challenges.',
            emoji: '👑',
            priority: 'medium',
            page: '/leaderboard',
            trigger: 'onload',
            position: { x: 50, y: 20 },
            shown: false
        }
    ]
};
const ERROR_HELP_TIPS = {
    insufficient_balance: {
        id: 'insufficient_balance_help',
        title: 'Need More Funds? 💸',
        content: 'Looks like you need to top up! Click the deposit button to add crypto to your account.',
        emoji: '💸',
        priority: 'high',
        page: '',
        trigger: 'error',
        position: { x: 50, y: 50 },
        shown: false
    },
    bet_failed: {
        id: 'bet_failed_help',
        title: 'Bet Issue? 🤔',
        content: 'Sometimes odds change quickly. Try refreshing and placing your bet again!',
        emoji: '🤔',
        priority: 'high',
        page: '',
        trigger: 'error',
        position: { x: 50, y: 50 },
        shown: false
    },
    network_error: {
        id: 'network_error_help',
        title: 'Connection Issue 📶',
        content: 'Check your internet connection. We\'ll automatically retry when you\'re back online!',
        emoji: '📶',
        priority: 'high',
        page: '',
        trigger: 'error',
        position: { x: 50, y: 50 },
        shown: false
    }
};
export function useContextualHelp() {
    const [location] = useLocation();
    const [helpSystem, setHelpSystem] = useState({
        tips: [],
        activeTip: null,
        showHelp: false
    });
    const getPageTips = useCallback((page) => {
        return CONTEXTUAL_HELP_TIPS[page] || [];
    }, []);
    const showTip = useCallback((tipId) => {
        const allTips = Object.values(CONTEXTUAL_HELP_TIPS).flat();
        const tip = allTips.find(t => t.id === tipId);
        if (tip && !tip.shown) {
            setHelpSystem(prev => ({
                ...prev,
                activeTip: tip,
                showHelp: true
            }));
            // Mark tip as shown
            tip.shown = true;
        }
    }, []);
    const hideTip = useCallback(() => {
        setHelpSystem(prev => ({
            ...prev,
            activeTip: null,
            showHelp: false
        }));
    }, []);
    const showErrorHelp = useCallback((errorType) => {
        const errorTip = ERROR_HELP_TIPS[errorType];
        if (errorTip) {
            setHelpSystem(prev => ({
                ...prev,
                activeTip: errorTip,
                showHelp: true
            }));
        }
    }, []);
    const showAchievementHelp = useCallback((achievementId) => {
        const achievementTip = {
            id: `achievement_${achievementId}`,
            title: 'Achievement Unlocked! 🏆',
            content: 'Congratulations! You\'ve unlocked a new achievement. Keep playing to unlock more rewards!',
            emoji: '🏆',
            priority: 'high',
            page: location,
            trigger: 'achievement',
            position: { x: 50, y: 30 },
            shown: false
        };
        setHelpSystem(prev => ({
            ...prev,
            activeTip: achievementTip,
            showHelp: true
        }));
    }, [location]);
    const getOnboardingTips = useCallback(() => {
        const currentPageTips = getPageTips(location);
        return currentPageTips.filter(tip => tip.trigger === 'onload' && !tip.shown && tip.priority === 'high');
    }, [location, getPageTips]);
    const triggerContextualHelp = useCallback((trigger, context) => {
        const currentPageTips = getPageTips(location);
        const relevantTips = currentPageTips.filter(tip => tip.trigger === trigger && !tip.shown);
        if (relevantTips.length > 0) {
            // Show highest priority tip first
            const sortedTips = relevantTips.sort((a, b) => {
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            });
            showTip(sortedTips[0].id);
        }
    }, [location, getPageTips, showTip]);
    const resetHelpTips = useCallback(() => {
        Object.values(CONTEXTUAL_HELP_TIPS).flat().forEach(tip => {
            tip.shown = false;
        });
    }, []);
    const getHelpStats = useCallback(() => {
        const allTips = Object.values(CONTEXTUAL_HELP_TIPS).flat();
        const shownTips = allTips.filter(tip => tip.shown).length;
        return {
            totalTips: allTips.length,
            shownTips,
            remainingTips: allTips.length - shownTips,
            completionPercentage: Math.round((shownTips / allTips.length) * 100)
        };
    }, []);
    return {
        helpSystem,
        showTip,
        hideTip,
        showErrorHelp,
        showAchievementHelp,
        getOnboardingTips,
        triggerContextualHelp,
        resetHelpTips,
        getHelpStats,
        currentPageTips: getPageTips(location)
    };
}
