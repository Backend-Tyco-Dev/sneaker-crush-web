const TARGET_SERVER_HOST = process.env.TARGET_SERVER_HOST ? process.env.TARGET_SERVER_HOST.trim() : '';
const TARGET_SERVER_USER = process.env.TARGET_SERVER_USER ? process.env.TARGET_SERVER_USER.trim() : '';
const TARGET_SERVER_APP_PATH = `/home/www/www-ssr.bool.kz`;
const REPO = 'git@gitlab.com:asmoth/bool-main.git';

// console.log(TARGET_SERVER_HOST);
// console.log(TARGET_SERVER_USER);
// console.log(TARGET_SERVER_APP_PATH);

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'ssr',
      script: 'server.js'
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: TARGET_SERVER_USER,
      host: TARGET_SERVER_HOST,
      ref: 'origin/production',
      repo: REPO,
      ssh_options: 'StrictHostKeyChecking=no',
      path: TARGET_SERVER_APP_PATH,
      'post-deploy': 'npm i'
        + ' && pm2 startOrRestart ecosystem.config.js --env=production'
        + ' && pm2 save'
    }
  }
};