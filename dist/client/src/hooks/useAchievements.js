import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
const ACHIEVEMENT_DEFINITIONS = {
    first_bet: {
        id: 'first_bet',
        title: 'First Steps',
        description: 'Place your first bet and start your journey!',
        icon: 'target',
        emoji: '🎯',
        rarity: 'common',
        points: 50,
        maxProgress: 1,
        category: 'betting'
    },
    big_winner: {
        id: 'big_winner',
        title: 'Big Winner',
        description: 'Win a bet worth $100 or more!',
        icon: 'trophy',
        emoji: '🏆',
        rarity: 'rare',
        points: 200,
        maxProgress: 1,
        category: 'betting'
    },
    crypto_master: {
        id: 'crypto_master',
        title: 'Crypto Master',
        description: 'Make deposits in 3 different cryptocurrencies',
        icon: 'coins',
        emoji: '💰',
        rarity: 'epic',
        points: 300,
        maxProgress: 3,
        category: 'financial'
    },
    social_butterfly: {
        id: 'social_butterfly',
        title: 'Social Butterfly',
        description: 'Share 10 winning bets with the community',
        icon: 'users',
        emoji: '🦋',
        rarity: 'rare',
        points: 150,
        maxProgress: 10,
        category: 'social'
    },
    ai_believer: {
        id: 'ai_believer',
        title: 'AI Believer',
        description: 'Follow 5 AI betting recommendations',
        icon: 'brain',
        emoji: '🤖',
        rarity: 'rare',
        points: 175,
        maxProgress: 5,
        category: 'betting'
    },
    high_roller: {
        id: 'high_roller',
        title: 'High Roller',
        description: 'Place a single bet worth $500 or more',
        icon: 'gem',
        emoji: '💎',
        rarity: 'legendary',
        points: 500,
        maxProgress: 1,
        category: 'betting'
    },
    streak_master: {
        id: 'streak_master',
        title: 'Streak Master',
        description: 'Win 5 consecutive bets',
        icon: 'zap',
        emoji: '⚡',
        rarity: 'epic',
        points: 250,
        maxProgress: 5,
        category: 'betting'
    },
    daily_player: {
        id: 'daily_player',
        title: 'Daily Player',
        description: 'Log in for 7 consecutive days',
        icon: 'calendar',
        emoji: '📅',
        rarity: 'common',
        points: 100,
        maxProgress: 7,
        category: 'milestone'
    },
    esports_champion: {
        id: 'esports_champion',
        title: 'Esports Champion',
        description: 'Win 10 esports bets',
        icon: 'gamepad',
        emoji: '🎮',
        rarity: 'rare',
        points: 200,
        maxProgress: 10,
        category: 'gaming'
    },
    withdrawal_king: {
        id: 'withdrawal_king',
        title: 'Withdrawal King',
        description: 'Successfully withdraw winnings 5 times',
        icon: 'bank',
        emoji: '🏦',
        rarity: 'rare',
        points: 150,
        maxProgress: 5,
        category: 'financial'
    }
};
export function useAchievements() {
    const [showNotification, setShowNotification] = useState(false);
    const [newAchievement, setNewAchievement] = useState(null);
    const queryClient = useQueryClient();
    const { data: userAchievements, isLoading } = useQuery({
        queryKey: ['/api/user/achievements'],
        retry: false
    });
    const unlockAchievementMutation = useMutation({
        mutationFn: async (achievementId) => {
            return apiRequest('POST', '/api/user/achievements/unlock', { achievementId });
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['/api/user/achievements'] });
            if (data.achievement) {
                setNewAchievement(data.achievement);
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 5000);
            }
        }
    });
    const updateProgressMutation = useMutation({
        mutationFn: async ({ achievementId, progress }) => {
            return apiRequest('POST', '/api/user/achievements/progress', { achievementId, progress });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/user/achievements'] });
        }
    });
    const checkAchievement = useCallback((achievementId, currentProgress) => {
        const achievement = ACHIEVEMENT_DEFINITIONS[achievementId];
        if (!achievement)
            return;
        if (currentProgress !== undefined) {
            updateProgressMutation.mutate({ achievementId, progress: currentProgress });
            if (currentProgress >= achievement.maxProgress) {
                unlockAchievementMutation.mutate(achievementId);
            }
        }
        else {
            unlockAchievementMutation.mutate(achievementId);
        }
    }, [unlockAchievementMutation, updateProgressMutation]);
    const getRarityColor = (rarity) => {
        switch (rarity) {
            case 'common': return 'text-gray-400 border-gray-400';
            case 'rare': return 'text-blue-400 border-blue-400';
            case 'epic': return 'text-purple-400 border-purple-400';
            case 'legendary': return 'text-yellow-400 border-yellow-400';
            default: return 'text-gray-400 border-gray-400';
        }
    };
    const getRarityGlow = (rarity) => {
        switch (rarity) {
            case 'common': return 'shadow-gray-400/20';
            case 'rare': return 'shadow-blue-400/30';
            case 'epic': return 'shadow-purple-400/40';
            case 'legendary': return 'shadow-yellow-400/50';
            default: return 'shadow-gray-400/20';
        }
    };
    const getUserLevel = () => {
        if (!userAchievements)
            return 1;
        return Math.floor(userAchievements.totalPoints / 1000) + 1;
    };
    const getNextLevelProgress = () => {
        if (!userAchievements)
            return 0;
        const currentLevelPoints = (getUserLevel() - 1) * 1000;
        const nextLevelPoints = getUserLevel() * 1000;
        const progress = userAchievements.totalPoints - currentLevelPoints;
        return (progress / (nextLevelPoints - currentLevelPoints)) * 100;
    };
    return {
        userAchievements,
        isLoading,
        checkAchievement,
        showNotification,
        newAchievement,
        setShowNotification,
        getRarityColor,
        getRarityGlow,
        getUserLevel,
        getNextLevelProgress,
        achievementDefinitions: ACHIEVEMENT_DEFINITIONS
    };
}
