'use strict';

/**
 * releases-gallery service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::releases-gallery.releases-gallery');
