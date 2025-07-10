import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, X, Lightbulb, Sparkles, Play, HelpCircle, CheckCircle, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// Predefined onboarding flows
const ONBOARDING_FLOWS = [
    {
        id: 'betting-basics',
        name: 'Betting Basics',
        description: 'Learn how to place your first bet',
        steps: [
            {
                id: 'welcome',
                target: '[data-tour="betting-overview"]',
                title: '🎯 Welcome to Winnex Pro!',
                content: 'Let\'s show you how to place winning bets. This quick tour will take just 2 minutes.',
                position: 'bottom'
            },
            {
                id: 'sports-selection',
                target: '[data-tour="sports-list"]',
                title: '⚽ Choose Your Sport',
                content: 'Start by selecting the sport you want to bet on. We have live odds for all major sports.',
                position: 'right'
            },
            {
                id: 'odds-explanation',
                target: '[data-tour="odds-display"]',
                title: '📊 Understanding Odds',
                content: 'These numbers show potential payouts. Higher odds = higher risk, higher reward!',
                position: 'left'
            },
            {
                id: 'bet-slip',
                target: '[data-tour="bet-slip"]',
                title: '🎫 Your Bet Slip',
                content: 'Click on odds to add them here. Set your stake amount and confirm your bet.',
                position: 'left',
                action: {
                    label: 'Try Adding a Bet',
                    handler: () => console.log('Opening bet slip demo')
                }
            }
        ]
    },
    {
        id: 'crypto-wallet',
        name: 'Crypto Wallet Setup',
        description: 'Set up your cryptocurrency wallet',
        steps: [
            {
                id: 'wallet-intro',
                target: '[data-tour="crypto-wallet"]',
                title: '💰 Your Crypto Wallet',
                content: 'Manage all your cryptocurrencies in one secure place. Deposits are instant!',
                position: 'bottom'
            },
            {
                id: 'deposit-funds',
                target: '[data-tour="deposit-button"]',
                title: '⬇️ Making Deposits',
                content: 'Click here to deposit Bitcoin, Ethereum, or other supported cryptocurrencies.',
                position: 'top'
            },
            {
                id: 'withdrawal-process',
                target: '[data-tour="withdraw-button"]',
                title: '⬆️ Quick Withdrawals',
                content: 'Withdraw your winnings anytime. Most transactions complete within minutes.',
                position: 'top'
            }
        ]
    },
    {
        id: 'ai-assistant',
        name: 'AI Betting Assistant',
        description: 'Discover AI-powered betting insights',
        steps: [
            {
                id: 'ai-intro',
                target: '[data-tour="ai-assistant"]',
                title: '🤖 Meet Your AI Assistant',
                content: 'Get personalized betting recommendations with 94.2% accuracy from our AI.',
                position: 'bottom'
            },
            {
                id: 'ai-predictions',
                target: '[data-tour="ai-predictions"]',
                title: '🎯 Smart Predictions',
                content: 'Our AI analyzes thousands of data points to find the best betting opportunities.',
                position: 'right'
            },
            {
                id: 'risk-management',
                target: '[data-tour="risk-assessment"]',
                title: '🛡️ Risk Management',
                content: 'Set betting limits and get alerts when you\'re approaching them.',
                position: 'left'
            }
        ]
    }
];
const ContextualOnboardingWizard = () => {
    const [activeFlow, setActiveFlow] = useState(null);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [completedFlows, setCompletedFlows] = useState([]);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = useRef(null);
    // Auto-detect page context and suggest relevant onboarding
    useEffect(() => {
        const path = window.location.pathname;
        const shouldAutoStart = !completedFlows.includes('betting-basics');
        if (shouldAutoStart && path === '/') {
            setTimeout(() => {
                startFlow('betting-basics');
            }, 2000);
        }
    }, [completedFlows]);
    // Calculate tooltip position based on target element
    const calculateTooltipPosition = (targetSelector, position) => {
        const targetElement = document.querySelector(targetSelector);
        if (!targetElement)
            return { x: 0, y: 0 };
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltipRef.current?.getBoundingClientRect();
        const tooltipWidth = tooltipRect?.width || 300;
        const tooltipHeight = tooltipRect?.height || 150;
        let x = 0, y = 0;
        switch (position) {
            case 'top':
                x = rect.left + rect.width / 2 - tooltipWidth / 2;
                y = rect.top - tooltipHeight - 10;
                break;
            case 'bottom':
                x = rect.left + rect.width / 2 - tooltipWidth / 2;
                y = rect.bottom + 10;
                break;
            case 'left':
                x = rect.left - tooltipWidth - 10;
                y = rect.top + rect.height / 2 - tooltipHeight / 2;
                break;
            case 'right':
                x = rect.right + 10;
                y = rect.top + rect.height / 2 - tooltipHeight / 2;
                break;
        }
        // Keep tooltip within viewport
        x = Math.max(10, Math.min(x, window.innerWidth - tooltipWidth - 10));
        y = Math.max(10, Math.min(y, window.innerHeight - tooltipHeight - 10));
        return { x, y };
    };
    const startFlow = (flowId) => {
        const flow = ONBOARDING_FLOWS.find(f => f.id === flowId);
        if (!flow)
            return;
        setActiveFlow(flow);
        setCurrentStepIndex(0);
        setIsVisible(true);
        // Calculate initial position
        const position = calculateTooltipPosition(flow.steps[0].target, flow.steps[0].position);
        setTooltipPosition(position);
    };
    const nextStep = () => {
        if (!activeFlow)
            return;
        if (currentStepIndex < activeFlow.steps.length - 1) {
            const newIndex = currentStepIndex + 1;
            setCurrentStepIndex(newIndex);
            const newPosition = calculateTooltipPosition(activeFlow.steps[newIndex].target, activeFlow.steps[newIndex].position);
            setTooltipPosition(newPosition);
        }
        else {
            completeFlow();
        }
    };
    const prevStep = () => {
        if (currentStepIndex > 0) {
            const newIndex = currentStepIndex - 1;
            setCurrentStepIndex(newIndex);
            const newPosition = calculateTooltipPosition(activeFlow.steps[newIndex].target, activeFlow.steps[newIndex].position);
            setTooltipPosition(newPosition);
        }
    };
    const completeFlow = () => {
        if (activeFlow) {
            setCompletedFlows(prev => [...prev, activeFlow.id]);
        }
        closeWizard();
    };
    const closeWizard = () => {
        setIsVisible(false);
        setActiveFlow(null);
        setCurrentStepIndex(0);
    };
    const currentStep = activeFlow?.steps[currentStepIndex];
    return (_jsxs(_Fragment, { children: [!isVisible && (_jsx(motion.div, { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, className: "fixed bottom-6 right-6 z-50", children: _jsx(motion.button, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, onClick: () => {
                        const incompleteFlow = ONBOARDING_FLOWS.find(flow => !completedFlows.includes(flow.id));
                        if (incompleteFlow) {
                            startFlow(incompleteFlow.id);
                        }
                    }, className: "bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300", children: _jsx(HelpCircle, { className: "w-6 h-6" }) }) })), _jsx(AnimatePresence, { children: isVisible && activeFlow && currentStep && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black/20 backdrop-blur-sm z-40", onClick: closeWizard }), _jsx(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.8 }, className: "fixed pointer-events-none z-50", style: {
                                ...(() => {
                                    const targetEl = document.querySelector(currentStep.target);
                                    if (!targetEl)
                                        return {};
                                    const rect = targetEl.getBoundingClientRect();
                                    return {
                                        left: rect.left - 4,
                                        top: rect.top - 4,
                                        width: rect.width + 8,
                                        height: rect.height + 8
                                    };
                                })()
                            }, children: _jsx("div", { className: "w-full h-full border-2 border-blue-400 rounded-lg bg-blue-400/10 animate-pulse" }) }), _jsxs(motion.div, { ref: tooltipRef, initial: { opacity: 0, scale: 0.8, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.8, y: 20 }, className: "fixed z-50 max-w-sm", style: {
                                left: tooltipPosition.x,
                                top: tooltipPosition.y
                            }, children: [_jsx(Card, { className: "bg-gradient-to-br from-gray-900 to-gray-800 border-blue-500/50 shadow-2xl", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "bg-blue-500 p-2 rounded-full", children: _jsx(Lightbulb, { className: "w-4 h-4 text-white" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-white text-lg", children: currentStep.title }), _jsxs("p", { className: "text-xs text-gray-400", children: ["Step ", currentStepIndex + 1, " of ", activeFlow.steps.length] })] })] }), _jsx("button", { onClick: closeWizard, className: "text-gray-400 hover:text-white transition-colors", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsx("p", { className: "text-gray-300 mb-6 leading-relaxed", children: currentStep.content }), currentStep.action && (_jsxs(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onClick: currentStep.action.handler, className: "w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-4 rounded-lg mb-4 flex items-center justify-center gap-2", children: [_jsx(Play, { className: "w-4 h-4" }), currentStep.action.label] })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "flex items-center gap-2", children: currentStepIndex > 0 && (_jsxs(Button, { variant: "outline", size: "sm", onClick: prevStep, className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-1" }), "Back"] })) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex gap-1", children: activeFlow.steps.map((_, index) => (_jsx("div", { className: `w-2 h-2 rounded-full transition-colors ${index === currentStepIndex
                                                                        ? 'bg-blue-400'
                                                                        : index < currentStepIndex
                                                                            ? 'bg-green-400'
                                                                            : 'bg-gray-600'}` }, index))) }), _jsx(Button, { onClick: nextStep, className: "bg-blue-600 hover:bg-blue-700 text-white", size: "sm", children: currentStepIndex === activeFlow.steps.length - 1 ? (_jsxs(_Fragment, { children: ["Complete", _jsx(CheckCircle, { className: "w-4 h-4 ml-1" })] })) : (_jsxs(_Fragment, { children: ["Next", _jsx(ArrowRight, { className: "w-4 h-4 ml-1" })] })) })] })] })] }) }), _jsx("div", { className: `absolute w-4 h-4 bg-gray-900 transform rotate-45 ${currentStep.position === 'top' ? 'bottom-0 translate-y-2' :
                                        currentStep.position === 'bottom' ? 'top-0 -translate-y-2' :
                                            currentStep.position === 'left' ? 'right-0 translate-x-2' :
                                                'left-0 -translate-x-2'} ${currentStep.position === 'top' || currentStep.position === 'bottom'
                                        ? 'left-1/2 -translate-x-1/2'
                                        : 'top-1/2 -translate-y-1/2'}` })] })] })) }), _jsx(AnimatePresence, { children: !activeFlow && (_jsx(motion.div, { initial: { opacity: 0, y: 100 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 100 }, className: "fixed bottom-20 right-6 z-50", children: _jsx(Card, { className: "bg-gray-900 border-gray-700 max-w-xs", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("h3", { className: "font-bold text-white mb-3 flex items-center gap-2", children: [_jsx(Sparkles, { className: "w-5 h-5 text-blue-400" }), "Quick Tours"] }), _jsx("div", { className: "space-y-2", children: ONBOARDING_FLOWS.map((flow) => (_jsx(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onClick: () => startFlow(flow.id), className: `w-full text-left p-3 rounded-lg transition-all ${completedFlows.includes(flow.id)
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                            : 'bg-gray-800 hover:bg-gray-700 text-white'}`, children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: flow.name }), _jsx("p", { className: "text-xs text-gray-400", children: flow.description })] }), completedFlows.includes(flow.id) ? (_jsx(CheckCircle, { className: "w-5 h-5" })) : (_jsx(Zap, { className: "w-5 h-5" }))] }) }, flow.id))) })] }) }) })) })] }));
};
export default ContextualOnboardingWizard;
