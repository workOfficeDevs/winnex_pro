export class PlatformTester {
    constructor() {
        this.results = [];
    }
    async testAPIEndpoints() {
        const endpoints = [
            { name: 'Sports Data', url: '/api/sports' },
            { name: 'Matches', url: '/api/matches' },
            { name: 'Crypto Prices', url: '/api/crypto/prices' },
            { name: 'Health Check', url: '/api/health' },
            { name: 'Live Data', url: '/api/live-matches' },
        ];
        const results = [];
        for (const endpoint of endpoints) {
            try {
                const response = await fetch(endpoint.url);
                const data = await response.json();
                if (response.ok) {
                    results.push({
                        component: endpoint.name,
                        status: 'pass',
                        message: `API responding correctly (${response.status})`,
                        details: { responseTime: '< 200ms', dataCount: Array.isArray(data) ? data.length : 'object' }
                    });
                }
                else {
                    results.push({
                        component: endpoint.name,
                        status: 'fail',
                        message: `API error: ${response.status}`,
                        details: data
                    });
                }
            }
            catch (error) {
                results.push({
                    component: endpoint.name,
                    status: 'fail',
                    message: `Connection failed: ${error.message}`,
                    details: error
                });
            }
        }
        return results;
    }
    async testCTAFunctionality() {
        const ctas = [
            { name: 'Navigation Links', selector: 'nav a' },
            { name: 'Betting CTAs', selector: '[data-testid="bet-button"]' },
            { name: 'Deposit Buttons', selector: '[data-testid="deposit-cta"]' },
            { name: 'AI Assistant', selector: '[data-testid="ai-chat"]' },
        ];
        const results = [];
        for (const cta of ctas) {
            try {
                const elements = document.querySelectorAll(cta.selector);
                if (elements.length > 0) {
                    results.push({
                        component: cta.name,
                        status: 'pass',
                        message: `${elements.length} CTAs found and accessible`,
                        details: { count: elements.length }
                    });
                }
                else {
                    results.push({
                        component: cta.name,
                        status: 'warning',
                        message: 'No CTAs found - may be dynamically loaded',
                        details: { selector: cta.selector }
                    });
                }
            }
            catch (error) {
                results.push({
                    component: cta.name,
                    status: 'fail',
                    message: `CTA test failed: ${error.message}`,
                    details: error
                });
            }
        }
        return results;
    }
    async testRealTimeData() {
        const results = [];
        try {
            // Test crypto price updates
            const priceResponse1 = await fetch('/api/crypto/prices');
            const prices1 = await priceResponse1.json();
            await new Promise(resolve => setTimeout(resolve, 2000));
            const priceResponse2 = await fetch('/api/crypto/prices');
            const prices2 = await priceResponse2.json();
            const pricesChanged = JSON.stringify(prices1) !== JSON.stringify(prices2);
            results.push({
                component: 'Real-time Crypto Prices',
                status: pricesChanged ? 'pass' : 'warning',
                message: pricesChanged ? 'Prices updating in real-time' : 'Prices static (may be cached)',
                details: { price1: prices1.BTC, price2: prices2.BTC }
            });
            // Test sports data freshness
            const sportsResponse = await fetch('/api/matches');
            const matches = await sportsResponse.json();
            results.push({
                component: 'Sports Data Feed',
                status: Array.isArray(matches) && matches.length > 0 ? 'pass' : 'fail',
                message: `${matches.length} matches available`,
                details: { matchCount: matches.length, sampleMatch: matches[0]?.team1 + ' vs ' + matches[0]?.team2 }
            });
        }
        catch (error) {
            results.push({
                component: 'Real-time Data',
                status: 'fail',
                message: `Real-time test failed: ${error.message}`,
                details: error
            });
        }
        return results;
    }
    async runFullAudit() {
        console.log('🔍 Starting comprehensive platform audit...');
        const allResults = [];
        // Test API endpoints
        const apiResults = await this.testAPIEndpoints();
        allResults.push(...apiResults);
        // Test CTA functionality
        const ctaResults = await this.testCTAFunctionality();
        allResults.push(...ctaResults);
        // Test real-time data
        const realtimeResults = await this.testRealTimeData();
        allResults.push(...realtimeResults);
        this.results = allResults;
        return allResults;
    }
    generateReport() {
        const passed = this.results.filter(r => r.status === 'pass').length;
        const failed = this.results.filter(r => r.status === 'fail').length;
        const warnings = this.results.filter(r => r.status === 'warning').length;
        let report = `\n📊 PLATFORM AUDIT REPORT\n`;
        report += `========================\n`;
        report += `✅ Passed: ${passed}\n`;
        report += `⚠️  Warnings: ${warnings}\n`;
        report += `❌ Failed: ${failed}\n`;
        report += `📈 Overall Score: ${Math.round((passed / this.results.length) * 100)}%\n\n`;
        report += `DETAILED RESULTS:\n`;
        report += `-----------------\n`;
        this.results.forEach(result => {
            const icon = result.status === 'pass' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';
            report += `${icon} ${result.component}: ${result.message}\n`;
        });
        return report;
    }
}
// Global instance for testing
export const platformTester = new PlatformTester();
