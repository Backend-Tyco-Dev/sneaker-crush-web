// Development: Use relative path to leverage webpack proxy (port 3000)
// Production: Use full URL with port 3000 (same backend as development)
// SSR: Use full URL with port 3000
let url = '/';

if (typeof window === 'undefined' && SERVER) {
    // SSR environment (Node.js) - use port 3000
    url = 'http://45.77.217.138:3000/';
} else if (typeof window !== 'undefined') {
    // Browser environment
    // Check if we're in production mode (webpack replaces process.env.NODE_ENV at build time)
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isProduction) {
        // Production browser - use port 3000 (same backend as development)
        url = 'http://45.77.217.138:3000/';
    }
    // Development browser: uses '/' which goes through webpack proxy to port 3000
}

// Debug logging (only in development)
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production' && DEBUG) {
    console.log('[API] Using URL:', url);
}

export default url;
