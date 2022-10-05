"use strict";

/**
 * Order.js controller
 *
 * @description: A set of functions called "actions" for managing `Order`.
 */

const stripe = require("stripe")("sk_test_51LhglXHjapj2jcCnPT6z989wtIYN7XqHgLyTWnjLKyO9mUVtQZ8ogSjvHltaATtf9qNPRJqW1sXeH6OFQvoEsedV00WAkzEXH2");

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) =>  ({

  /**
   * Retrieve order records.
   *
   * @return {Object|Array}
   */

  find: async ctx => {
    if (ctx.query._q) {
      return strapi.service('api::order.order').search(ctx.query);
    } else {
      return strapi.service('api::order.order').fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a order record.
   *
   * @return {Object}
   */

  findOne: async ctx => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.service('api::order.order').fetch(ctx.params);
  },

  /**
   * Count order records.
   *
   * @return {Number}
   */

  count: async ctx => {
    return strapi.service('api::order.order').count(ctx.query);
  },

  /**
   * Create a/an order record.
   *
   * @return {Object}
   */

  create: async ctx => {
    const { user, address, amount, dishes, token, city, state } = ctx.request.body;

    const charge = await stripe.charges.create({
      // Transform cents to dollars.
      amount: amount * 100,
      currency: "usd",
      description: `Order ${new Date()} by ${user}`,
      source: token
    });

    // Register the order in the database
    const order = await strapi.service('api::order.order').create({
      data: {
      user: user,
      address: address,
      amount: amount,
      dishes: dishes,
      city: city,
      state: state,
      token: token
      }
    });

    return order;
  },

  /**
   * Update a/an order record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.service('api::order.order').edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an order record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.service('api::order.order').remove(ctx.params);
  }
}));
