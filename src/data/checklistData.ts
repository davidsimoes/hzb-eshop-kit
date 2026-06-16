export interface ChecklistItem {
  id: string;
  titleKey: string;
  day: number;
  descriptionKey: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTimeKey: string;
  tipsKey?: string;
}

export const checklistData: ChecklistItem[] = [
  // Day 1: Legal and Financial Start
  {
    id: 'day-1-zivnost',
    titleKey: 'checklist.tasks.day1.zivnost.title',
    day: 1,
    descriptionKey: 'checklist.tasks.day1.zivnost.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day1.zivnost.time'
  },
  {
    id: 'day-1-bank-account',
    titleKey: 'checklist.tasks.day1.bankAccount.title',
    day: 1,
    descriptionKey: 'checklist.tasks.day1.bankAccount.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day1.bankAccount.time'
  },
  {
    id: 'day-1-accounting',
    titleKey: 'checklist.tasks.day1.accounting.title',
    day: 1,
    descriptionKey: 'checklist.tasks.day1.accounting.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day1.accounting.time',
    tipsKey: 'checklist.tasks.day1.accounting.tips'
  },
  {
    id: 'day-1-budget',
    titleKey: 'checklist.tasks.day1.budget.title',
    day: 1,
    descriptionKey: 'checklist.tasks.day1.budget.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day1.budget.time'
  },
  // Day 2: Payment Gateway and Shipping
  {
    id: 'day-2-payment-gateway',
    titleKey: 'checklist.tasks.day2.paymentGateway.title',
    day: 2,
    descriptionKey: 'checklist.tasks.day2.paymentGateway.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day2.paymentGateway.time',
    tipsKey: 'checklist.tasks.day2.paymentGateway.tips'
  },
  {
    id: 'day-2-shipping',
    titleKey: 'checklist.tasks.day2.shipping.title',
    day: 2,
    descriptionKey: 'checklist.tasks.day2.shipping.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day2.shipping.time'
  },
  {
    id: 'day-2-shipping-prices',
    titleKey: 'checklist.tasks.day2.shippingPrices.title',
    day: 2,
    descriptionKey: 'checklist.tasks.day2.shippingPrices.description',
    priority: 'medium',
    estimatedTimeKey: 'checklist.tasks.day2.shippingPrices.time'
  },
  // Day 3: Legal Documents and Moodboard
  {
    id: 'day-3-legal-docs',
    titleKey: 'checklist.tasks.day3.legalDocs.title',
    day: 3,
    descriptionKey: 'checklist.tasks.day3.legalDocs.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day3.legalDocs.time',
    tipsKey: 'checklist.tasks.day3.legalDocs.tips'
  },
  {
    id: 'day-3-moodboard',
    titleKey: 'checklist.tasks.day3.moodboard.title',
    day: 3,
    descriptionKey: 'checklist.tasks.day3.moodboard.description',
    priority: 'medium',
    estimatedTimeKey: 'checklist.tasks.day3.moodboard.time'
  },
  {
    id: 'day-3-legal-requirements',
    titleKey: 'checklist.tasks.day3.legalRequirements.title',
    day: 3,
    descriptionKey: 'checklist.tasks.day3.legalRequirements.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day3.legalRequirements.time'
  },
  // Day 4: Branding, Products, Social Media and Pricing Strategy
  {
    id: 'day-4-logo',
    titleKey: 'checklist.tasks.day4.logo.title',
    day: 4,
    descriptionKey: 'checklist.tasks.day4.logo.description',
    priority: 'medium',
    estimatedTimeKey: 'checklist.tasks.day4.logo.time',
    tipsKey: 'checklist.tasks.day4.logo.tips'
  },
  {
    id: 'day-4-products',
    titleKey: 'checklist.tasks.day4.products.title',
    day: 4,
    descriptionKey: 'checklist.tasks.day4.products.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day4.products.time'
  },
  {
    id: 'day-4-social-media',
    titleKey: 'checklist.tasks.day4.socialMedia.title',
    day: 4,
    descriptionKey: 'checklist.tasks.day4.socialMedia.description',
    priority: 'medium',
    estimatedTimeKey: 'checklist.tasks.day4.socialMedia.time'
  },
  {
    id: 'day-4-pricing',
    titleKey: 'checklist.tasks.day4.pricing.title',
    day: 4,
    descriptionKey: 'checklist.tasks.day4.pricing.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day4.pricing.time'
  },
  // Day 5: Platform Selection and Basic Setup
  {
    id: 'day-5-platform',
    titleKey: 'checklist.tasks.day5.platform.title',
    day: 5,
    descriptionKey: 'checklist.tasks.day5.platform.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day5.platform.time',
    tipsKey: 'checklist.tasks.day5.platform.tips'
  },
  {
    id: 'day-5-basic-pages',
    titleKey: 'checklist.tasks.day5.basicPages.title',
    day: 5,
    descriptionKey: 'checklist.tasks.day5.basicPages.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day5.basicPages.time'
  },
  {
    id: 'day-5-domain',
    titleKey: 'checklist.tasks.day5.domain.title',
    day: 5,
    descriptionKey: 'checklist.tasks.day5.domain.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day5.domain.time'
  },
  // Day 6: Content and Basic SEO
  {
    id: 'day-6-upload-products',
    titleKey: 'checklist.tasks.day6.uploadProducts.title',
    day: 6,
    descriptionKey: 'checklist.tasks.day6.uploadProducts.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day6.uploadProducts.time',
    tipsKey: 'checklist.tasks.day6.uploadProducts.tips'
  },
  {
    id: 'day-6-seo-basics',
    titleKey: 'checklist.tasks.day6.seoBasics.title',
    day: 6,
    descriptionKey: 'checklist.tasks.day6.seoBasics.description',
    priority: 'medium',
    estimatedTimeKey: 'checklist.tasks.day6.seoBasics.time'
  },
  {
    id: 'day-6-keywords',
    titleKey: 'checklist.tasks.day6.keywords.title',
    day: 6,
    descriptionKey: 'checklist.tasks.day6.keywords.description',
    priority: 'medium',
    estimatedTimeKey: 'checklist.tasks.day6.keywords.time'
  },
  // Day 7: Payment and Shipping
  {
    id: 'day-7-integrate-payments',
    titleKey: 'checklist.tasks.day7.integratePayments.title',
    day: 7,
    descriptionKey: 'checklist.tasks.day7.integratePayments.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day7.integratePayments.time'
  },
  {
    id: 'day-7-integrate-shipping',
    titleKey: 'checklist.tasks.day7.integrateShipping.title',
    day: 7,
    descriptionKey: 'checklist.tasks.day7.integrateShipping.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day7.integrateShipping.time'
  },
  {
    id: 'day-7-payment-methods',
    titleKey: 'checklist.tasks.day7.paymentMethods.title',
    day: 7,
    descriptionKey: 'checklist.tasks.day7.paymentMethods.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day7.paymentMethods.time',
    tipsKey: 'checklist.tasks.day7.paymentMethods.tips'
  },
  {
    id: 'day-7-shipping-prices',
    titleKey: 'checklist.tasks.day7.shippingPrices.title',
    day: 7,
    descriptionKey: 'checklist.tasks.day7.shippingPrices.description',
    priority: 'medium',
    estimatedTimeKey: 'checklist.tasks.day7.shippingPrices.time'
  },
  // Day 8: Legal Pages and UX
  {
    id: 'day-8-legal-footer',
    titleKey: 'checklist.tasks.day8.legalFooter.title',
    day: 8,
    descriptionKey: 'checklist.tasks.day8.legalFooter.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day8.legalFooter.time'
  },
  {
    id: 'day-8-mobile-responsive',
    titleKey: 'checklist.tasks.day8.mobileResponsive.title',
    day: 8,
    descriptionKey: 'checklist.tasks.day8.mobileResponsive.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day8.mobileResponsive.time'
  },
  {
    id: 'day-8-page-speed',
    titleKey: 'checklist.tasks.day8.pageSpeed.title',
    day: 8,
    descriptionKey: 'checklist.tasks.day8.pageSpeed.description',
    priority: 'medium',
    estimatedTimeKey: 'checklist.tasks.day8.pageSpeed.time',
    tipsKey: 'checklist.tasks.day8.pageSpeed.tips'
  },
  {
    id: 'day-8-checkout',
    titleKey: 'checklist.tasks.day8.checkout.title',
    day: 8,
    descriptionKey: 'checklist.tasks.day8.checkout.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day8.checkout.time'
  },
  // Day 9: Testing
  {
    id: 'day-9-test-order',
    titleKey: 'checklist.tasks.day9.testOrder.title',
    day: 9,
    descriptionKey: 'checklist.tasks.day9.testOrder.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day9.testOrder.time',
    tipsKey: 'checklist.tasks.day9.testOrder.tips'
  },
  {
    id: 'day-9-friends-feedback',
    titleKey: 'checklist.tasks.day9.friendsFeedback.title',
    day: 9,
    descriptionKey: 'checklist.tasks.day9.friendsFeedback.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day9.friendsFeedback.time'
  },
  {
    id: 'day-9-device-testing',
    titleKey: 'checklist.tasks.day9.deviceTesting.title',
    day: 9,
    descriptionKey: 'checklist.tasks.day9.deviceTesting.description',
    priority: 'medium',
    estimatedTimeKey: 'checklist.tasks.day9.deviceTesting.time'
  },
  // Day 10: Final Preparation and Analytics
  {
    id: 'day-10-legal-info',
    titleKey: 'checklist.tasks.day10.legalInfo.title',
    day: 10,
    descriptionKey: 'checklist.tasks.day10.legalInfo.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day10.legalInfo.time'
  },
  {
    id: 'day-10-support',
    titleKey: 'checklist.tasks.day10.support.title',
    day: 10,
    descriptionKey: 'checklist.tasks.day10.support.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day10.support.time'
  },
  {
    id: 'day-10-analytics',
    titleKey: 'checklist.tasks.day10.analytics.title',
    day: 10,
    descriptionKey: 'checklist.tasks.day10.analytics.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day10.analytics.time',
    tipsKey: 'checklist.tasks.day10.analytics.tips'
  },
  {
    id: 'day-10-search-console',
    titleKey: 'checklist.tasks.day10.searchConsole.title',
    day: 10,
    descriptionKey: 'checklist.tasks.day10.searchConsole.description',
    priority: 'medium',
    estimatedTimeKey: 'checklist.tasks.day10.searchConsole.time'
  },
  {
    id: 'day-10-automation',
    titleKey: 'checklist.tasks.day10.automation.title',
    day: 10,
    descriptionKey: 'checklist.tasks.day10.automation.description',
    priority: 'medium',
    estimatedTimeKey: 'checklist.tasks.day10.automation.time'
  },
  {
    id: 'day-10-heureka-feed',
    titleKey: 'checklist.tasks.day10.heurekaFeed.title',
    day: 10,
    descriptionKey: 'checklist.tasks.day10.heurekaFeed.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day10.heurekaFeed.time',
    tipsKey: 'checklist.tasks.day10.heurekaFeed.tips'
  },
  // Day 11: Soft Launch
  {
    id: 'day-11-soft-launch',
    titleKey: 'checklist.tasks.day11.softLaunch.title',
    day: 11,
    descriptionKey: 'checklist.tasks.day11.softLaunch.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day11.softLaunch.time',
    tipsKey: 'checklist.tasks.day11.softLaunch.tips'
  },
  {
    id: 'day-11-collect-feedback',
    titleKey: 'checklist.tasks.day11.collectFeedback.title',
    day: 11,
    descriptionKey: 'checklist.tasks.day11.collectFeedback.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day11.collectFeedback.time'
  },
  {
    id: 'day-11-specific-questions',
    titleKey: 'checklist.tasks.day11.specificQuestions.title',
    day: 11,
    descriptionKey: 'checklist.tasks.day11.specificQuestions.description',
    priority: 'medium',
    estimatedTimeKey: 'checklist.tasks.day11.specificQuestions.time'
  },
  // Day 12: Marketing and Content
  {
    id: 'day-12-brand-story',
    titleKey: 'checklist.tasks.day12.brandStory.title',
    day: 12,
    descriptionKey: 'checklist.tasks.day12.brandStory.description',
    priority: 'medium',
    estimatedTimeKey: 'checklist.tasks.day12.brandStory.time',
    tipsKey: 'checklist.tasks.day12.brandStory.tips'
  },
  {
    id: 'day-12-launch-posts',
    titleKey: 'checklist.tasks.day12.launchPosts.title',
    day: 12,
    descriptionKey: 'checklist.tasks.day12.launchPosts.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day12.launchPosts.time'
  },
  {
    id: 'day-12-optimize-content',
    titleKey: 'checklist.tasks.day12.optimizeContent.title',
    day: 12,
    descriptionKey: 'checklist.tasks.day12.optimizeContent.description',
    priority: 'medium',
    estimatedTimeKey: 'checklist.tasks.day12.optimizeContent.time'
  },
  // Day 13: Final Tuning
  {
    id: 'day-13-final-check',
    titleKey: 'checklist.tasks.day13.finalCheck.title',
    day: 13,
    descriptionKey: 'checklist.tasks.day13.finalCheck.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day13.finalCheck.time',
    tipsKey: 'checklist.tasks.day13.finalCheck.tips'
  },
  {
    id: 'day-13-plan-launch',
    titleKey: 'checklist.tasks.day13.planLaunch.title',
    day: 13,
    descriptionKey: 'checklist.tasks.day13.planLaunch.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day13.planLaunch.time'
  },
  {
    id: 'day-13-problem-list',
    titleKey: 'checklist.tasks.day13.problemList.title',
    day: 13,
    descriptionKey: 'checklist.tasks.day13.problemList.description',
    priority: 'medium',
    estimatedTimeKey: 'checklist.tasks.day13.problemList.time'
  },
  // Day 14: Promotion
  {
    id: 'day-14-ads',
    titleKey: 'checklist.tasks.day14.ads.title',
    day: 14,
    descriptionKey: 'checklist.tasks.day14.ads.description',
    priority: 'medium',
    estimatedTimeKey: 'checklist.tasks.day14.ads.time',
    tipsKey: 'checklist.tasks.day14.ads.tips'
  },
  {
    id: 'day-14-social-promotion',
    titleKey: 'checklist.tasks.day14.socialPromotion.title',
    day: 14,
    descriptionKey: 'checklist.tasks.day14.socialPromotion.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day14.socialPromotion.time'
  },
  {
    id: 'day-14-discount-code',
    titleKey: 'checklist.tasks.day14.discountCode.title',
    day: 14,
    descriptionKey: 'checklist.tasks.day14.discountCode.description',
    priority: 'medium',
    estimatedTimeKey: 'checklist.tasks.day14.discountCode.time'
  },
  // Day 15: Launch Day
  {
    id: 'day-15-launch',
    titleKey: 'checklist.tasks.day15.launch.title',
    day: 15,
    descriptionKey: 'checklist.tasks.day15.launch.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day15.launch.time',
    tipsKey: 'checklist.tasks.day15.launch.tips'
  },
  {
    id: 'day-15-monitor-analytics',
    titleKey: 'checklist.tasks.day15.monitorAnalytics.title',
    day: 15,
    descriptionKey: 'checklist.tasks.day15.monitorAnalytics.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day15.monitorAnalytics.time'
  },
  {
    id: 'day-15-notifications',
    titleKey: 'checklist.tasks.day15.notifications.title',
    day: 15,
    descriptionKey: 'checklist.tasks.day15.notifications.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day15.notifications.time'
  },
  {
    id: 'day-15-focus-areas',
    titleKey: 'checklist.tasks.day15.focusAreas.title',
    day: 15,
    descriptionKey: 'checklist.tasks.day15.focusAreas.description',
    priority: 'high',
    estimatedTimeKey: 'checklist.tasks.day15.focusAreas.time'
  }
];