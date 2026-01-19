let url = '/';
if (SERVER || DEBUG) {
    url = 'http://45.77.217.138:3000/';
}
if (process.env.USE_STAGING === 'true') {
  url = 'http://45.77.217.138:3000/';
}
export default url;
