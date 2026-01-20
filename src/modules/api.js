// Development: Use relative path to leverage webpack proxy (port 3000)
// Production: Use full URL with port 3003
// SSR: Use full URL with port 3000
let url = '/';

if (typeof window === 'undefined' && SERVER) {
    // SSR environment (Node.js) - use port 3000
    url = 'http://45.77.217.138:3000/';
} else if (typeof window !== 'undefined') {
    // Browser environment
    // Check if we're in production mode (webpack replaces process.env.NODE_ENV at build time)
    const isProduction = process.env.NODE_ENV === 'production' || 
                         (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production');
    
    if (isProduction) {
        // Production browser - use port 3003
        url = 'http://45.77.217.138:3003/';
    }
    // Development browser: uses '/' which goes through webpack proxy to port 3000
}

export default url;
