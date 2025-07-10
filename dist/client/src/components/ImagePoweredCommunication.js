import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Camera, Send, Sparkles, Upload, Eye, Brain, Target, ThumbsUp, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
export default function ImagePoweredCommunication() {
    const { toast } = useToast();
    const [messages, setMessages] = useState([
        {
            id: "1",
            type: "text",
            content: "Welcome to Image-Powered Communication! Upload screenshots, charts, or any visual content for AI analysis.",
            timestamp: new Date().toISOString(),
            sender: "system"
        }
    ]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef(null);
    const analyzeImage = async (imageUrl) => {
        // Simulate AI image analysis
        await new Promise(resolve => setTimeout(resolve, 2000));
        const mockAnalysis = {
            description: "Performance dashboard showing excellent system metrics with green indicators across all components",
            objects: ["Charts", "Graphs", "Performance indicators", "Status badges", "Navigation elements"],
            emotions: ["Confidence", "Success", "Professional"],
            suggestions: [
                "System is performing optimally",
                "Consider scaling resources for peak hours",
                "Monitor user engagement metrics",
                "Implement additional caching layers"
            ],
            performance: "excellent",
            confidence: 94
        };
        return mockAnalysis;
    };
    const handleFileUpload = useCallback(async (file) => {
        if (!file.type.startsWith('image/')) {
            toast({
                title: "Invalid File",
                description: "Please upload an image file",
                variant: "destructive"
            });
            return;
        }
        const imageUrl = URL.createObjectURL(file);
        const messageId = Date.now().toString();
        // Add image message
        const imageMessage = {
            id: messageId,
            type: "image",
            content: "Image uploaded for analysis",
            imageUrl,
            timestamp: new Date().toISOString(),
            sender: "user"
        };
        setMessages(prev => [...prev, imageMessage]);
        setIsAnalyzing(true);
        try {
            const analysis = await analyzeImage(imageUrl);
            // Add analysis message
            const analysisMessage = {
                id: messageId + "_analysis",
                type: "analysis",
                content: "AI Analysis Complete",
                analysis,
                timestamp: new Date().toISOString(),
                sender: "system"
            };
            setMessages(prev => [...prev, analysisMessage]);
            toast({
                title: "Analysis Complete",
                description: "Image has been analyzed successfully"
            });
        }
        catch (error) {
            toast({
                title: "Analysis Failed",
                description: "Failed to analyze the image",
                variant: "destructive"
            });
        }
        finally {
            setIsAnalyzing(false);
        }
    }, [toast]);
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    }, [handleFileUpload]);
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setDragOver(true);
    }, []);
    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setDragOver(false);
    }, []);
    const sendTextMessage = () => {
        if (!currentMessage.trim())
            return;
        const message = {
            id: Date.now().toString(),
            type: "text",
            content: currentMessage,
            timestamp: new Date().toISOString(),
            sender: "user"
        };
        setMessages(prev => [...prev, message]);
        setCurrentMessage("");
        // Simulate AI response
        setTimeout(() => {
            const response = {
                id: (Date.now() + 1).toString(),
                type: "text",
                content: "I understand your message. Feel free to upload any images for detailed analysis!",
                timestamp: new Date().toISOString(),
                sender: "system"
            };
            setMessages(prev => [...prev, response]);
        }, 1000);
    };
    const getPerformanceColor = (performance) => {
        switch (performance) {
            case "excellent": return "text-green-400";
            case "good": return "text-blue-400";
            case "fair": return "text-yellow-400";
            case "poor": return "text-red-400";
            default: return "text-gray-400";
        }
    };
    const getPerformanceIcon = (performance) => {
        switch (performance) {
            case "excellent": return CheckCircle;
            case "good": return ThumbsUp;
            case "fair": return AlertCircle;
            case "poor": return AlertCircle;
            default: return Eye;
        }
    };
    return (_jsx("div", { className: "space-y-4", children: _jsxs(Card, { className: "bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Brain, { className: "h-5 w-5 text-purple-500" }), "Image-Powered Communication System"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "h-96 overflow-y-auto space-y-3 p-4 bg-black/20 rounded-lg", children: [_jsx(AnimatePresence, { children: messages.map((message) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: `flex ${message.sender === "user" ? "justify-end" : "justify-start"}`, children: _jsxs("div", { className: `max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === "user"
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-700 text-white"}`, children: [message.type === "image" && message.imageUrl && (_jsx("div", { className: "mb-2", children: _jsx("img", { src: message.imageUrl, alt: "Uploaded", className: "max-w-full h-auto rounded-lg" }) })), message.type === "analysis" && message.analysis && (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Eye, { className: "h-4 w-4" }), _jsx("span", { className: "font-semibold", children: "AI Analysis" }), _jsxs(Badge, { variant: "outline", className: "text-xs", children: [message.analysis.confidence, "% confidence"] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium mb-1", children: "Description:" }), _jsx("p", { className: "text-sm opacity-90", children: message.analysis.description })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium mb-1", children: "Objects Detected:" }), _jsx("div", { className: "flex flex-wrap gap-1", children: message.analysis.objects.map((obj, index) => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: obj }, index))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium mb-1", children: "Performance Assessment:" }), _jsxs("div", { className: "flex items-center gap-2", children: [(() => {
                                                                                    const Icon = getPerformanceIcon(message.analysis.performance);
                                                                                    return _jsx(Icon, { className: `h-4 w-4 ${getPerformanceColor(message.analysis.performance)}` });
                                                                                })(), _jsx("span", { className: `capitalize ${getPerformanceColor(message.analysis.performance)}`, children: message.analysis.performance })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium mb-1", children: "Suggestions:" }), _jsx("ul", { className: "text-sm space-y-1", children: message.analysis.suggestions.map((suggestion, index) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx(Target, { className: "h-3 w-3 mt-0.5 text-green-400" }), _jsx("span", { className: "opacity-90", children: suggestion })] }, index))) })] })] })] })), message.type === "text" && (_jsx("p", { className: "text-sm", children: message.content })), _jsx("div", { className: "text-xs opacity-60 mt-1", children: new Date(message.timestamp).toLocaleTimeString() })] }) }, message.id))) }), isAnalyzing && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "flex justify-start", children: _jsx("div", { className: "bg-gray-700 text-white px-4 py-2 rounded-lg", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(motion.div, { animate: { rotate: 360 }, transition: { duration: 2, repeat: Infinity, ease: "linear" }, children: _jsx(Brain, { className: "h-4 w-4 text-purple-400" }) }), _jsx("span", { className: "text-sm", children: "Analyzing image..." })] }) }) }))] }), _jsx("div", { className: `border-2 border-dashed rounded-lg p-6 text-center transition-all ${dragOver
                                ? "border-purple-400 bg-purple-900/20"
                                : "border-gray-600 hover:border-gray-500"}`, onDrop: handleDrop, onDragOver: handleDragOver, onDragLeave: handleDragLeave, children: _jsxs(motion.div, { animate: {
                                    scale: dragOver ? 1.05 : 1,
                                    opacity: dragOver ? 0.8 : 1
                                }, transition: { duration: 0.2 }, children: [_jsx(Upload, { className: "h-8 w-8 mx-auto mb-2 text-gray-400" }), _jsx("p", { className: "text-sm text-gray-400 mb-2", children: "Drag and drop images here or click to upload" }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => fileInputRef.current?.click(), className: "mb-2", children: [_jsx(Camera, { className: "h-4 w-4 mr-2" }), "Choose Image"] }), _jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => {
                                            const file = e.target.files?.[0];
                                            if (file)
                                                handleFileUpload(file);
                                        } })] }) }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { value: currentMessage, onChange: (e) => setCurrentMessage(e.target.value), placeholder: "Type a message or upload an image...", onKeyPress: (e) => e.key === "Enter" && sendTextMessage(), className: "flex-1" }), _jsx(Button, { onClick: sendTextMessage, size: "sm", children: _jsx(Send, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-2", children: [_jsxs(Badge, { variant: "outline", className: "flex items-center gap-1 justify-center p-2", children: [_jsx(Eye, { className: "h-3 w-3" }), _jsx("span", { className: "text-xs", children: "Visual Analysis" })] }), _jsxs(Badge, { variant: "outline", className: "flex items-center gap-1 justify-center p-2", children: [_jsx(Brain, { className: "h-3 w-3" }), _jsx("span", { className: "text-xs", children: "AI Insights" })] }), _jsxs(Badge, { variant: "outline", className: "flex items-center gap-1 justify-center p-2", children: [_jsx(Target, { className: "h-3 w-3" }), _jsx("span", { className: "text-xs", children: "Performance Tips" })] }), _jsxs(Badge, { variant: "outline", className: "flex items-center gap-1 justify-center p-2", children: [_jsx(Sparkles, { className: "h-3 w-3" }), _jsx("span", { className: "text-xs", children: "Smart Suggestions" })] })] })] })] }) }));
}
