const express = require('express');
const router = express.Router();

const { handleCreateCommunity, handleGetAllCommunity } = require('../controller/communityController/createGetCommunity');
const { handleGetMyOwnedCommunity, handleGetMyJoinedCommunity } = require('../controller/communityController/myCommunity');
const handleGetAllMembers = require('../controller/communityController/member');

router.route('/')
    .post(handleCreateCommunity)
    .get(handleGetAllCommunity);

router.route('/:id/members')
    .get(handleGetAllMembers);

router.route('/me/owner')
    .get(handleGetMyOwnedCommunity);

router.route('/me/member')
    .get(handleGetMyJoinedCommunity);

module.exports = router;