'use strict';

/**
 * main-release service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::main-release.main-release');
