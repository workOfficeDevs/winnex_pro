import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation } from "wouter";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dice1, Coins, Spade, Users, Zap, Play, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
export default function Casino() {
    const [location, setLocation] = useLocation();
    const [selectedGame, setSelectedGame] = useState(null);
    const [gameModalOpen, setGameModalOpen] = useState(false);
    const [slotSpinning, setSlotSpinning] = useState(false);
    const [slotReels, setSlotReels] = useState(['🍒', '🍋', '⭐']);
    const [credits, setCredits] = useState(1000);
    const [bet, setBet] = useState(10);
    const { toast } = useToast();
    // Slot machine symbols
    const slotSymbols = ['🍒', '🍋', '⭐', '💎', '🔔', '🍇', '🍊', '💰'];
    // Open game modal
    const openGame = (game) => {
        setSelectedGame(game);
        setGameModalOpen(true);
    };
    // Spin slot machine
    const spinSlot = () => {
        if (credits < bet) {
            toast({
                title: "Insufficient Credits",
                description: "You don't have enough credits to place this bet.",
                variant: "destructive",
            });
            return;
        }
        setSlotSpinning(true);
        setCredits(credits - bet);
        // Animate spinning
        let spins = 0;
        const maxSpins = 20;
        const spinInterval = setInterval(() => {
            setSlotReels([
                slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
                slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
                slotSymbols[Math.floor(Math.random() * slotSymbols.length)]
            ]);
            spins++;
            if (spins >= maxSpins) {
                clearInterval(spinInterval);
                setSlotSpinning(false);
                // Check for wins
                const finalReels = [
                    slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
                    slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
                    slotSymbols[Math.floor(Math.random() * slotSymbols.length)]
                ];
                setSlotReels(finalReels);
                // Calculate winnings
                let winnings = 0;
                if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
                    // Three of a kind
                    winnings = bet * 10;
                    if (finalReels[0] === '💎')
                        winnings = bet * 50;
                    else if (finalReels[0] === '💰')
                        winnings = bet * 25;
                    else if (finalReels[0] === '⭐')
                        winnings = bet * 15;
                }
                else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2] || finalReels[0] === finalReels[2]) {
                    // Two of a kind
                    winnings = bet * 2;
                }
                if (winnings > 0) {
                    setCredits(prev => prev + winnings);
                    toast({
                        title: "🎉 You Won!",
                        description: `You won ${winnings} credits!`,
                    });
                }
            }
        }, 100);
    };
    // Play blackjack
    const playBlackjack = () => {
        const playerCard = Math.floor(Math.random() * 10) + 1;
        const dealerCard = Math.floor(Math.random() * 10) + 1;
        if (playerCard > dealerCard) {
            const winnings = bet * 2;
            setCredits(prev => prev + winnings);
            toast({
                title: "Blackjack Win!",
                description: `You beat the dealer! Won ${winnings} credits.`,
            });
        }
        else if (playerCard < dealerCard) {
            setCredits(prev => prev - bet);
            toast({
                title: "Dealer Wins",
                description: `You lost ${bet} credits.`,
                variant: "destructive",
            });
        }
        else {
            toast({
                title: "Push",
                description: "It's a tie! No money lost.",
            });
        }
    };
    const liveGames = [
        {
            id: 1,
            name: "Live Blackjack",
            players: 47,
            category: "Table Games",
            icon: "♠",
            color: "bg-gradient-to-br from-red-600 to-black"
        },
        {
            id: 2,
            name: "European Roulette",
            players: 32,
            category: "Roulette",
            icon: "⚫",
            color: "bg-gradient-to-br from-green-600 to-red-600"
        },
        {
            id: 3,
            name: "Texas Hold'em",
            players: 8,
            category: "Poker",
            icon: "♦",
            color: "bg-gradient-to-br from-blue-600 to-purple-600"
        },
        {
            id: 4,
            name: "Baccarat VIP",
            players: 12,
            category: "Table Games",
            icon: "♥",
            color: "bg-gradient-to-br from-yellow-600 to-orange-600"
        },
    ];
    const slotGames = [
        {
            id: 1,
            name: "Mega Fortune",
            jackpot: "2.4M",
            rtp: "96.6%",
            icon: "💎",
            color: "bg-gradient-to-br from-purple-600 to-pink-600"
        },
        {
            id: 2,
            name: "Starburst",
            jackpot: "150K",
            rtp: "96.1%",
            icon: "⭐",
            color: "bg-gradient-to-br from-blue-600 to-cyan-600"
        },
        {
            id: 3,
            name: "Book of Dead",
            jackpot: "89K",
            rtp: "94.2%",
            icon: "📚",
            color: "bg-gradient-to-br from-amber-600 to-yellow-600"
        },
        {
            id: 4,
            name: "Gonzo's Quest",
            jackpot: "245K",
            rtp: "95.9%",
            icon: "🗿",
            color: "bg-gradient-to-br from-green-600 to-emerald-600"
        },
    ];
    return (_jsx(Layout, { children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h1", { className: "text-3xl font-bold mb-4", children: "Casino Games" }), _jsx("p", { className: "text-gray-400", children: "Play the best casino games with live dealers and massive jackpots" })] }), _jsx("div", { className: "bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 mb-8", children: _jsxs("div", { className: "grid md:grid-cols-4 gap-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold", children: "$2.4M" }), _jsx("div", { className: "text-purple-200 text-sm", children: "Biggest Jackpot" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold", children: "247" }), _jsx("div", { className: "text-purple-200 text-sm", children: "Players Online" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold", children: "$47K" }), _jsx("div", { className: "text-purple-200 text-sm", children: "Won This Hour" })] }), _jsx("div", { className: "text-center", children: _jsx(Button, { className: "bg-white text-purple-600 hover:bg-gray-100 font-semibold", children: "Claim Welcome Bonus" }) })] }) }), _jsxs("div", { className: "grid md:grid-cols-4 gap-4 mb-8", children: [_jsx(Card, { className: "bg-winnex-gray border-gray-600 hover:bg-gray-700 transition-colors cursor-pointer", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(Dice1, { className: "mx-auto mb-2 text-winnex-orange", size: 32 }), _jsx("div", { className: "font-semibold", children: "Live Casino" }), _jsx("div", { className: "text-xs text-gray-400", children: "Real dealers" })] }) }), _jsx(Card, { className: "bg-winnex-gray border-gray-600 hover:bg-gray-700 transition-colors cursor-pointer", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(Coins, { className: "mx-auto mb-2 text-winnex-orange", size: 32 }), _jsx("div", { className: "font-semibold", children: "Slots" }), _jsx("div", { className: "text-xs text-gray-400", children: "500+ games" })] }) }), _jsx(Card, { className: "bg-winnex-gray border-gray-600 hover:bg-gray-700 transition-colors cursor-pointer", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(Spade, { className: "mx-auto mb-2 text-winnex-orange", size: 32 }), _jsx("div", { className: "font-semibold", children: "Table Games" }), _jsx("div", { className: "text-xs text-gray-400", children: "Classic games" })] }) }), _jsx(Card, { className: "bg-winnex-gray border-gray-600 hover:bg-gray-700 transition-colors cursor-pointer", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(Zap, { className: "mx-auto mb-2 text-winnex-orange", size: 32 }), _jsx("div", { className: "font-semibold", children: "Instant Win" }), _jsx("div", { className: "text-xs text-gray-400", children: "Quick games" })] }) })] }), _jsxs("div", { className: "mb-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("h2", { className: "text-xl font-bold flex items-center", children: [_jsx("div", { className: "w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse" }), "Live Casino"] }), _jsx(Button, { variant: "outline", className: "border-gray-600", onClick: () => setLocation('/casino'), children: "View All" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-4", children: liveGames.map((game) => (_jsxs(Card, { className: "bg-winnex-gray border-gray-600 hover:bg-gray-700 transition-colors cursor-pointer overflow-hidden", children: [_jsxs("div", { className: "relative", children: [_jsxs("div", { className: `w-full h-32 ${game.color} flex items-center justify-center relative overflow-hidden`, children: [_jsx("div", { className: "text-6xl animate-pulse", children: game.icon }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-pulse" })] }), _jsx(Badge, { className: "absolute top-2 left-2 bg-red-500 animate-pulse", children: "LIVE" }), _jsxs("div", { className: "absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs flex items-center", children: [_jsx(Users, { size: 12, className: "mr-1" }), game.players] })] }), _jsxs(CardContent, { className: "p-3", children: [_jsx("div", { className: "font-semibold text-sm", children: game.name }), _jsx("div", { className: "text-xs text-gray-400", children: game.category }), _jsx(Button, { size: "sm", className: "w-full mt-2 bg-winnex-green text-black hover:bg-green-400", onClick: () => openGame(game), children: "Play Now" })] })] }, game.id))) })] }), _jsxs("div", { className: "mb-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-xl font-bold", children: "Popular Slots" }), _jsx(Button, { variant: "outline", className: "border-gray-600", onClick: () => setLocation('/casino'), children: "View All" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-4", children: slotGames.map((game) => (_jsxs(Card, { className: "bg-winnex-gray border-gray-600 hover:bg-gray-700 transition-colors cursor-pointer overflow-hidden", children: [_jsxs("div", { className: "relative", children: [_jsxs("div", { className: `w-full h-32 ${game.color} flex items-center justify-center relative overflow-hidden`, children: [_jsx("div", { className: "text-6xl animate-bounce", children: game.icon }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 animate-pulse" }), _jsx("div", { className: "absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-50" }), _jsx("div", { className: "absolute bottom-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse opacity-70" })] }), _jsxs("div", { className: "absolute top-2 right-2 bg-winnex-green text-black px-2 py-1 rounded text-xs font-bold", children: ["$", game.jackpot] })] }), _jsxs(CardContent, { className: "p-3", children: [_jsx("div", { className: "font-semibold text-sm", children: game.name }), _jsxs("div", { className: "text-xs text-gray-400 mb-2", children: ["RTP: ", game.rtp] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", className: "flex-1 bg-winnex-green text-black hover:bg-green-400", onClick: () => openGame(game), children: "Play" }), _jsx(Button, { size: "sm", variant: "outline", className: "border-gray-600", onClick: () => openGame({ ...game, demo: true }), children: "Demo" })] })] })] }, game.id))) })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsx(Card, { className: "bg-gradient-to-r from-yellow-500 to-orange-600 border-0", children: _jsxs(CardContent, { className: "p-6 text-black", children: [_jsx("h3", { className: "text-xl font-bold mb-2", children: "\uD83C\uDFB0 Slot Tournament" }), _jsx("p", { className: "mb-4", children: "Win your share of $10,000 prize pool!" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { children: _jsx("div", { className: "text-sm", children: "Ends in: 2d 14h 32m" }) }), _jsx(Button, { className: "bg-black text-white hover:bg-gray-800", children: "Join Now" })] })] }) }), _jsx(Card, { className: "bg-gradient-to-r from-green-500 to-blue-600 border-0", children: _jsxs(CardContent, { className: "p-6 text-white", children: [_jsx("h3", { className: "text-xl font-bold mb-2", children: "\uD83C\uDFB2 Live Casino Cashback" }), _jsx("p", { className: "mb-4", children: "Get 10% cashback on live casino losses!" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { children: _jsx("div", { className: "text-sm", children: "Valid today only" }) }), _jsx(Button, { className: "bg-white text-green-600 hover:bg-gray-100", children: "Claim" })] })] }) })] }), _jsx(Dialog, { open: gameModalOpen, onOpenChange: setGameModalOpen, children: _jsxs(DialogContent, { className: "max-w-4xl bg-winnex-dark border-gray-700", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "text-white flex items-center gap-2", children: [_jsx("span", { className: "text-2xl", children: selectedGame?.icon }), selectedGame?.name, selectedGame?.demo && _jsx(Badge, { className: "bg-blue-600", children: "Demo Mode" })] }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between bg-gray-800 rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-winnex-green", children: credits.toLocaleString() }), _jsx("div", { className: "text-xs text-gray-400", children: "Credits" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-xl font-bold text-white", children: ["$", bet] }), _jsx("div", { className: "text-xs text-gray-400", children: "Current Bet" })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { size: "sm", variant: "outline", onClick: () => setBet(Math.max(1, bet - 5)), disabled: bet <= 1, children: "-$5" }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => setBet(bet + 5), disabled: bet + 5 > credits, children: "+$5" })] })] }), selectedGame?.category === "Table Games" && selectedGame?.name === "Live Blackjack" && (_jsxs("div", { className: "text-center space-y-6", children: [_jsxs("div", { className: "bg-green-800 rounded-lg p-8", children: [_jsx("h3", { className: "text-xl font-bold text-white mb-4", children: "\u2660\uFE0F Blackjack Table \u2660\uFE0F" }), _jsxs("div", { className: "grid grid-cols-2 gap-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg text-white mb-2", children: "Your Hand" }), _jsx("div", { className: "text-6xl", children: "\uD83C\uDCB1 \uD83C\uDCAE" }), _jsx("div", { className: "text-xl font-bold text-winnex-green mt-2", children: "19" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg text-white mb-2", children: "Dealer" }), _jsx("div", { className: "text-6xl", children: "\uD83C\uDCB7 \uD83C\uDCA0" }), _jsx("div", { className: "text-xl font-bold text-red-400 mt-2", children: "?" })] })] })] }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx(Button, { className: "bg-red-600 hover:bg-red-700 text-white px-8", onClick: playBlackjack, disabled: credits < bet, children: "Hit" }), _jsx(Button, { className: "bg-blue-600 hover:bg-blue-700 text-white px-8", onClick: playBlackjack, disabled: credits < bet, children: "Stand" })] })] })), (selectedGame?.name === "Mega Fortune" || selectedGame?.name === "Starburst" ||
                                        selectedGame?.name === "Book of Dead" || selectedGame?.name === "Gonzo's Quest") && (_jsxs("div", { className: "text-center space-y-6", children: [_jsxs("div", { className: "bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-lg p-8", children: [_jsxs("h3", { className: "text-xl font-bold text-black mb-4", children: ["\uD83C\uDFB0 ", selectedGame.name, " \uD83C\uDFB0"] }), _jsx("div", { className: "flex justify-center gap-4 mb-6", children: slotReels.map((symbol, index) => (_jsx("div", { className: `w-20 h-20 bg-white rounded-lg flex items-center justify-center text-4xl border-4 border-yellow-400 ${slotSpinning ? 'animate-spin' : ''}`, children: symbol }, index))) }), _jsx("div", { className: "flex justify-center mb-4", children: _jsx("div", { className: "bg-red-600 h-1 w-72 rounded" }) }), _jsxs("div", { className: "text-black font-bold mb-4", children: [selectedGame.name === "Mega Fortune" && "💎 Triple diamonds for MEGA WIN! 💎", selectedGame.name === "Starburst" && "⭐ Expanding wilds and re-spins! ⭐", selectedGame.name === "Book of Dead" && "📚 Free spins with expanding symbols! 📚", selectedGame.name === "Gonzo's Quest" && "🗿 Avalanche feature multipliers! 🗿"] })] }), _jsx(Button, { size: "lg", className: "bg-gradient-to-r from-green-500 to-green-700 text-white px-12 py-4 text-xl font-bold", onClick: spinSlot, disabled: slotSpinning || credits < bet, children: slotSpinning ? (_jsxs(_Fragment, { children: [_jsx(RotateCcw, { className: "w-6 h-6 mr-2 animate-spin" }), "SPINNING..."] })) : (_jsxs(_Fragment, { children: [_jsx(Play, { className: "w-6 h-6 mr-2" }), "SPIN ($", bet, ")"] })) })] })), selectedGame?.name === "European Roulette" && (_jsxs("div", { className: "text-center space-y-6", children: [_jsxs("div", { className: "bg-green-800 rounded-lg p-8", children: [_jsx("h3", { className: "text-xl font-bold text-white mb-4", children: "\uD83C\uDFAF European Roulette \uD83C\uDFAF" }), _jsx("div", { className: "text-8xl mb-4", children: "\u26AB" }), _jsx("div", { className: "text-2xl font-bold text-winnex-green", children: "Number 17" }), _jsx("div", { className: "text-lg text-white mt-2", children: "Black \u2022 Odd \u2022 2nd Dozen" })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsx(Button, { className: "bg-red-600 hover:bg-red-700", onClick: playBlackjack, children: "Bet Red" }), _jsx(Button, { className: "bg-gray-800 hover:bg-gray-700", onClick: playBlackjack, children: "Bet Black" }), _jsx(Button, { className: "bg-green-600 hover:bg-green-700", onClick: playBlackjack, children: "Bet Zero" })] })] })), selectedGame?.name === "Texas Hold'em" && (_jsxs("div", { className: "text-center space-y-6", children: [_jsxs("div", { className: "bg-blue-800 rounded-lg p-8", children: [_jsx("h3", { className: "text-xl font-bold text-white mb-4", children: "\u2666\uFE0F Texas Hold'em \u2666\uFE0F" }), _jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "text-lg text-white mb-2", children: "Your Cards" }), _jsx("div", { className: "text-6xl mb-4", children: "\uD83C\uDCBA \uD83C\uDCBB" }), _jsx("div", { className: "text-lg text-white mb-2", children: "Community Cards" }), _jsx("div", { className: "text-4xl", children: "\uD83C\uDCBD \uD83C\uDCBE \uD83C\uDCBF \uD83C\uDCC1 \uD83C\uDCC2" })] }), _jsx("div", { className: "text-xl font-bold text-winnex-green", children: "Royal Flush!" })] }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx(Button, { className: "bg-red-600 hover:bg-red-700", onClick: playBlackjack, children: "Fold" }), _jsx(Button, { className: "bg-yellow-600 hover:bg-yellow-700", onClick: playBlackjack, children: "Call" }), _jsx(Button, { className: "bg-green-600 hover:bg-green-700", onClick: playBlackjack, children: "Raise" })] })] })), selectedGame?.name === "Baccarat VIP" && (_jsxs("div", { className: "text-center space-y-6", children: [_jsxs("div", { className: "bg-purple-800 rounded-lg p-8", children: [_jsx("h3", { className: "text-xl font-bold text-white mb-4", children: "\u2665\uFE0F Baccarat VIP \u2665\uFE0F" }), _jsxs("div", { className: "grid grid-cols-2 gap-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg text-white mb-2", children: "Player" }), _jsx("div", { className: "text-6xl", children: "\uD83C\uDCA8 \uD83C\uDCA9" }), _jsx("div", { className: "text-xl font-bold text-blue-400 mt-2", children: "5" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg text-white mb-2", children: "Banker" }), _jsx("div", { className: "text-6xl", children: "\uD83C\uDCAA \uD83C\uDCAB" }), _jsx("div", { className: "text-xl font-bold text-red-400 mt-2", children: "7" })] })] })] }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx(Button, { className: "bg-blue-600 hover:bg-blue-700", onClick: playBlackjack, children: "Bet Player" }), _jsx(Button, { className: "bg-red-600 hover:bg-red-700", onClick: playBlackjack, children: "Bet Banker" }), _jsx(Button, { className: "bg-green-600 hover:bg-green-700", onClick: playBlackjack, children: "Bet Tie" })] })] })), _jsx("div", { className: "bg-gray-800 rounded-lg p-4", children: _jsxs("div", { className: "grid grid-cols-4 gap-4 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-lg font-bold text-white", children: selectedGame?.rtp || '96.5%' }), _jsx("div", { className: "text-xs text-gray-400", children: "RTP" })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-lg font-bold text-winnex-green", children: ["$", selectedGame?.jackpot || '1.2M'] }), _jsx("div", { className: "text-xs text-gray-400", children: "Jackpot" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-lg font-bold text-blue-400", children: "47" }), _jsx("div", { className: "text-xs text-gray-400", children: "Players" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-lg font-bold text-yellow-500", children: "4.8/5" }), _jsx("div", { className: "text-xs text-gray-400", children: "Rating" })] })] }) })] })] }) })] }) }));
}
