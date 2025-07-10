import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, Hand, Vibrate } from "lucide-react";
export default function MobileGestureControls() {
    const [gestureState, setGestureState] = useState({
        isSwipeEnabled: true,
        isPinchEnabled: true,
        isShakeEnabled: true,
        isTiltEnabled: true,
        lastGesture: 'None',
        gestureCount: 0
    });
    const [touchStart, setTouchStart] = useState(null);
    const [isQuickBet, setIsQuickBet] = useState(false);
    const [quickBetAmount, setQuickBetAmount] = useState(25);
    const { toast } = useToast();
    const containerRef = useRef(null);
    // Handle touch gestures
    const handleTouchStart = (e) => {
        if (!gestureState.isSwipeEnabled)
            return;
        const touch = e.touches[0];
        setTouchStart({
            x: touch.clientX,
            y: touch.clientY,
            time: Date.now()
        });
    };
    const handleTouchEnd = (e) => {
        if (!touchStart || !gestureState.isSwipeEnabled)
            return;
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStart.x;
        const deltaY = touch.clientY - touchStart.y;
        const deltaTime = Date.now() - touchStart.time;
        // Minimum swipe distance and maximum time for gesture recognition
        const minSwipeDistance = 50;
        const maxSwipeTime = 300;
        if (deltaTime > maxSwipeTime)
            return;
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);
        if (absX > minSwipeDistance || absY > minSwipeDistance) {
            let gesture = '';
            if (absX > absY) {
                // Horizontal swipe
                gesture = deltaX > 0 ? 'Swipe Right' : 'Swipe Left';
                if (deltaX > 0) {
                    // Swipe right - Quick bet
                    handleQuickBet();
                }
                else {
                    // Swipe left - Quick cash out
                    handleQuickCashOut();
                }
            }
            else {
                // Vertical swipe
                gesture = deltaY > 0 ? 'Swipe Down' : 'Swipe Up';
                if (deltaY < 0) {
                    // Swipe up - Increase bet
                    setQuickBetAmount(prev => Math.min(prev + 10, 100));
                }
                else {
                    // Swipe down - Decrease bet
                    setQuickBetAmount(prev => Math.max(prev - 10, 5));
                }
            }
            updateGestureState(gesture);
        }
        setTouchStart(null);
    };
    // Handle pinch gestures for zoom/bet adjustment
    const handleTouchMove = (e) => {
        if (!gestureState.isPinchEnabled || e.touches.length !== 2)
            return;
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.sqrt(Math.pow(touch2.clientX - touch1.clientX, 2) +
            Math.pow(touch2.clientY - touch1.clientY, 2));
        // Store initial distance for pinch detection
        if (!containerRef.current?.dataset.initialDistance) {
            containerRef.current.dataset.initialDistance = distance.toString();
            return;
        }
        const initialDistance = parseFloat(containerRef.current.dataset.initialDistance);
        const scaleFactor = distance / initialDistance;
        if (scaleFactor > 1.1) {
            // Pinch out - increase bet
            setQuickBetAmount(prev => Math.min(prev + 5, 100));
            updateGestureState('Pinch Out');
            containerRef.current.dataset.initialDistance = distance.toString();
        }
        else if (scaleFactor < 0.9) {
            // Pinch in - decrease bet
            setQuickBetAmount(prev => Math.max(prev - 5, 5));
            updateGestureState('Pinch In');
            containerRef.current.dataset.initialDistance = distance.toString();
        }
    };
    // Handle device motion (shake detection)
    const handleDeviceMotion = (e) => {
        if (!gestureState.isShakeEnabled)
            return;
        const acceleration = e.accelerationIncludingGravity;
        if (!acceleration)
            return;
        const threshold = 15;
        const x = Math.abs(acceleration.x || 0);
        const y = Math.abs(acceleration.y || 0);
        const z = Math.abs(acceleration.z || 0);
        if (x > threshold || y > threshold || z > threshold) {
            handleShakeGesture();
        }
    };
    // Handle device orientation (tilt controls)
    const handleDeviceOrientation = (e) => {
        if (!gestureState.isTiltEnabled)
            return;
        const tiltThreshold = 30;
        const gamma = e.gamma || 0; // Left/right tilt
        const beta = e.beta || 0; // Front/back tilt
        if (Math.abs(gamma) > tiltThreshold) {
            const direction = gamma > 0 ? 'Tilt Right' : 'Tilt Left';
            updateGestureState(direction);
            if (gamma > 0) {
                // Tilt right - next match
                toast({
                    title: "🎯 Next Match",
                    description: "Navigating to next available match",
                });
            }
            else {
                // Tilt left - previous match
                toast({
                    title: "🔙 Previous Match",
                    description: "Navigating to previous match",
                });
            }
        }
    };
    const updateGestureState = (gesture) => {
        setGestureState(prev => ({
            ...prev,
            lastGesture: gesture,
            gestureCount: prev.gestureCount + 1
        }));
        // Haptic feedback if available
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    };
    const handleQuickBet = () => {
        setIsQuickBet(true);
        toast({
            title: "⚡ Quick Bet Placed!",
            description: `$${quickBetAmount} bet placed with swipe gesture`,
        });
        setTimeout(() => setIsQuickBet(false), 2000);
    };
    const handleQuickCashOut = () => {
        toast({
            title: "💰 Cash Out!",
            description: "Position cashed out via swipe gesture",
        });
    };
    const handleShakeGesture = () => {
        updateGestureState('Shake');
        toast({
            title: "🎲 Lucky Shake!",
            description: "Shake detected - refreshing odds!",
        });
    };
    // Set up event listeners
    useEffect(() => {
        const container = containerRef.current;
        if (!container)
            return;
        // Touch events
        container.addEventListener('touchstart', handleTouchStart, { passive: false });
        container.addEventListener('touchend', handleTouchEnd, { passive: false });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        // Motion events
        if (gestureState.isShakeEnabled) {
            window.addEventListener('devicemotion', handleDeviceMotion);
        }
        // Orientation events
        if (gestureState.isTiltEnabled) {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
        }
        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchend', handleTouchEnd);
            container.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('devicemotion', handleDeviceMotion);
            window.removeEventListener('deviceorientation', handleDeviceOrientation);
        };
    }, [gestureState, touchStart]);
    // Request motion permissions on iOS
    const requestMotionPermission = async () => {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            const permission = await DeviceMotionEvent.requestPermission();
            if (permission === 'granted') {
                setGestureState(prev => ({ ...prev, isShakeEnabled: true }));
                toast({
                    title: "✅ Motion Enabled",
                    description: "Shake gestures are now active",
                });
            }
        }
    };
    const gestureControls = [
        {
            name: "Swipe Right",
            action: "Quick Bet",
            icon: "👉",
            enabled: gestureState.isSwipeEnabled,
            toggle: () => setGestureState(prev => ({ ...prev, isSwipeEnabled: !prev.isSwipeEnabled }))
        },
        {
            name: "Swipe Left",
            action: "Cash Out",
            icon: "👈",
            enabled: gestureState.isSwipeEnabled,
            toggle: () => setGestureState(prev => ({ ...prev, isSwipeEnabled: !prev.isSwipeEnabled }))
        },
        {
            name: "Swipe Up/Down",
            action: "Adjust Bet",
            icon: "👆",
            enabled: gestureState.isSwipeEnabled,
            toggle: () => setGestureState(prev => ({ ...prev, isSwipeEnabled: !prev.isSwipeEnabled }))
        },
        {
            name: "Pinch",
            action: "Zoom/Bet Size",
            icon: "🤏",
            enabled: gestureState.isPinchEnabled,
            toggle: () => setGestureState(prev => ({ ...prev, isPinchEnabled: !prev.isPinchEnabled }))
        },
        {
            name: "Shake",
            action: "Refresh Odds",
            icon: "📳",
            enabled: gestureState.isShakeEnabled,
            toggle: () => setGestureState(prev => ({ ...prev, isShakeEnabled: !prev.isShakeEnabled }))
        },
        {
            name: "Tilt",
            action: "Navigate",
            icon: "📱",
            enabled: gestureState.isTiltEnabled,
            toggle: () => setGestureState(prev => ({ ...prev, isTiltEnabled: !prev.isTiltEnabled }))
        }
    ];
    return (_jsx("div", { ref: containerRef, className: "space-y-4", children: _jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("h3", { className: "text-xl font-bold text-white flex items-center gap-2", children: [_jsx(Smartphone, { className: "w-5 h-5 text-blue-500" }), "Mobile Gesture Controls"] }), _jsx(Badge, { className: `${gestureState.lastGesture !== 'None' ? 'bg-green-600' : 'bg-gray-600'} animate-pulse`, children: gestureState.lastGesture })] }), _jsx("div", { className: `mb-6 p-4 rounded-lg transition-all duration-300 ${isQuickBet ? 'bg-green-600 scale-105' : 'bg-gray-800'}`, children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "text-white font-bold", children: "Quick Bet Amount" }), _jsxs("div", { className: "text-2xl font-bold text-winnex-green", children: ["$", quickBetAmount] })] }), _jsx("div", { className: "text-4xl", children: isQuickBet ? '⚡' : '🎯' })] }) }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4 mb-6", children: gestureControls.map((control, index) => (_jsx("div", { className: `p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${control.enabled
                                ? 'border-winnex-green bg-green-900/20 hover:bg-green-900/40'
                                : 'border-gray-600 bg-gray-800/50'}`, onClick: control.toggle, children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl mb-2", children: control.icon }), _jsx("div", { className: `font-semibold ${control.enabled ? 'text-white' : 'text-gray-400'}`, children: control.name }), _jsx("div", { className: "text-xs text-gray-400 mt-1", children: control.action }), _jsx(Badge, { className: `mt-2 ${control.enabled ? 'bg-green-600' : 'bg-gray-600'}`, children: control.enabled ? 'ON' : 'OFF' })] }) }, index))) }), _jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [_jsxs("div", { className: "bg-gray-800 rounded-lg p-3", children: [_jsx("div", { className: "text-2xl font-bold text-blue-400", children: gestureState.gestureCount }), _jsx("div", { className: "text-xs text-gray-400", children: "Total Gestures" })] }), _jsxs("div", { className: "bg-gray-800 rounded-lg p-3", children: [_jsx("div", { className: "text-2xl font-bold text-green-400", children: gestureControls.filter(c => c.enabled).length }), _jsx("div", { className: "text-xs text-gray-400", children: "Active Controls" })] }), _jsxs("div", { className: "bg-gray-800 rounded-lg p-3", children: [_jsx("div", { className: "text-2xl font-bold text-yellow-400", children: "98%" }), _jsx("div", { className: "text-xs text-gray-400", children: "Accuracy" })] })] }), _jsx("div", { className: "mt-4 text-center", children: _jsxs(Button, { onClick: requestMotionPermission, className: "bg-blue-600 hover:bg-blue-700", children: [_jsx(Vibrate, { className: "w-4 h-4 mr-2" }), "Enable Motion Controls"] }) }), _jsxs("div", { className: "mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-600", children: [_jsxs("h4", { className: "text-white font-semibold mb-2 flex items-center gap-2", children: [_jsx(Hand, { className: "w-4 h-4" }), "Gesture Guide"] }), _jsxs("div", { className: "text-sm text-gray-300 space-y-1", children: [_jsxs("div", { children: ["\u2022 ", _jsx("strong", { children: "Swipe right:" }), " Place quick bet"] }), _jsxs("div", { children: ["\u2022 ", _jsx("strong", { children: "Swipe left:" }), " Cash out position"] }), _jsxs("div", { children: ["\u2022 ", _jsx("strong", { children: "Swipe up/down:" }), " Adjust bet amount"] }), _jsxs("div", { children: ["\u2022 ", _jsx("strong", { children: "Pinch out/in:" }), " Increase/decrease bet size"] }), _jsxs("div", { children: ["\u2022 ", _jsx("strong", { children: "Shake device:" }), " Refresh odds and data"] }), _jsxs("div", { children: ["\u2022 ", _jsx("strong", { children: "Tilt device:" }), " Navigate between matches"] })] })] })] }) }) }));
}
