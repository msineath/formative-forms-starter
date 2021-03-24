const express = require('express');
const router = express.Router();
const csurf = require('csurf');
const csurfProtection = csurf({cookie: true});

router.get('/create', csurfProtection, (req, res) => {
    res.render('create', {csrfToken: req.csrfToken()});
});

module.exports = router;