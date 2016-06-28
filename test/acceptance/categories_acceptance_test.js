var http = require('http')
var server;
var expect = require('chai').expect
var db = require('../../conf/db')
var spDB = db.get('tshirtspants')

before(function() {
  server = http.createServer(require('../../app'));
  browser.baseUrl = "http://localhost:3000/clothes"
  server.listen(0);
});

beforeEach(function() {
  spDB.drop();
  return browser.ignoreSynchronization = true;
})

after(function() {
  server.close();
});

describe('/', function() {
  it('displays the page title', function() {
    browser.get(browser.baseUrl + '/')
    element(by.tagName('h1')).getText().then(function(text) {
      expect(text).to.equal('Our Store');
    });
  });

  it('shows a form to create products', function() {
    browser.get(browser.baseUrl + '/')
    element(by.id('product-form')).getText().then(function(text){
      expect(text).to.equal('New Product Form');
    });
  });
  it('shows needed elements of form', function() {
    browser.get(browser.baseUrl + '/')
    element(by.id('productName')).getAttribute('placeholder').then(function(text){
      expect(text).to.equal('Enter a Product Name');
    });
    element(by.id('price')).getAttribute('placeholder').then(function(text){
      expect(text).to.equal('Enter a value');
    });
    element(by.id('category1')).getAttribute('type').then(function(text){
      expect(text).to.equal('radio');
    });
  });
  it('displays a product on the product list once the "create" button is clicked', function() {
    browser.get(browser.baseUrl + '/');
    element(by.id('productName')).sendKeys('Cat Shirt');

    element(by.id('price')).sendKeys(20.99);

    element(by.id('category1')).click();

    element(by.id('productSubmit')).click().then(function() {
      element(by.tagName('li')).getText().then(function(text) {
        expect(text).to.equal('Cat Shirt - $20.99')
      })
    })
  });

});
