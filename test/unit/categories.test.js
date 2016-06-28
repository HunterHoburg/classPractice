var request = require('supertest')
var expect = require('chai').expect
var app = require('../../app')
var db = require('../../conf/db')
var spDB = db.get('categories')


afterEach(function(done) {
  spDB.drop();
  done()
})

describe('/categories', function(){
  it('should respond with a 200', function(done) {
    request(app).get('/categories').expect(200,done)
  })
  it('should return a list of items in the database', function(done) {
    spDB.insert({ type: 'tshirt', _id: '5772db6067a73829c4a9054a'}, function(err, data) {});
    request(app).get('/categories').expect(function(res) {
      expect(res.body[0].type).to.equal('tshirt');
    }).end(done)
  })

  it('should respond with a 200 when posting to /categories', function(done) {
    request(app).post('/categories').expect(200,done);
  })
  it('should add item posted to the database', function(done) {
    request(app).post('/categories')
    .send({
      type: 'pants',
    })
    .expect(function(res) {
      expect(res.body).to.exist;
    }).end(done)
  })
})

describe('/categories/:id', function(){
  it('should respond with a 200', function(done) {
    spDB.insert({ type: 'tshirt', _id: '5772db6067a73829c4a9054a'}, function(err, data) {});
    request(app).get('/categories/5772db6067a73829c4a9054a').expect(200,done)
  })

  it('should return an object matching the given ID', function(done) {
    spDB.insert({ type: 'tshirt', _id: '5772db6067a73829c4a9054a'}, function(err, data) {});
    request(app).get('/categories/5772db6067a73829c4a9054a').expect(function(res) {
      expect(res.body._id).to.equal('5772db6067a73829c4a9054a')
    }).end(done);
  })
})
