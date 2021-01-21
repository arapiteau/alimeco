const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('landing');
});

router.get('/homepage', (req, res) => {
    res.render('homepage');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    // A ECRIRE
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    // A ECRIRE
});

router.get('/logout', (req, res) => {
    // A ECRIRE
});

module.exports = router;