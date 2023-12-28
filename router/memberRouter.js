const express= require('express');
const router= express.Router();

const handleAddMember= require('../controller/memberController/addMember');
const handleDeleteMember= require('../controller/memberController/deleteMember');

router.route('/')
.post(handleAddMember);

router.route('/:id')
.delete(handleDeleteMember);

module.exports= router;