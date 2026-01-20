// Development: Use relative path to leverage webpack proxy
// Production: Use full URL with port 3003
// SSR: Use full URL with port 3000
let url = '/';

if (typeof window === 'undefined' && SERVER) {
    // SSR environment - use port 3000
    url = 'http://45.77.217.138:3000/';
} else if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Production browser environment - use port 3003
    url = 'http://45.77.217.138:3003/';
}
// Development browser: uses '/' which goes through webpack proxy

export default url;
