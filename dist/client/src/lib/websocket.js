import { io } from "socket.io-client";
class WebSocketManager {
    constructor() {
        this.socket = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
    }
    connect() {
        if (this.socket?.connected)
            return this.socket;
        this.socket = io({
            transports: ['websocket', 'polling'],
            upgrade: true,
        });
        this.socket.on('connect', () => {
            console.log('WebSocket connected');
            this.reconnectAttempts = 0;
        });
        this.socket.on('disconnect', (reason) => {
            console.log('WebSocket disconnected:', reason);
            if (reason === 'io server disconnect') {
                // Server initiated disconnect, reconnect manually
                this.reconnect();
            }
        });
        this.socket.on('connect_error', (error) => {
            console.error('WebSocket connection error:', error);
            this.reconnect();
        });
        return this.socket;
    }
    reconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('Max reconnection attempts reached');
            return;
        }
        this.reconnectAttempts++;
        const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
        setTimeout(() => {
            console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
            this.socket?.connect();
        }, delay);
    }
    joinSport(sportId) {
        this.socket?.emit('join-sport', sportId);
    }
    leaveSport(sportId) {
        this.socket?.emit('leave-sport', sportId);
    }
    joinMatch(matchId) {
        this.socket?.emit('join-match', matchId);
    }
    leaveMatch(matchId) {
        this.socket?.emit('leave-match', matchId);
    }
    on(event, callback) {
        this.socket?.on(event, callback);
    }
    off(event, callback) {
        this.socket?.off(event, callback);
    }
    onOddsUpdate(callback) {
        this.socket?.on('odds-update', callback);
    }
    onScoreUpdate(callback) {
        this.socket?.on('score-update', callback);
    }
    disconnect() {
        this.socket?.disconnect();
        this.socket = null;
    }
}
export const wsManager = new WebSocketManager();
