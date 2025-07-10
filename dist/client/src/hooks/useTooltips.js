import { useState, useCallback } from 'react';
const PLAYFUL_TOOLTIPS = {
    balance: {
        id: 'balance',
        text: "Your crypto treasure chest! 💰 Time to add some coins?",
        emoji: '💰',
        position: 'bottom',
        playful: true,
        trigger: 'hover'
    },
    deposit: {
        id: 'deposit',
        text: "Fuel up your betting adventures! 🚀 Choose your crypto!",
        emoji: '🚀',
        position: 'bottom',
        playful: true,
        trigger: 'hover'
    },
    betslip: {
        id: 'betslip',
        text: "Your ticket to glory! ⚡ Make your predictions count!",
        emoji: '⚡',
        position: 'left',
        playful: true,
        trigger: 'hover'
    },
    livebetting: {
        id: 'livebetting',
        text: "The action is HOT! 🔥 Jump in while it's live!",
        emoji: '🔥',
        position: 'top',
        playful: true,
        trigger: 'hover'
    },
    aiassistant: {
        id: 'aiassistant',
        text: "Your crystal ball awaits! 🔮 94.2% prediction accuracy!",
        emoji: '🔮',
        position: 'bottom',
        playful: true,
        trigger: 'hover'
    },
    profile: {
        id: 'profile',
        text: "Your gaming identity! ⭐ Show off those achievements!",
        emoji: '⭐',
        position: 'left',
        playful: true,
        trigger: 'hover'
    },
    leaderboard: {
        id: 'leaderboard',
        text: "See who's dominating! 👑 Can you reach the top?",
        emoji: '👑',
        position: 'top',
        playful: true,
        trigger: 'hover'
    },
    casino: {
        id: 'casino',
        text: "Roll the dice of fortune! 🎲 Feeling lucky today?",
        emoji: '🎲',
        position: 'bottom',
        playful: true,
        trigger: 'hover'
    },
    esports: {
        id: 'esports',
        text: "Digital gladiator arena! ⚔️ Where legends are born!",
        emoji: '⚔️',
        position: 'top',
        playful: true,
        trigger: 'hover'
    },
    withdraw: {
        id: 'withdraw',
        text: "Cash out your victories! 💸 Your winnings await!",
        emoji: '💸',
        position: 'bottom',
        playful: true,
        trigger: 'hover'
    }
};
export function useTooltips() {
    const [activeTooltip, setActiveTooltip] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const showTooltip = useCallback((tooltipId, event) => {
        setActiveTooltip(tooltipId);
        if (event) {
            const rect = event.currentTarget.getBoundingClientRect();
            setTooltipPosition({
                x: rect.left + rect.width / 2,
                y: rect.top
            });
        }
    }, []);
    const hideTooltip = useCallback(() => {
        setActiveTooltip(null);
    }, []);
    const getTooltip = useCallback((tooltipId) => {
        return PLAYFUL_TOOLTIPS[tooltipId];
    }, []);
    const getTooltipProps = useCallback((tooltipId) => ({
        onMouseEnter: (e) => showTooltip(tooltipId, e),
        onMouseLeave: hideTooltip,
        'data-tooltip': tooltipId
    }), [showTooltip, hideTooltip]);
    return {
        activeTooltip,
        tooltipPosition,
        showTooltip,
        hideTooltip,
        getTooltip,
        getTooltipProps,
        tooltips: PLAYFUL_TOOLTIPS
    };
}
