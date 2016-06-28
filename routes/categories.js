var express = require('express');
var router = express.Router();
var db = require('../conf/db')
var spDB = db.get('categories')

/* POST users listing. */
router.post('/', function(req, res, next) {
  spDB.insert(req.body).then(function(data) {
    res.redirect('/clothes')
  }).catch(function(err){
    res.send(err)
  })
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  spDB.find({}, function(err, data) {
    res.send(data);
  })
});

router.get('/:id', function(req, res, next) {
  spDB.findOne({_id: req.params.id}, function(err, data) {
    res.send(data)
  })
})

module.exports = router;
