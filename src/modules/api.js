// Development: Use relative path to leverage webpack proxy (port 3000)
// Production: Use https://thesneakercrush.com/ (same domain, no CORS issues)
// SSR: Use https://thesneakercrush.com/ (same domain as production)
let url = '/';

if (typeof window === 'undefined' && SERVER) {
    // SSR environment (Node.js) - use https://thesneakercrush.com/
    url = 'https://thesneakercrush.com/';
} else if (typeof window !== 'undefined') {
    // Browser environment
    // Check if we're in production mode (webpack replaces process.env.NODE_ENV at build time)
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isProduction) {
        // Production browser - use https://thesneakercrush.com/
        url = 'https://thesneakercrush.com/';
    }
    // Development browser: uses '/' which goes through webpack proxy to port 3000
}

// Debug logging (only in development)
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production' && DEBUG) {
    console.log('[API] Using URL:', url);
}

export default url;
