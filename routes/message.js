var express = require('express');
var router = express.Router();
var moment = require('moment');

var ChannelMessage = require('../schemas/channelMessage');

/* GET home page. */
router.get('/list', async function (req, res, next) {
  const messageList = await ChannelMessage.find({});

  res.render('message/list', { messageList, searchOption: {}, moment });
});

router.post('/list', async function (req, res, next) {
  const { nick_name, channel_id, msg_type_code } = req.body;

  const searchOption = {
    nick_name,
    channel_id,
    msg_type_code: msg_type_code === '9' ? '' : msg_type_code,
  };

  const queryOptionObj = {};

  for (let key in searchOption) {
    if (searchOption[key]) {
      queryOptionObj[key] = searchOption[key];
    }
  }

  const messageList = await ChannelMessage.find({ ...queryOptionObj });

  res.render('message/list', { messageList, searchOption, moment });
});

router.get('/create', function (req, res, next) {
  res.render('message/create');
});

router.post('/create', async function (req, res, next) {
  const { channel_id, member_id, nick_name, ip_address, message, connection_id, top_channel_msg_id, msg_type_code } =
    req.body;

  const newMessage = {
    channel_id,
    member_id,
    nick_name,
    ip_address,
    message,
    connection_id,
    top_channel_msg_id,
    msg_type_code,
    msg_state_code: 1,
    msg_date: Date.now(),
  };

  await ChannelMessage.create(newMessage);

  res.redirect('/message/list');
});

router.get('/modify/:mid', async function (req, res, next) {
  const channel_msg_id = req.params.mid;

  const message = await ChannelMessage.findOne({ channel_msg_id });

  res.render('message/modify', { message, moment });
});

router.post('/modify/:mid', async function (req, res, next) {
  const channel_msg_id = req.params.mid;

  const { channel_id, member_id, nick_name, ip_address, message, connection_id, top_channel_msg_id, msg_type_code } =
    req.body;

  const newMessage = {
    channel_id,
    member_id,
    nick_name,
    ip_address,
    message,
    connection_id,
    top_channel_msg_id,
    msg_type_code,
    msg_state_code: 1,
    edit_date: Date.now(),
  };

  await ChannelMessage.updateOne({ channel_msg_id }, newMessage);

  res.redirect('/message/list');
});

router.get('/delete', async function (req, res, next) {
  const channel_msg_id = req.query.mid;

  const deletedMessage = {
    del_date: Date.now(),
  };

  await ChannelMessage.updateOne({ channel_msg_id }, deletedMessage);

  res.redirect('/message/list');
});

module.exports = router;
