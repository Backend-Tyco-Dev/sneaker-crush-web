let url = '/';
if (SERVER || DEBUG) {
    url = 'http://localhost:3000/';
}
if (process.env.USE_STAGING === 'true') {
  url = 'https://staging.thesneakercrush.com/';
}
export default url;
