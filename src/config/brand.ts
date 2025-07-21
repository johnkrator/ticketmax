/**
 * Central brand configuration for the application
 * Update these values to change branding across the entire app
 */

export const BRAND_CONFIG = {
    // Brand name - used throughout the application
    name: "TicketMax",

    // App title for browser tab
    title: "TicketMax",

    // Tagline or description
    description: "Your premier event ticketing platform",

    // URL/Domain (if needed)
    domain: "ticketmax.com",

    // Support email
    supportEmail: "support@ticketmax.com",

    // Copyright notice
    copyright: `© ${new Date().getFullYear()} TicketMax. All rights reserved.`,
} as const;

// Export individual values for convenience
export const BRAND_NAME = BRAND_CONFIG.name;
export const BRAND_TITLE = BRAND_CONFIG.title;
export const BRAND_DESCRIPTION = BRAND_CONFIG.description;
export const BRAND_COPYRIGHT = BRAND_CONFIG.copyright;
