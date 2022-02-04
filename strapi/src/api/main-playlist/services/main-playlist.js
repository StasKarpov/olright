'use strict';

/**
 * main-playlist service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::main-playlist.main-playlist');
