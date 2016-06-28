var request = require('supertest')
var expect = require('chai').expect
var app = require('../../app')
var db = require('../../conf/db')
var spDB = db.get('tshirtspants')


afterEach(function(done) {
  spDB.drop();
  done()
})

describe('/clothes', function(){
  it('should respond with a 200', function(done) {
    request(app).get('/clothes').expect(200,done)
  })
  it('should return a list of items in the database', function(done) {
    spDB.insert({ category: 'tshirt',name: 'Stellar T-Shirt', price: 10.99,  _id: '5772db6067a73829c4a9054b'}, function(err, data) {});
    request(app).get('/clothes').expect(function(res) {
      expect(res.body[0].category).to.equal('tshirt');
    }).end(done)
  })

  it('should respond with a 200 when posting to /clothes', function(done) {
    request(app).post('/clothes').expect(200,done);
  })
  it('should add item posted to the database', function(done) {
    request(app).post('/clothes')
    .send({
      category: 'tshirt',name: 'Stellar T-Shirt',
      price: 10.99
    })
    .expect(function(res) {
      expect(res.body).to.exist;
    }).end(done)
  })
})

describe('/clothes/:id', function(){
  it('should respond with a 200', function(done) {
    spDB.insert({ category: 'tshirt',name: 'Stellar T-Shirt', price: 10.99,  _id: '5772db6067a73829c4a9054b'}, function(err, data) {});
    request(app).get('/clothes/5772db6067a73829c4a9054b').expect(200,done)
  })

  it('should return an object matching the given ID', function(done) {
    spDB.insert({ category: 'tshirt',name: 'Stellar T-Shirt', price: 10.99,  _id: '5772db6067a73829c4a9054b'}, function(err, data) {});
    request(app).get('/clothes/5772db6067a73829c4a9054b').expect(function(res) {
      expect(res.body._id).to.equal('5772db6067a73829c4a9054b')
    }).end(done);
  })
  it('should update an object', function(done) {
    spDB.insert({ category: 'tshirt',name: 'Stellar T-Shirt', price: 10.99,  _id: '5772db6067a73829c4a9054b'}, function(err, data) {});
    request(app).put('/clothes/5772db6067a73829c4a9054b')
    .send({ category: 'tshirt',name: 'Stellar T-Shirt', price: 13.99,  _id: '5772db6067a73829c4a9054b'})
    .expect(function(res) {
      expect(res.body).to.exist
      expect(res.body.nModified).to.equal(1)
    }).end(done)
  })


})
