'use strict';

/*
 * cab routes
 *
 */

const router = require('express').Router();
const cabController = require('../controllers').cab;
const controllerFactory = require('sample-lib').utils.controllerFactory;

router.get('/', controllerFactory(cabController.index));
router.post('/', controllerFactory(cabController.create));
router.put('/', controllerFactory(cabController.update));
router.delete('/', controllerFactory(cabController.delete));

module.exports = router;