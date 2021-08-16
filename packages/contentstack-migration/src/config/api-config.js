'use strict';

const { CONTENTSTACK_API_KEY, CONTENTSTACK_AUTHTOKEN, CONTENTSTACK_MANAGEMENT_TOKEN } = process.env,
  { version } = require('../../package.json');
module.exports = {
  hostname: 'dev9-api.contentstack.com',
  // hostname: 'stag-app.contentstack.com',
  version: '/v3',
  method: 'GET', // Default Http method
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': null,
    'X-User-Agent': `@contentstack-migration/v${version}`,
    authtoken: CONTENTSTACK_AUTHTOKEN,
    api_key: CONTENTSTACK_API_KEY
    //management_token: CONTENTSTACK_MANAGEMENT_TOKEN
  }
};