import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Sun, Moon, Zap, Flame, Droplets, Leaf, Crown, Diamond, Star, Settings, Check, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
const PERSONALIZED_THEMES = [
    {
        id: 'midnight-professional',
        name: 'Midnight Professional',
        description: 'Sophisticated dark theme for serious traders',
        icon: _jsx(Moon, { className: "w-5 h-5" }),
        personality: 'professional',
        unlockLevel: 0,
        colors: {
            primary: '#3B82F6',
            primaryHover: '#2563EB',
            accent: '#10B981',
            background: '#0F172A',
            surface: '#1E293B',
            text: '#F8FAFC',
            textMuted: '#94A3B8',
            border: '#334155',
            gradient: 'from-blue-600 to-purple-600'
        },
        cssVariables: {
            '--primary': '59 130 246',
            '--primary-hover': '37 99 235',
            '--accent': '16 185 129',
            '--background': '15 23 42',
            '--surface': '30 41 59',
            '--text': '248 250 252',
            '--text-muted': '148 163 184',
            '--border': '51 65 85'
        }
    },
    {
        id: 'solar-energy',
        name: 'Solar Energy',
        description: 'Bright and energetic theme for active traders',
        icon: _jsx(Sun, { className: "w-5 h-5" }),
        personality: 'energetic',
        unlockLevel: 5,
        colors: {
            primary: '#F59E0B',
            primaryHover: '#D97706',
            accent: '#EF4444',
            background: '#FEF3C7',
            surface: '#FFFFFF',
            text: '#1F2937',
            textMuted: '#6B7280',
            border: '#FDE68A',
            gradient: 'from-yellow-400 to-orange-500'
        },
        cssVariables: {
            '--primary': '245 158 11',
            '--primary-hover': '217 119 6',
            '--accent': '239 68 68',
            '--background': '254 243 199',
            '--surface': '255 255 255',
            '--text': '31 41 55',
            '--text-muted': '107 114 128',
            '--border': '253 230 138'
        }
    },
    {
        id: 'ocean-depths',
        name: 'Ocean Depths',
        description: 'Calming blue theme for focused trading',
        icon: _jsx(Droplets, { className: "w-5 h-5" }),
        personality: 'calm',
        unlockLevel: 10,
        colors: {
            primary: '#0EA5E9',
            primaryHover: '#0284C7',
            accent: '#06B6D4',
            background: '#0C4A6E',
            surface: '#155E75',
            text: '#E0F2FE',
            textMuted: '#BAE6FD',
            border: '#0891B2',
            gradient: 'from-cyan-500 to-blue-600'
        },
        cssVariables: {
            '--primary': '14 165 233',
            '--primary-hover': '2 132 199',
            '--accent': '6 182 212',
            '--background': '12 74 110',
            '--surface': '21 94 117',
            '--text': '224 242 254',
            '--text-muted': '186 230 253',
            '--border': '8 145 178'
        }
    },
    {
        id: 'forest-sanctuary',
        name: 'Forest Sanctuary',
        description: 'Natural green theme for balanced trading',
        icon: _jsx(Leaf, { className: "w-5 h-5" }),
        personality: 'calm',
        unlockLevel: 15,
        colors: {
            primary: '#059669',
            primaryHover: '#047857',
            accent: '#84CC16',
            background: '#064E3B',
            surface: '#065F46',
            text: '#ECFDF5',
            textMuted: '#A7F3D0',
            border: '#047857',
            gradient: 'from-green-500 to-emerald-600'
        },
        cssVariables: {
            '--primary': '5 150 105',
            '--primary-hover': '4 120 87',
            '--accent': '132 204 22',
            '--background': '6 78 59',
            '--surface': '6 95 70',
            '--text': '236 253 245',
            '--text-muted': '167 243 208',
            '--border': '4 120 87'
        }
    },
    {
        id: 'royal-purple',
        name: 'Royal Purple',
        description: 'Luxurious theme for VIP traders',
        icon: _jsx(Crown, { className: "w-5 h-5" }),
        personality: 'luxurious',
        unlockLevel: 25,
        colors: {
            primary: '#7C3AED',
            primaryHover: '#6D28D9',
            accent: '#F59E0B',
            background: '#1E1B4B',
            surface: '#312E81',
            text: '#F3F4F6',
            textMuted: '#C4B5FD',
            border: '#5B21B6',
            gradient: 'from-purple-600 to-indigo-600'
        },
        cssVariables: {
            '--primary': '124 58 237',
            '--primary-hover': '109 40 217',
            '--accent': '245 158 11',
            '--background': '30 27 75',
            '--surface': '49 46 129',
            '--text': '243 244 246',
            '--text-muted': '196 181 253',
            '--border': '91 33 182'
        }
    },
    {
        id: 'neon-gaming',
        name: 'Neon Gaming',
        description: 'Electric theme for gaming enthusiasts',
        icon: _jsx(Zap, { className: "w-5 h-5" }),
        personality: 'gaming',
        unlockLevel: 30,
        colors: {
            primary: '#EC4899',
            primaryHover: '#DB2777',
            accent: '#06FFA5',
            background: '#0A0A0A',
            surface: '#1A1A1A',
            text: '#FFFFFF',
            textMuted: '#A1A1AA',
            border: '#E91E63',
            gradient: 'from-pink-500 to-cyan-400'
        },
        cssVariables: {
            '--primary': '236 72 153',
            '--primary-hover': '219 39 119',
            '--accent': '6 255 165',
            '--background': '10 10 10',
            '--surface': '26 26 26',
            '--text': '255 255 255',
            '--text-muted': '161 161 170',
            '--border': '233 30 99'
        }
    },
    {
        id: 'diamond-elite',
        name: 'Diamond Elite',
        description: 'Premium theme for elite traders',
        icon: _jsx(Diamond, { className: "w-5 h-5" }),
        personality: 'luxurious',
        unlockLevel: 50,
        colors: {
            primary: '#F8FAFC',
            primaryHover: '#E2E8F0',
            accent: '#3B82F6',
            background: '#111827',
            surface: '#374151',
            text: '#F9FAFB',
            textMuted: '#9CA3AF',
            border: '#6B7280',
            gradient: 'from-gray-200 to-blue-400'
        },
        cssVariables: {
            '--primary': '248 250 252',
            '--primary-hover': '226 232 240',
            '--accent': '59 130 246',
            '--background': '17 24 39',
            '--surface': '55 65 81',
            '--text': '249 250 251',
            '--text-muted': '156 163 175',
            '--border': '107 114 128'
        }
    }
];
const ThemeContext = createContext({
    currentTheme: PERSONALIZED_THEMES[0],
    availableThemes: PERSONALIZED_THEMES,
    userLevel: 0,
    switchTheme: () => { },
    isThemeUnlocked: () => false
});
export const usePersonalizedTheme = () => useContext(ThemeContext);
export const PersonalizedThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(PERSONALIZED_THEMES[0]);
    const [userLevel, setUserLevel] = useState(0);
    // Load saved theme and user level from localStorage
    useEffect(() => {
        const savedThemeId = localStorage.getItem('winnex-personalized-theme');
        const savedUserLevel = parseInt(localStorage.getItem('winnex-user-level') || '0');
        setUserLevel(savedUserLevel);
        if (savedThemeId) {
            const theme = PERSONALIZED_THEMES.find(t => t.id === savedThemeId);
            if (theme && isThemeUnlocked(theme)) {
                setCurrentTheme(theme);
            }
        }
    }, []);
    // Apply CSS variables when theme changes
    useEffect(() => {
        const root = document.documentElement;
        Object.entries(currentTheme.cssVariables).forEach(([property, value]) => {
            root.style.setProperty(property, value);
        });
    }, [currentTheme]);
    const isThemeUnlocked = (theme) => {
        return userLevel >= theme.unlockLevel;
    };
    const switchTheme = (themeId) => {
        const theme = PERSONALIZED_THEMES.find(t => t.id === themeId);
        if (theme && isThemeUnlocked(theme)) {
            setCurrentTheme(theme);
            localStorage.setItem('winnex-personalized-theme', themeId);
        }
    };
    const value = {
        currentTheme,
        availableThemes: PERSONALIZED_THEMES,
        userLevel,
        switchTheme,
        isThemeUnlocked
    };
    return (_jsx(ThemeContext.Provider, { value: value, children: children }));
};
export const ThemeCustomizer = ({ isOpen, onClose }) => {
    const { currentTheme, availableThemes, switchTheme, isThemeUnlocked, userLevel } = usePersonalizedTheme();
    const [selectedTheme, setSelectedTheme] = useState(currentTheme.id);
    const handleThemeSelect = (themeId) => {
        const theme = availableThemes.find(t => t.id === themeId);
        if (theme && isThemeUnlocked(theme)) {
            setSelectedTheme(themeId);
            switchTheme(themeId);
        }
    };
    const groupedThemes = availableThemes.reduce((acc, theme) => {
        if (!acc[theme.personality]) {
            acc[theme.personality] = [];
        }
        acc[theme.personality].push(theme);
        return acc;
    }, {});
    const getPersonalityLabel = (personality) => {
        const labels = {
            professional: 'Professional',
            energetic: 'Energetic',
            calm: 'Calm & Focused',
            luxurious: 'Luxurious',
            gaming: 'Gaming'
        };
        return labels[personality] || personality;
    };
    const getPersonalityIcon = (personality) => {
        const icons = {
            professional: _jsx(Settings, { className: "w-4 h-4" }),
            energetic: _jsx(Flame, { className: "w-4 h-4" }),
            calm: _jsx(Droplets, { className: "w-4 h-4" }),
            luxurious: _jsx(Crown, { className: "w-4 h-4" }),
            gaming: _jsx(Zap, { className: "w-4 h-4" })
        };
        return icons[personality] || _jsx(Star, { className: "w-4 h-4" });
    };
    return (_jsx(AnimatePresence, { children: isOpen && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50", onClick: onClose }), _jsx(motion.div, { initial: { opacity: 0, scale: 0.9, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.9, y: 20 }, className: "fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[800px] md:max-h-[80vh] z-50", children: _jsxs(Card, { className: "h-full bg-gray-900 border-gray-700 overflow-hidden", children: [_jsx(CardHeader, { className: "border-b border-gray-700", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(CardTitle, { className: "flex items-center gap-2 text-white", children: [_jsx(Palette, { className: "w-6 h-6 text-blue-400" }), "Personalized Themes", _jsxs(Badge, { variant: "outline", className: "ml-2", children: ["Level ", userLevel] })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: onClose, className: "text-gray-400", children: "\u00D7" })] }) }), _jsxs(CardContent, { className: "p-6 overflow-y-auto max-h-[calc(80vh-120px)]", children: [Object.entries(groupedThemes).map(([personality, themes]) => (_jsxs("div", { className: "mb-8", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [getPersonalityIcon(personality), _jsx("h3", { className: "text-lg font-semibold text-white", children: getPersonalityLabel(personality) })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: themes.map((theme) => {
                                                    const isUnlocked = isThemeUnlocked(theme);
                                                    const isSelected = selectedTheme === theme.id;
                                                    return (_jsxs(motion.div, { whileHover: isUnlocked ? { scale: 1.02 } : {}, whileTap: isUnlocked ? { scale: 0.98 } : {}, className: `relative cursor-pointer transition-all ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : ''}`, onClick: () => isUnlocked && handleThemeSelect(theme.id), children: [_jsx(Card, { className: `${isSelected
                                                                    ? 'border-blue-400 ring-2 ring-blue-400/50'
                                                                    : 'border-gray-600 hover:border-gray-500'} bg-gray-800 transition-all`, children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "p-2 rounded-full", style: {
                                                                                                background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.accent})`
                                                                                            }, children: theme.icon }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-white text-sm", children: theme.name }), _jsx("p", { className: "text-xs text-gray-400", children: theme.description })] })] }), isSelected && (_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, className: "bg-blue-500 rounded-full p-1", children: _jsx(Check, { className: "w-3 h-3 text-white" }) }))] }), _jsxs("div", { className: "flex gap-1 mb-3", children: [_jsx("div", { className: "w-6 h-6 rounded-full border-2 border-gray-600", style: { backgroundColor: theme.colors.primary } }), _jsx("div", { className: "w-6 h-6 rounded-full border-2 border-gray-600", style: { backgroundColor: theme.colors.accent } }), _jsx("div", { className: "w-6 h-6 rounded-full border-2 border-gray-600", style: { backgroundColor: theme.colors.surface } })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Badge, { variant: isUnlocked ? 'default' : 'secondary', className: "text-xs", children: isUnlocked ? 'Unlocked' : `Level ${theme.unlockLevel} Required` }), !isUnlocked && (_jsx("div", { className: "text-gray-400", children: _jsx(Star, { className: "w-4 h-4" }) }))] })] }) }), !isUnlocked && (_jsx("div", { className: "absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "bg-gray-700 rounded-full p-3 mb-2 mx-auto w-fit", children: _jsx(Star, { className: "w-6 h-6 text-gray-400" }) }), _jsxs("p", { className: "text-white font-semibold text-sm", children: ["Level ", theme.unlockLevel] }), _jsx("p", { className: "text-gray-400 text-xs", children: "Keep trading to unlock!" })] }) }))] }, theme.id));
                                                }) })] }, personality))), _jsx(Card, { className: "bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30 mt-6", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx(Sparkles, { className: "w-5 h-5 text-blue-400" }), _jsx("h3", { className: "font-semibold text-white", children: "Unlock Progress" })] }), _jsx("p", { className: "text-gray-300 text-sm mb-3", children: "Complete trades and challenges to unlock premium themes" }), _jsx("div", { className: "bg-gray-700 rounded-full h-2 mb-2", children: _jsx(motion.div, { className: "bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full", initial: { width: 0 }, animate: { width: `${Math.min((userLevel / 50) * 100, 100)}%` }, transition: { duration: 1, ease: "easeOut" } }) }), _jsxs("p", { className: "text-xs text-gray-400", children: ["Level ", userLevel, " / 50 - ", availableThemes.filter(t => isThemeUnlocked(t)).length, " themes unlocked"] })] }) })] })] }) })] })) }));
};
export default {
    PersonalizedThemeProvider,
    ThemeCustomizer,
    usePersonalizedTheme
};
