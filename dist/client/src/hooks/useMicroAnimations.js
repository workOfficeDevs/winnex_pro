import { useState, useCallback } from 'react';
const ANIMATION_CLASSES = {
    bounce: {
        subtle: 'animate-bounce duration-500',
        normal: 'animate-bounce duration-700',
        strong: 'animate-bounce duration-1000'
    },
    pulse: {
        subtle: 'animate-pulse duration-1000',
        normal: 'animate-pulse duration-1500',
        strong: 'animate-pulse duration-2000'
    },
    shake: {
        subtle: 'animate-[shake_0.3s_ease-in-out]',
        normal: 'animate-[shake_0.5s_ease-in-out]',
        strong: 'animate-[shake_0.8s_ease-in-out]'
    },
    glow: {
        subtle: 'animate-[glow_1s_ease-in-out_infinite_alternate]',
        normal: 'animate-[glow_1.5s_ease-in-out_infinite_alternate]',
        strong: 'animate-[glow_2s_ease-in-out_infinite_alternate]'
    },
    rotate: {
        subtle: 'animate-[spin_2s_linear_infinite]',
        normal: 'animate-[spin_1.5s_linear_infinite]',
        strong: 'animate-[spin_1s_linear_infinite]'
    },
    scale: {
        subtle: 'animate-[scale_0.3s_ease-in-out]',
        normal: 'animate-[scale_0.5s_ease-in-out]',
        strong: 'animate-[scale_0.8s_ease-in-out]'
    },
    slide: {
        subtle: 'animate-[slideIn_0.3s_ease-out]',
        normal: 'animate-[slideIn_0.5s_ease-out]',
        strong: 'animate-[slideIn_0.8s_ease-out]'
    },
    fade: {
        subtle: 'animate-[fadeIn_0.3s_ease-in]',
        normal: 'animate-[fadeIn_0.5s_ease-in]',
        strong: 'animate-[fadeIn_0.8s_ease-in]'
    }
};
const PREDEFINED_ANIMATIONS = {
    betPlaced: { type: 'bounce', duration: 700, intensity: 'normal', trigger: 'success' },
    balanceUpdate: { type: 'glow', duration: 1000, intensity: 'subtle', trigger: 'success' },
    winCelebration: { type: 'bounce', duration: 1000, intensity: 'strong', trigger: 'success' },
    errorShake: { type: 'shake', duration: 500, intensity: 'normal', trigger: 'error' },
    loadingPulse: { type: 'pulse', duration: 1500, intensity: 'normal', trigger: 'loading' },
    buttonHover: { type: 'scale', duration: 300, intensity: 'subtle', trigger: 'hover' },
    newNotification: { type: 'slide', duration: 500, intensity: 'normal', trigger: 'success' },
    achievementUnlock: { type: 'glow', duration: 2000, intensity: 'strong', trigger: 'success' },
    coinFlip: { type: 'rotate', duration: 1000, intensity: 'normal', trigger: 'click' },
    heartbeat: { type: 'pulse', duration: 800, intensity: 'subtle', trigger: 'hover' }
};
export function useMicroAnimations() {
    const [activeAnimations, setActiveAnimations] = useState(new Map());
    const getAnimationClass = useCallback((config) => {
        return ANIMATION_CLASSES[config.type][config.intensity];
    }, []);
    const triggerAnimation = useCallback((elementId, animationName) => {
        const config = typeof animationName === 'string'
            ? PREDEFINED_ANIMATIONS[animationName]
            : animationName;
        const animationClass = getAnimationClass(config);
        setActiveAnimations(prev => new Map(prev.set(elementId, animationClass)));
        setTimeout(() => {
            setActiveAnimations(prev => {
                const newMap = new Map(prev);
                newMap.delete(elementId);
                return newMap;
            });
        }, config.duration);
    }, [getAnimationClass]);
    const getElementAnimation = useCallback((elementId) => {
        return activeAnimations.get(elementId) || '';
    }, [activeAnimations]);
    const createAnimatedProps = useCallback((elementId, animationName, additionalClasses = '') => {
        const animationClass = getElementAnimation(elementId);
        return {
            className: `${additionalClasses} ${animationClass}`.trim(),
            onClick: () => {
                const config = PREDEFINED_ANIMATIONS[animationName];
                if (config.trigger === 'click') {
                    triggerAnimation(elementId, animationName);
                }
            },
            onMouseEnter: () => {
                const config = PREDEFINED_ANIMATIONS[animationName];
                if (config.trigger === 'hover') {
                    triggerAnimation(elementId, animationName);
                }
            }
        };
    }, [getElementAnimation, triggerAnimation]);
    const animateSuccess = useCallback((elementId) => {
        triggerAnimation(elementId, 'winCelebration');
    }, [triggerAnimation]);
    const animateError = useCallback((elementId) => {
        triggerAnimation(elementId, 'errorShake');
    }, [triggerAnimation]);
    const animateLoading = useCallback((elementId) => {
        triggerAnimation(elementId, 'loadingPulse');
    }, [triggerAnimation]);
    const animateBetPlaced = useCallback((elementId) => {
        triggerAnimation(elementId, 'betPlaced');
    }, [triggerAnimation]);
    const animateBalanceUpdate = useCallback((elementId) => {
        triggerAnimation(elementId, 'balanceUpdate');
    }, [triggerAnimation]);
    const animateAchievement = useCallback((elementId) => {
        triggerAnimation(elementId, 'achievementUnlock');
    }, [triggerAnimation]);
    return {
        triggerAnimation,
        getElementAnimation,
        createAnimatedProps,
        animateSuccess,
        animateError,
        animateLoading,
        animateBetPlaced,
        animateBalanceUpdate,
        animateAchievement,
        predefinedAnimations: PREDEFINED_ANIMATIONS
    };
}
