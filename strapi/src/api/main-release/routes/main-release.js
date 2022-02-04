'use strict';

/**
 * main-release router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::main-release.main-release');
