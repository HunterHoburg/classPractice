var express = require('express');
var router = express.Router();
var db = require('../conf/db')
var spDB = db.get('tshirtspants')
var catDB = db.get('categories')


/* POST users listing. */
router.post('/', function(req, res, next) {
  console.log('posting...')
  spDB.insert(req.body).then(function(data) {
    var dataset = data;
    spDB.find({}, function(err, data) {
      catDB.find({}, function(err, data) {
        res.render('index', {dataset: dataset, categories: data})
      })
    })
  }).catch(function(err){
    res.send(err)
  })
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  spDB.find({}).then(function(data) {
    var dataset = data;
    catDB.find({}).then(function(data) {
      res.render('index', {dataset: dataset, categories: data})
    })
  })
});

router.get('/:id', function(req, res, next) {
  spDB.findOne({_id: req.params.id}).then(function(data) {
    res.render('show',{item: data})
  })
})

router.put('/:id', function(req, res, next) {
  spDB.updateById(req.params.id, req.body, function(err, data) {
    res.send(data);
  })
})

module.exports = router;
