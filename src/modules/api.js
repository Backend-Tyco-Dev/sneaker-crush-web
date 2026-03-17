// Browser and SSR: always use thesneakercrush.com so GraphQL hits the live API.
// For local dev this means requests go to https://thesneakercrush.com/graphql (CORS must allow your origin).
const PRODUCTION_API = 'https://thesneakercrush.com/';

let url = PRODUCTION_API;

if (typeof window === 'undefined' && SERVER) {
    url = PRODUCTION_API;
}
// Browser (dev and prod): use production API so GraphQL is https://thesneakercrush.com/graphql

// Debug logging (only in development)
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production' && DEBUG) {
    console.log('[API] Using URL:', url);
}

export default url;
