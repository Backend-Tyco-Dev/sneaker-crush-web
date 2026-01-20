let url = '/';
// Use proxy in development to avoid CORS issues
// Only use direct URL for SSR (SERVER mode)
if (SERVER) {
    url = 'http://45.77.217.138:3000/';
}
// In development (DEBUG mode), use relative path to leverage webpack proxy
// The proxy will forward /graphql to http://45.77.217.138:3000/graphql
// In production, use relative path (same domain)
export default url;
