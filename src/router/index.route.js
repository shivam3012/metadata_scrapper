const express = require('express');
const router = express.Router();
const ScrapeRouter = require('./scrape.route');

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send('OK')
);

router.use('/scrape', ScrapeRouter);

module.exports = router;