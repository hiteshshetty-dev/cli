'use strict';

// Service
const { LocaleService } = require('../services'),

  // Config
  { masterLocale } = require('../config'),

  // Utils
  { safePromise} = require('../utils');
  

class Locale {
  constructor() {
    this.localeService = new LocaleService();
  }

  async fetchLocales(callback) {

    let { master_locale } = masterLocale,

      { localeService } = this,
      [err, result] = await safePromise(localeService.getLocale());

    if (err) throw new Error(err);

    // Use default code, if no result is found
    result = result.length ? result : [master_locale]

    if (callback) return callback(null, result);
    return result;
  }
}

module.exports = Locale;