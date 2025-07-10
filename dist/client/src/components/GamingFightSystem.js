import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Swords, Shield, Zap, Star, Trophy, Target, Sparkles, Crown, Gamepad2, Sword, ArrowUp, Bolt, AlertCircle } from "lucide-react";
const fighterSkills = {
    performance: [
        { name: "Speed Boost", icon: Zap, damage: 15, cooldown: 3, description: "Lightning fast optimization", animation: "speed" },
        { name: "Critical Hit", icon: Target, damage: 25, cooldown: 5, description: "Precision performance strike", animation: "critical" },
        { name: "System Overload", icon: Bolt, damage: 35, cooldown: 8, description: "Maximum performance burst", animation: "overload" }
    ],
    security: [
        { name: "Shield Wall", icon: Shield, damage: 10, cooldown: 2, description: "Defensive protection", animation: "shield" },
        { name: "Counter Attack", icon: Sword, damage: 20, cooldown: 4, description: "Defensive counter-strike", animation: "counter" },
        { name: "Fortress Mode", icon: Crown, damage: 30, cooldown: 7, description: "Impenetrable defense", animation: "fortress" }
    ],
    speed: [
        { name: "Quick Strike", icon: ArrowUp, damage: 18, cooldown: 2, description: "Rapid succession attacks", animation: "quick" },
        { name: "Blitz Mode", icon: Sparkles, damage: 28, cooldown: 6, description: "Ultimate speed enhancement", animation: "blitz" },
        { name: "Time Warp", icon: Star, damage: 40, cooldown: 10, description: "Bend time itself", animation: "warp" }
    ]
};
const initialFighters = [
    {
        id: "performance",
        name: "Performance Titan",
        type: "performance",
        health: 100,
        maxHealth: 100,
        attack: 18,
        defense: 12,
        special: 25,
        level: 5,
        experience: 750,
        skills: fighterSkills.performance,
        color: "from-green-400 to-emerald-600",
        emoji: "⚡",
        wins: 12,
        losses: 3
    },
    {
        id: "security",
        name: "Security Guardian",
        type: "security",
        health: 120,
        maxHealth: 120,
        attack: 15,
        defense: 20,
        special: 22,
        level: 4,
        experience: 600,
        skills: fighterSkills.security,
        color: "from-blue-400 to-cyan-600",
        emoji: "🛡️",
        wins: 8,
        losses: 5
    },
    {
        id: "speed",
        name: "Speed Demon",
        type: "speed",
        health: 90,
        maxHealth: 90,
        attack: 22,
        defense: 10,
        special: 28,
        level: 6,
        experience: 900,
        skills: fighterSkills.speed,
        color: "from-purple-400 to-pink-600",
        emoji: "💨",
        wins: 15,
        losses: 2
    }
];
export default function GamingFightSystem() {
    const [fighters, setFighters] = useState(initialFighters);
    const [selectedFighter, setSelectedFighter] = useState(null);
    const [opponent, setOpponent] = useState(null);
    const [battleLog, setBattleLog] = useState([]);
    const [gameState, setGameState] = useState("selection");
    const [currentTurn, setCurrentTurn] = useState("player");
    const [skillCooldowns, setSkillCooldowns] = useState({});
    const [battleEffects, setBattleEffects] = useState([]);
    const battleLogRef = useRef(null);
    // Auto-scroll battle log
    useEffect(() => {
        if (battleLogRef.current) {
            battleLogRef.current.scrollTop = battleLogRef.current.scrollHeight;
        }
    }, [battleLog]);
    const addToBattleLog = (message, type) => {
        const logEntry = {
            id: Date.now().toString(),
            message,
            type,
            timestamp: Date.now()
        };
        setBattleLog(prev => [...prev, logEntry]);
    };
    const startBattle = (fighter) => {
        setSelectedFighter(fighter);
        // Select random opponent
        const availableOpponents = fighters.filter(f => f.id !== fighter.id);
        const randomOpponent = availableOpponents[Math.floor(Math.random() * availableOpponents.length)];
        setOpponent(randomOpponent);
        setGameState("battle");
        setBattleLog([]);
        setCurrentTurn("player");
        setSkillCooldowns({});
        addToBattleLog(`${fighter.name} vs ${randomOpponent.name} - Battle begins!`, "effect");
    };
    const calculateDamage = (attacker, skill, defender) => {
        const baseDamage = skill.damage + attacker.attack;
        const defense = defender.defense;
        const randomFactor = 0.8 + Math.random() * 0.4; // 80-120% damage variance
        const finalDamage = Math.max(1, Math.floor((baseDamage - defense * 0.5) * randomFactor));
        return finalDamage;
    };
    const isCriticalHit = () => {
        return Math.random() < 0.15; // 15% critical chance
    };
    const executeSkill = (skill, isPlayerTurn) => {
        if (!selectedFighter || !opponent)
            return;
        const attacker = isPlayerTurn ? selectedFighter : opponent;
        const defender = isPlayerTurn ? opponent : selectedFighter;
        let damage = calculateDamage(attacker, skill, defender);
        const critical = isCriticalHit();
        if (critical) {
            damage = Math.floor(damage * 1.5);
        }
        // Apply damage
        const newHealth = Math.max(0, defender.health - damage);
        if (isPlayerTurn) {
            setOpponent(prev => prev ? { ...prev, health: newHealth } : null);
        }
        else {
            setSelectedFighter(prev => prev ? { ...prev, health: newHealth } : null);
        }
        // Add to battle log
        const criticalText = critical ? " (CRITICAL!)" : "";
        addToBattleLog(`${attacker.name} uses ${skill.name}! Deals ${damage} damage${criticalText}`, critical ? "effect" : "attack");
        // Add battle effect
        setBattleEffects(prev => [...prev, skill.animation]);
        setTimeout(() => {
            setBattleEffects(prev => prev.filter(effect => effect !== skill.animation));
        }, 1000);
        // Set cooldown
        setSkillCooldowns(prev => ({
            ...prev,
            [`${attacker.id}_${skill.name}`]: skill.cooldown
        }));
        // Check for victory
        if (newHealth <= 0) {
            const winner = isPlayerTurn ? selectedFighter : opponent;
            const loser = isPlayerTurn ? opponent : selectedFighter;
            addToBattleLog(`${winner.name} wins! ${loser.name} is defeated!`, "victory");
            setGameState("victory");
            // Update fighter stats
            setFighters(prev => prev.map(f => {
                if (f.id === winner.id) {
                    return {
                        ...f,
                        wins: f.wins + 1,
                        experience: f.experience + 100,
                        health: f.maxHealth // Reset health
                    };
                }
                if (f.id === loser.id) {
                    return {
                        ...f,
                        losses: f.losses + 1,
                        health: f.maxHealth // Reset health
                    };
                }
                return f;
            }));
        }
        else {
            // Switch turns
            setCurrentTurn(isPlayerTurn ? "opponent" : "player");
        }
    };
    // AI opponent turn
    useEffect(() => {
        if (gameState === "battle" && currentTurn === "opponent" && opponent && selectedFighter) {
            const timer = setTimeout(() => {
                // AI selects a random available skill
                const availableSkills = opponent.skills.filter(skill => {
                    const cooldownKey = `${opponent.id}_${skill.name}`;
                    return !skillCooldowns[cooldownKey] || skillCooldowns[cooldownKey] <= 0;
                });
                if (availableSkills.length > 0) {
                    const randomSkill = availableSkills[Math.floor(Math.random() * availableSkills.length)];
                    executeSkill(randomSkill, false);
                }
            }, 1500); // AI delay for dramatic effect
            return () => clearTimeout(timer);
        }
    }, [currentTurn, gameState, opponent, selectedFighter, skillCooldowns]);
    // Reduce cooldowns each turn
    useEffect(() => {
        setSkillCooldowns(prev => {
            const updated = { ...prev };
            Object.keys(updated).forEach(key => {
                if (updated[key] > 0) {
                    updated[key]--;
                }
            });
            return updated;
        });
    }, [currentTurn]);
    const resetBattle = () => {
        setGameState("selection");
        setSelectedFighter(null);
        setOpponent(null);
        setBattleLog([]);
        setCurrentTurn("player");
        setSkillCooldowns({});
        setBattleEffects([]);
        // Reset all fighter health
        setFighters(prev => prev.map(f => ({ ...f, health: f.maxHealth })));
    };
    const getWinRate = (fighter) => {
        const totalGames = fighter.wins + fighter.losses;
        return totalGames > 0 ? Math.round((fighter.wins / totalGames) * 100) : 0;
    };
    const getBattleEffectAnimation = (effect) => {
        const effects = {
            speed: { scale: [1, 1.5, 1], rotate: [0, 360, 0] },
            critical: { scale: [1, 1.3, 1], x: [-5, 5, -5, 5, 0] },
            overload: { scale: [1, 1.8, 1], opacity: [1, 0.5, 1] },
            shield: { scale: [1, 1.2, 1], rotate: [0, 180, 0] },
            counter: { x: [0, -20, 20, 0], scale: [1, 1.1, 1] },
            fortress: { scale: [1, 1.4, 1], opacity: [1, 0.8, 1] },
            quick: { y: [0, -20, 0], scale: [1, 1.2, 1] },
            blitz: { rotate: [0, 720, 0], scale: [1, 1.5, 1] },
            warp: { scale: [1, 2, 1], opacity: [1, 0.3, 1] }
        };
        return effects[effect] || {};
    };
    if (gameState === "selection") {
        return (_jsxs(Card, { className: "bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Swords, { className: "h-5 w-5 text-red-500" }), "Gaming Fight System - Choose Your Fighter"] }) }), _jsx(CardContent, { className: "space-y-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: fighters.map((fighter) => (_jsx(motion.div, { className: "relative overflow-hidden rounded-lg cursor-pointer", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => startBattle(fighter), children: _jsx(Card, { className: `bg-gradient-to-br ${fighter.color} h-full`, children: _jsxs(CardContent, { className: "p-4 text-white", children: [_jsxs("div", { className: "text-center mb-4", children: [_jsx("div", { className: "text-6xl mb-2", children: fighter.emoji }), _jsx("h3", { className: "font-bold text-lg", children: fighter.name }), _jsxs(Badge, { variant: "outline", className: "text-white border-white", children: ["Level ", fighter.level] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "grid grid-cols-3 gap-2 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm opacity-80", children: "ATK" }), _jsx("div", { className: "font-bold", children: fighter.attack })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm opacity-80", children: "DEF" }), _jsx("div", { className: "font-bold", children: fighter.defense })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm opacity-80", children: "SPE" }), _jsx("div", { className: "font-bold", children: fighter.special })] })] }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Health" }), _jsxs("span", { children: [fighter.health, "/", fighter.maxHealth] })] }), _jsx(Progress, { value: (fighter.health / fighter.maxHealth) * 100, className: "h-2" })] }), _jsxs("div", { className: "flex justify-between text-xs", children: [_jsxs("span", { children: ["Wins: ", fighter.wins] }), _jsxs("span", { children: ["Win Rate: ", getWinRate(fighter), "%"] }), _jsxs("span", { children: ["Losses: ", fighter.losses] })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "text-xs opacity-80", children: "Special Skills:" }), _jsx("div", { className: "flex gap-1", children: fighter.skills.map((skill, index) => (_jsx("div", { className: "flex items-center gap-1", children: _jsx(skill.icon, { className: "h-3 w-3" }) }, index))) })] })] })] }) }) }, fighter.id))) }) })] }));
    }
    if (gameState === "battle" && selectedFighter && opponent) {
        return (_jsxs("div", { className: "space-y-4", children: [_jsxs(Card, { className: "bg-gradient-to-br from-red-900/30 to-black/50 border-red-500/50", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Gamepad2, { className: "h-5 w-5 text-red-500" }), "Battle Arena"] }), _jsx(Badge, { variant: "outline", className: "text-yellow-400 border-yellow-400", children: currentTurn === "player" ? "Your Turn" : "Opponent's Turn" })] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 gap-8", children: [_jsxs(motion.div, { className: "text-center", animate: battleEffects.includes("player") ? getBattleEffectAnimation("player") : {}, children: [_jsxs("div", { className: `relative w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${selectedFighter.color} flex items-center justify-center`, children: [_jsx("span", { className: "text-4xl", children: selectedFighter.emoji }), battleEffects.length > 0 && (_jsx(motion.div, { className: "absolute inset-0 rounded-full bg-white", animate: {
                                                                opacity: [0, 0.5, 0],
                                                                scale: [0.8, 1.2, 0.8]
                                                            }, transition: { duration: 0.5 } }))] }), _jsx("h3", { className: "font-bold text-lg text-green-400", children: selectedFighter.name }), _jsxs("div", { className: "space-y-2", children: [_jsx(Progress, { value: (selectedFighter.health / selectedFighter.maxHealth) * 100, className: "h-3" }), _jsxs("div", { className: "text-sm", children: [selectedFighter.health, "/", selectedFighter.maxHealth, " HP"] })] })] }), _jsx("div", { className: "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10", children: _jsx(motion.div, { className: "bg-red-600 text-white px-4 py-2 rounded-full font-bold", animate: {
                                                    scale: [1, 1.1, 1],
                                                    rotate: [0, 5, -5, 0]
                                                }, transition: { duration: 2, repeat: Infinity }, children: "VS" }) }), _jsxs(motion.div, { className: "text-center", animate: battleEffects.includes("opponent") ? getBattleEffectAnimation("opponent") : {}, children: [_jsxs("div", { className: `relative w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${opponent.color} flex items-center justify-center`, children: [_jsx("span", { className: "text-4xl", children: opponent.emoji }), battleEffects.length > 0 && (_jsx(motion.div, { className: "absolute inset-0 rounded-full bg-white", animate: {
                                                                opacity: [0, 0.5, 0],
                                                                scale: [0.8, 1.2, 0.8]
                                                            }, transition: { duration: 0.5 } }))] }), _jsx("h3", { className: "font-bold text-lg text-red-400", children: opponent.name }), _jsxs("div", { className: "space-y-2", children: [_jsx(Progress, { value: (opponent.health / opponent.maxHealth) * 100, className: "h-3" }), _jsxs("div", { className: "text-sm", children: [opponent.health, "/", opponent.maxHealth, " HP"] })] })] })] }), currentTurn === "player" && (_jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-semibold text-center", children: "Choose Your Attack:" }), _jsx("div", { className: "grid grid-cols-3 gap-3", children: selectedFighter.skills.map((skill, index) => {
                                                const cooldownKey = `${selectedFighter.id}_${skill.name}`;
                                                const isOnCooldown = skillCooldowns[cooldownKey] > 0;
                                                return (_jsxs(Button, { variant: "outline", className: `relative p-4 h-auto flex flex-col gap-2 ${isOnCooldown ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-900/20'}`, disabled: isOnCooldown, onClick: () => !isOnCooldown && executeSkill(skill, true), children: [_jsx(skill.icon, { className: "h-6 w-6" }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "font-medium text-sm", children: skill.name }), _jsxs("div", { className: "text-xs opacity-80", children: [skill.damage, " DMG"] }), isOnCooldown && (_jsxs("div", { className: "text-xs text-red-400", children: ["Cooldown: ", skillCooldowns[cooldownKey]] }))] })] }, index));
                                            }) })] }))] })] }), _jsxs(Card, { className: "bg-gradient-to-br from-gray-900/50 to-black/50", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-sm", children: "Battle Log" }) }), _jsx(CardContent, { children: _jsx("div", { ref: battleLogRef, className: "h-32 overflow-y-auto space-y-1 text-sm", children: battleLog.map((log) => (_jsx(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, className: `${log.type === "victory" ? "text-yellow-400 font-bold" :
                                        log.type === "effect" ? "text-purple-400" :
                                            log.type === "attack" ? "text-red-400" : "text-gray-300"}`, children: log.message }, log.id))) }) })] }), _jsx("div", { className: "flex justify-center", children: _jsx(Button, { onClick: resetBattle, variant: "outline", children: "End Battle" }) })] }));
    }
    if (gameState === "victory" && selectedFighter && opponent) {
        const winner = selectedFighter.health > 0 ? selectedFighter : opponent;
        const isPlayerWin = winner.id === selectedFighter.id;
        return (_jsxs(Card, { className: `bg-gradient-to-br ${isPlayerWin ? 'from-green-900/30 to-yellow-900/30 border-green-500/50' : 'from-red-900/30 to-gray-900/30 border-red-500/50'}`, children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-center", children: _jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { type: "spring", duration: 0.8 }, children: isPlayerWin ? (_jsxs("div", { className: "text-green-400 space-y-2", children: [_jsx(Trophy, { className: "h-16 w-16 mx-auto" }), _jsx("div", { className: "text-2xl font-bold", children: "VICTORY!" })] })) : (_jsxs("div", { className: "text-red-400 space-y-2", children: [_jsx(AlertCircle, { className: "h-16 w-16 mx-auto" }), _jsx("div", { className: "text-2xl font-bold", children: "DEFEAT" })] })) }) }) }), _jsxs(CardContent, { className: "text-center space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "text-lg", children: [winner.name, " Wins!"] }), _jsx("div", { className: "text-sm text-muted-foreground", children: "+100 Experience Points" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "Your Fighter" }), _jsxs("div", { className: "text-sm", children: [_jsx("div", { children: selectedFighter.name }), _jsxs("div", { children: ["Wins: ", selectedFighter.wins, " | Losses: ", selectedFighter.losses] }), _jsxs("div", { children: ["Win Rate: ", getWinRate(selectedFighter), "%"] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "Opponent" }), _jsxs("div", { className: "text-sm", children: [_jsx("div", { children: opponent.name }), _jsxs("div", { children: ["Wins: ", opponent.wins, " | Losses: ", opponent.losses] }), _jsxs("div", { children: ["Win Rate: ", getWinRate(opponent), "%"] })] })] })] }), _jsxs("div", { className: "flex gap-4 justify-center", children: [_jsx(Button, { onClick: resetBattle, children: "Return to Fighter Selection" }), _jsx(Button, { onClick: () => startBattle(selectedFighter), variant: "outline", children: "Fight Again" })] })] })] }));
    }
    return null;
}
