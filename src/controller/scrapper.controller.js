/* eslint-disable max-len,no-underscore-dangle,dot-notation,object-shorthand,no-use-before-define */
const i18n = require("i18n");
const Utility = require('../utility/util');
const httpStatus = require('../exceptions/httpStatusCodes.json');

const cheerio = require('cheerio');
const got = require('got');

module.exports = {

  // web scrapper
  scrapper: async (req, res, next) => {
    try {
      const targetUrl = req.body.url;
      const { body: html, url } = await got(targetUrl);
      let metadata = {};

      //create the cheerio object
      let $ = cheerio.load(html);

      //create a reference to the meta elements
      metadata.title = $('head title').text() ? $('head title').text() : null;
      metadata.description = $('meta[name="description"]').attr('content') ? $('meta[name="description"]').attr('content') : null;
      metadata.keywords = $('meta[name="keywords"]').attr('content') ? $('meta[name="keywords"]').attr('content') : null;
      metadata.url = $('link[rel="canonical"]').attr('href') ? $('link[rel="canonical"]').attr('href') : null;
      metadata.ogUrl = $('meta[property="og:url"]').attr('content') ? $('meta[property="og:url"]').attr('content') : null;
      metadata.author = $('meta[name="author"]').attr('content') ? $('meta[name="author"]').attr('content') : null;
      metadata.ogTitle = $('meta[property="og:title"]').attr('content') ? $('meta[property="og:title"]').attr('content') : null;
      metadata.ogImage = $('meta[property="og:image"]').attr('content') ? $('meta[property="og:image"]').attr('content') : null;
      metadata.ogkeywords = $('meta[property="og:keywords"]').attr('content') ? $('meta[property="og:keywords"]').attr('content') : null;
      metadata.images = [];
      if ($('img') && $('img').length) {
        for (let i = 0; i < $('img').length; i++) {
          metadata.images.push($($('img')[i]).attr('src'));
        }
      }

      // send the response
      return Utility.response(res,
        metadata,
        i18n.__("DATA_FETCHED"),
        httpStatus.OK,
        {},
        i18n.__("responseStatus.SUCCESS")
      );
    } catch (e) {
      e.resMsg = i18n.__("SOMETHING_WENT_WRONG");
      e.resCode = i18n.__("responseStatus.FAILURE")
      return next(e);
    }
  }
}