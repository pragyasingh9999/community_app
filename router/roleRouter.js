const express= require('express');
const router= express.Router();

const handleCreateRole= require('../controller/roleController/createRole');
const handleGetRole= require('../controller/roleController/returnRole');

router.route('/')
.post(handleCreateRole)
.get(handleGetRole);

module.exports= router;