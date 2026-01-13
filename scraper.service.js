"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ScraperService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScraperService = void 0;
const common_1 = require("@nestjs/common");
const crawlee_1 = require("crawlee");
let ScraperService = ScraperService_1 = class ScraperService {
    logger = new common_1.Logger(ScraperService_1.name);
    async scrapeNavigation() {
        const data = [];
        const crawler = new crawlee_1.PlaywrightCrawler({
            maxRequestsPerCrawl: 1,
            requestHandler: async ({ page }) => {
                await page.goto('https://www.worldofbooks.com/', {
                    waitUntil: 'domcontentloaded',
                });
                const navItems = await page.$$eval('nav a', (links) => links.map((link) => ({
                    title: link.textContent?.trim(),
                    url: link.getAttribute('href'),
                })));
                data.push(...navItems);
            },
        });
        await crawler.run([
            { url: 'https://www.worldofbooks.com/' },
        ]);
        this.logger.log('Navigation scraped successfully');
        return data;
    }
};
exports.ScraperService = ScraperService;
exports.ScraperService = ScraperService = ScraperService_1 = __decorate([
    (0, common_1.Injectable)()
], ScraperService);
//# sourceMappingURL=scraper.service.js.map