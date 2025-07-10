export function setupWebSocket(io, storage) {
    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);
        socket.on("join-sport", (sportId) => {
            socket.join(`sport-${sportId}`);
        });
        socket.on("join-match", (matchId) => {
            socket.join(`match-${matchId}`);
        });
        socket.on("leave-sport", (sportId) => {
            socket.leave(`sport-${sportId}`);
        });
        socket.on("leave-match", (matchId) => {
            socket.leave(`match-${matchId}`);
        });
        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
    // Simulate real-time odds updates
    setInterval(async () => {
        try {
            const liveMatches = await storage.getMatches({ live: true });
            for (const match of liveMatches) {
                const odds = await storage.getMatchOdds(match.id);
                // Simulate odds changes (5% chance per update)
                if (Math.random() < 0.05) {
                    const randomOdd = odds[Math.floor(Math.random() * odds.length)];
                    if (randomOdd) {
                        const currentOdds = parseFloat(randomOdd.odds);
                        const change = (Math.random() - 0.5) * 0.2;
                        const newOdds = Math.max(1.01, currentOdds + change);
                        await storage.updateOdds(randomOdd.id, newOdds.toFixed(2));
                        // Emit to all clients watching this match
                        io.to(`match-${match.id}`).emit("odds-update", {
                            matchId: match.id,
                            oddsId: randomOdd.id,
                            market: randomOdd.market,
                            selection: randomOdd.selection,
                            odds: newOdds.toFixed(2)
                        });
                    }
                }
                // Simulate score updates (1% chance per update)
                if (Math.random() < 0.01) {
                    const scoreUpdate = Math.random() > 0.5 ? "score1" : "score2";
                    const newScore = (match[scoreUpdate] || 0) + 1;
                    await storage.updateMatchScore(match.id, scoreUpdate, newScore);
                    io.to(`match-${match.id}`).emit("score-update", {
                        matchId: match.id,
                        score1: scoreUpdate === "score1" ? newScore : match.score1,
                        score2: scoreUpdate === "score2" ? newScore : match.score2
                    });
                }
            }
        }
        catch (error) {
            console.error("Error in real-time updates:", error);
        }
    }, 3000); // Update every 3 seconds
}
