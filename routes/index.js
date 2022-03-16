var express = require('express');
var router = express.Router();

var articleModel = require('../models/articles')
var orderModel = require('../models/orders')
var userModel = require('../models/users')

/* GET home page. */
router.get('/', async function(req, res, next) {

  var emptyStocks = await articleModel.find({stock:0})

  var user = await userModel.findById('5c52e4efaa4beef85aad5e52');
  var messages = user.messages;
  
  var unreadMessages = 0;
  for(var i=0;i<messages.length;i++){
    if(messages[i].read == false){
      unreadMessages +=1
    }
  }

  var taches = user.tasks;
  var taskInprogress = 0

  for(var i=0;i<taches.length;i++){
    if(taches[i].dateCloture == null){
      taskInprogress +=1;
    }
  }

  res.render('index',{emptyStocks:emptyStocks.length,unreadMessages,taskInprogress});
});

/* GET tasks page. */
router.get('/tasks-page', async function(req, res, next) {

  var user = await userModel.findById('5c52e4efaa4beef85aad5e52');
  res.render('tasks', {taches: user.tasks});
});

/* GET Messages page. */
router.get('/messages-page', async function(req, res, next) {

  var user = await userModel.findById('5c52e4efaa4beef85aad5e52');

  res.render('messages', {messages: user.messages});
});

/* GET Users page. */
router.get('/users-page', async function(req, res, next) {

  var users = await userModel.find({status: "customer"});

  res.render('users', {users});
});

/* GET Catalog page. */
router.get('/catalog-page', async function(req, res, next) {

  var articles = await articleModel.find();

  res.render('catalog', {articles});
});

/* GET Orders-list page. */
router.get('/orders-list-page', async function(req, res, next) {

  var orders = await orderModel.find();
  
  res.render('orders-list', {orders});
});

/* GET Order detail page. */
router.get('/order-page', async function(req, res, next) {

  var order = await orderModel.findById(req.query.id)
                              .populate('articles')
                              .exec()

  res.render('order', {order});
});

/* GET chart page. */
router.get('/charts', async function(req, res, next) {

var aggregate = userModel.aggregate();
aggregate.group({ _id: "$gender", userCount: { $sum: 1 } });
var data = await aggregate.exec();

var user = await userModel.find();
var read = 0;
var unread = 0;

for (var i=0; i<user.length; i++) {
  for (var y=0; y<user[i].messages.length; y++) {
    if (user[i].messages[y].read == true) {
      read = read + 1;
    } else {
      unread = unread + 1;
    }
  }
}

var orderpaid_ship = orderModel.aggregate();
orderpaid_ship.match({"status_payment": "validated"})
orderpaid_ship.group({ _id: "$status_shipment", userCount: { $sum: 1 } });
var data_order = await orderpaid_ship.exec();

var ca = orderModel.aggregate();
ca.match({"status_payment": "validated"})
ca.group({ _id: {inscriptionYear: { $year: '$date_payment' },inscriptionMonth: { $month: '$date_payment' }}, chiffreAffaire: {$sum: "$total"} });
var chiffreAffaire = await ca.exec();

console.log(chiffreAffaire);

  res.render('charts', {data, read, unread, data_order, chiffreAffaire});

});



module.exports = router;
