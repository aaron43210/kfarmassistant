/**
 * URL Validation utilities for secure external redirects
 */

// Whitelist of allowed government and trusted domains
const ALLOWED_DOMAINS = [
  'gov.in',
  'nic.in',
  'kerala.gov.in',
  'india.gov.in',
  'farmer.gov.in',
  'pmkisan.gov.in',
  'agricoop.gov.in',
  'krishi.gov.in',
];

/**
 * Validates if a URL is safe for redirection
 * @param url - The URL to validate
 * @returns boolean indicating if the URL is safe
 */
export function isValidRedirectUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    
    // Only allow HTTPS for external links
    if (urlObj.protocol !== 'https:') {
      return false;
    }
    
    // Check if domain is in whitelist
    const hostname = urlObj.hostname.toLowerCase();
    const isAllowed = ALLOWED_DOMAINS.some(domain => 
      hostname === domain || hostname.endsWith(`.${domain}`)
    );
    
    return isAllowed;
  } catch {
    // Invalid URL format
    return false;
  }
}

/**
 * Safely redirects to an external URL after validation
 * @param url - The URL to redirect to
 * @param fallbackMessage - Message to show if URL is invalid
 */
export function safeRedirect(url: string, fallbackMessage?: string): void {
  if (isValidRedirectUrl(url)) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    console.warn('Blocked redirect to untrusted URL:', url);
    if (fallbackMessage) {
      alert(fallbackMessage);
    }
  }
}
