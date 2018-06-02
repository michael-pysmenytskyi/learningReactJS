var UsersHandler = require('../handlers/users');
var express = require('express');
var router = express.Router();
var usersHandler = new UsersHandler();
var sessionHelper = require('../helpers/session');
var checkAuthentication = sessionHelper.checkAuthentication;
var destroySession = sessionHelper.destroySession;

router.get('/', /*checkAuthentication,*/ usersHandler.getAllUsers);
router.post('/', usersHandler.createUser);
router.post('/signUp', usersHandler.signUp);
router.post('/signIn', usersHandler.signIn);
router.post('/logout', destroySession, usersHandler.logout);
router.patch('/:id', checkAuthentication, usersHandler.updateUser);
router.delete('/:id', usersHandler.deleteUser);

module.exports = router;