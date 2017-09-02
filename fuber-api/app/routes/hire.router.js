'use strict';

/*
 * hire routes
 *
*/

const router = require('express').Router();
const hireController = require('../controllers').hire
const controllerFactory = require('sample-lib').utils.controllerFactory;

router.get('/', controllerFactory(hireController.index));
router.post('/', controllerFactory(hireController.create));
router.put('/', controllerFactory(hireController.update));
router.delete('/', controllerFactory(hireController.delete));

module.exports = router;
