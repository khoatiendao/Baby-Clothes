const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptUtil = require('../utils/BCrypt');
// const cryptoUtil = require('../utils/Crypto');
const randomStringUtil = require('../utils/RandomString');
const emailUtil = require('../utils/Email');
// utils
const JwtUtil = require('../utils/JwtUtil');
// daos
const AdminDAO = require('../models/AdminDAO');
const CategoryDAO = require('../models/CategoryDAO');
const ProductDAO = require('../models/ProductDAO');
const CustomerDAO = require('../models/CustomerDAO');
const OrderDAO = require('../models/OrderDAO');


// Insert account admin
router.post('/signup-admin' ,async function(req, res) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const checkEmailDB = await AdminDAO.selectByEmail(email);
    if(checkEmailDB) {
      res.json({ status: 200, success: false, message: 'Exists email'});
    }else {
      let passwordHash = '';
      const saltRounds = 5;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, async function(err, hash) {
            passwordHash = hash;
            const code = randomStringUtil.genStringNumber();
            const newAdmin = {email: email, username: username, password: passwordHash, active: 0, code: code};
            const result = await AdminDAO.insertAdmin(newAdmin);
            if(result) {
              const send = await emailUtil.send(email, username, code);
              if (send) {
                res.json({ status: 200, success: true, message: 'Please check your email'});
              }else {
                res.json({ status: 400, success: false, message: 'Email exists'});
              }
            } else {
              res.json({ status: 401, success: false, message: 'Create account admin refuse'});
            }
        });
      })
    }
});

// active admin
router.post('/active', async function(req, res) {
  const username = req.body.username;
  const code = req.body.code;
  const result = await AdminDAO.active(username, code, 1);
  if(result) {
    res.json({ status: 200, success: true, message: 'Your account is active', result: result })
  }else {
    res.json({ status: 401, success: false, message: 'Username or code incorrect' })
  }
});

// Login
router.post('/login', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  if(username && password) {
    const admin = await AdminDAO.selectByUsernameAndPassword(username, password);
    if(admin) {
      const matchPassword = await bcrypt.compare(password, admin.password);
      if(matchPassword) {
        if(admin.active === 1) {
          const token = JwtUtil.generateTokenAccess();
          res.json({ status: 200 ,success: true, message: 'Authentication successful', token: token, admin: admin });
        } else {
          res.json({ status: 401, success: false, message: 'Your account not active' });
        }
      } else {
        console.log(admin);
        res.json({ status: 200, success: false, message: 'Incorrect username and password' })
      }
    } else {
      res.json({ status: 401, success: false, message: 'username does not exist' })
    }
  }else {
    res.json({ status: 400, success: false, message: 'Please input your username and password' });
  }
});

// update profile admin
router.put('/profile/:id', JwtUtil.checkTokenAccess, async function(req, res) {
  const _id = req.params.id;
  const username = req.body.username;
  const password = req.body.password;
  let passwordHash = '';
  const saltRounds = 5;
  bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, async function(err, hash) {
          passwordHash = hash;
          const admin = { _id: _id, username: username, password: passwordHash };
          const result = await AdminDAO.update(admin);
          if(result) {
              res.json({ status: 200, success: true, message: 'Update profile success', result: result} );
          }else {
              res.json({ stauts: 401, success: false, message: 'Please input your profile' });
          }
      });
  });
});

// Check Token
router.get('/token', JwtUtil.checkTokenAccess, function (req, res) {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  res.json({ success: true, message: 'Token is valid', token: token });
});

// Category
router.get('/categories', JwtUtil.checkTokenAccess, async function(req, res) {
  const categories = await CategoryDAO.selectAll();
  res.json(categories);
});

router.post('/add-category', JwtUtil.checkTokenAccess, async function(req, res) {
  const name = req.body.name;
  const category = { name: name };
  const result = await CategoryDAO.insert(category);
  res.json(result );
});

router.put('/category/:id', JwtUtil.checkTokenAccess, async function(req, res) {
  const _id = req.params.id;
  const name = req.body.name;
  const category = { _id: _id, name: name };
  const result = await CategoryDAO.update(category);
  res.json(result);
});

router.delete('/category/:id', JwtUtil.checkTokenAccess, async function(req, res) {
  const _id = req.params.id;
  const result = await CategoryDAO.delete(_id);
  res.json(result);
});

// Product
router.get('/products', JwtUtil.checkTokenAccess, async function(req, res) {
  var products = await ProductDAO.selectAll();
  const sizePage = 4;
  const noPage = Math.ceil(products.length / sizePage);
  var curPage = 1;
  if (req.query.page) curPage = parseInt(req.query.page);
  const offSet = (curPage - 1) * sizePage;
  products = products.slice(offSet, offSet + sizePage);
  const result = { products: products, noPage: noPage, curPage: curPage };
  res.json(result);
});

router.post('/add-products', JwtUtil.checkTokenAccess, async function(req, res) {
  const name = req.body.name;
  const price = req.body.price;
  const cid = req.body.category;
  const image = req.body.image;
  const now = new Date().getTime();
  const category = await CategoryDAO.selectById(cid);
  const product = { name: name, price: price, image: image, cdate: now, category: category };
  const result = await ProductDAO.insert(product);
  res.json(result);
});

router.put('/products/:id', JwtUtil.checkTokenAccess, async function(req, res) {
  const _id = req.params.id;
  const name = req.body.name;
  const price = req.body.price;
  const cid = req.body.category;
  const image = req.body.image;
  const now = new Date().getTime();
  const category = await CategoryDAO.selectById(cid);
  const product = { _id: _id, name: name, price: price, image: image, cdate: now, category: category  };
  const result = await ProductDAO.update(product);
  res.json(result);
});

router.delete('/products/:id', JwtUtil.checkTokenAccess, async function(req, res) {
  const _id = req.params.id;
  const result = await ProductDAO.delete(_id);
  res.json(result);
});

// Order

router.get('/orders', JwtUtil.checkTokenAccess, async function(req, res) {
  const orders = await OrderDAO.selectAll();
  res.json(orders);
});

router.put('/orders/status/:id', JwtUtil.checkTokenAccess, async function(req, res) {
  const _id = req.params.id;
  const newStatus = req.body.status;
  const result = await OrderDAO.update(_id, newStatus);
  res.json(result);
});

router.get('/list/customers', JwtUtil.checkTokenAccess, async function(req, res) {
  const customers = await CustomerDAO.selectAll();
  res.json(customers);
});

router.get('/orders/list/customer/:cid', JwtUtil.checkTokenAccess, async function(req, res) {
  const _cid = req.params.cid;
  const orders = await OrderDAO.selectByCustId(_cid);
  res.json(orders);
});

router.put('/customers/deactive/:id', JwtUtil.checkTokenAccess, async function(req, res) {
  const _id = req.params.id;
  const code = req.body.code;
  const result = await CustomerDAO.deactive(_id, code, 0);
  res.json(result);
});

router.get('/customer/sendmail/:id', JwtUtil.checkTokenAccess, async function(req, res) {
  const _id = req.params.id;
  const cust = await CustomerDAO.selectById(_id);
  if(cust) {
    const send = await emailUtil.send(cust.email, cust.username, cust.code);
      if(send) {
          res.json({ success: true, message: 'Please check email' });
      }else {
        res.json({ success: false, message: 'Email failure' });
      }
  }else {
    res.json({ success: false, message: 'Not exists customer' });
  }
});
module.exports = router;