const express = require('express');
const router = express.Router();

// DAO and utils
const CategoryDAO = require('../models/CategoryDAO');
const ProductDAO = require('../models/ProductDAO');
const CustomerDAO = require('../models/CustomerDAO');
const randomStringUtil = require('../utils/RandomString');
const EmailUtil = require('../utils/Email');
const JwtUtil = require('../utils/JwtUtil');
const OrderDAO = require('../models/OrderDAO');

// import bcrypt
const bcrypt = require('bcrypt');





// category customer
  router.get('/categories', async function (req, res) {
    const categories = await CategoryDAO.selectAll();
    res.json(categories);
  });
  // product new customer
  router.get('/products/new', async function (req, res) {
    const products = await ProductDAO.selectTopNew(3);
    res.json(products);
  });
  
  // product hot customer
  router.get('/products/hot', async function (req, res) {
    const products = await ProductDAO.selectTopHot(3);
    res.json(products);
  });
  
  // category products customer
  router.get('/products/category/:cid', async function(req, res) {
      const _cid = req.params.cid;
      const products = await ProductDAO.selectByCatId(_cid);
      res.json(products);
  });
  
  // products search customer
  router.get('/products/search/:keyword', async function(req, res) {
      const keyword = req.params.keyword;
      const products = await ProductDAO.selectByKeyword(keyword);
      res.json(products);
  });
  
  // products detail customer
  router.get('/products/:id', async function (req, res) {
      const _id = req.params.id;
      const products = await ProductDAO.selectById(_id);
      res.json(products);
  });
  
  // signup customer
  router.post('/signup', async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const dbCust = await CustomerDAO.selectByUsernameOrEmail(username, email);
    if (dbCust) {
      res.json({ success: false, message: 'Exists username or email' });
    } else {
      let passwordHash = '';
      const saltRounds = 5;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, async function(err, hash) {
            passwordHash = hash;
            const code = randomStringUtil.genStringNumber();
            const newCust = { username: username, password: passwordHash, name: name, phone: phone, email: email, active: 0, code: code };
            const result = await CustomerDAO.insert(newCust);
            if (result) {
              const send = await EmailUtil.send(email, username, code);
              if (send) {
                res.json({ success: true, message: 'Please check your email' })
              }else {
                res.json({ success: false, message: 'Email failure' })
              }
            }else {
              res.json({ success: false, message: 'Insert failure' })
            }
        });
      });
    }
  });
  
  // active customer
  router.post('/active', async function(req, res) {
    const username = req.body.username;
    const code = req.body.code;
    const result = await CustomerDAO.active(username, code, 1);
    if(result) {
        res.json({ status: 200, success: true , message: 'Your account is active', result: result  });
    }else {
        res.json({ status: 401, success: false, message: 'Username or code incorrect'});
    }
  });
  
  // login - logout customer
  router.post('/login', async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      const customer = await CustomerDAO.selectByUsernameAndPassword(username, password);
        if (customer) {
            const matchPassword = await bcrypt.compare(password, customer.password);
            if(matchPassword) {
                if (customer.active === 1) {
                    const token = JwtUtil.generateTokenAccess();
                    res.json({ stauts: 200, success: true, message: 'Authentication successful', token: token, customer: customer });
                } else {
                    res.json({ status: 401, success: false, message: 'Account is decactive' });
                }
            }else {
                res.json({ status: 400, success: false, message: 'Incorrect username or password' })
            }
        }else {
        res.json({ status: 400, success: false, message: 'Account does not exist' });
      }
    } else {
      res.json({ status: 400, success: false, message: 'Please input username or password' });
    }
  });
  
  router.get('/token', JwtUtil.checkTokenAccess, function (req, res) {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    res.json({ status:200, success: true, message: 'Token is valid', token: token });
  });
  
  // update profile customer
  router.put('/profile/:id', JwtUtil.checkTokenAccess, async function(req, res) {
    const _id = req.params.id;
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    let passwordHash = '';
    const saltRounds = 5;
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, async function(err, hash) {
            passwordHash = hash;
            const customer = { _id: _id, username: username, password: passwordHash, name: name, phone: phone, email: email };
            const result = await CustomerDAO.update(customer);
            if(result) {
                res.json({ status: 200, success: true, message: 'Update profile success', result: result} );
            }else {
                res.json({ stauts: 401, success: false, message: 'Please input your profile' });
            }
        });
    });
  });
  
  // Order products
  router.post('/checkout', JwtUtil.checkTokenAccess, async function(req, res) {
      const now = new Date().getTime();
    const total = req.body.total;
    const items = req.body.items;
    const customer = req.body.customer;
    const order = { cdate: now, total: total, status: 'PENDING', customer: customer, items: items };
    const result = await OrderDAO.insert(order);
    res.json(result);
});

// order customer
router.get('/orders/customer/:cid', JwtUtil.checkTokenAccess, async function(req, res) {
    const _cid = req.params.cid;
    const orders = await OrderDAO.selectByCustId(_cid);
    res.json(orders);
});
module.exports = router;