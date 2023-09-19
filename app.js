const express = require("./node_modules/express");
const cors = require("./node_modules/cors");
const configureDb = require("./Database/db");
const brandCtlr = require("./MVC/controllers/BrandController");
const userCtlr = require("./MVC/controllers/UserController");
const categoryctlr = require("./MVC/controllers/CategoryController");
const productCtlr = require("./MVC/controllers/ProductController");
const spareCtlr = require("./MVC/controllers/SpareControllers");
const cartCtlr = require("./MVC/controllers/CartController");
const couponCtlr = require("./MVC/controllers/CouponController");
const enquiryCtlr = require("./MVC/controllers/EnquiryController");
const serviceCtlr = require("./MVC/controllers/ServiceController");
const orderCtlr = require('./MVC/controllers/OrderController')
const mailer = require('./nodeMailer/config')
const notificationController = require('./MVC/controllers/NotificationController')
const message = require('./twilio/configMessage')
const subCategoryCtlr = require('./MVC/controllers/SubCategoryController')
const stripeMethod = require('./Payment/stripe')
const review = require("./MVC/controllers/ReviewController");
const fs = require("fs");
const AuthenticateUser = require("./Middlewer/Authentication");
const multer = require("multer");
const Authorization = require("./Middlewer/Authorization");
const Authorize = require("./Middlewer/Authorization");
const reviewCtlr = require("./MVC/controllers/ReviewController");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

configureDb();





//user api
app.post("/api/register", userCtlr.register);
app.post("/api/login", userCtlr.login);
app.get(
  "/api/account",
  AuthenticateUser,
  (req, res, next) => {
    req.permittedRole = ["admin", "user"];
    next();
  },
  Authorization,
  userCtlr.account
);
app.post('/api/loginverification',userCtlr.verify)
app.get('/api/getusers',AuthenticateUser,
(req, res, next) => {
  req.permittedRole = ["admin", "user"];
  next();
},
Authorization,userCtlr.displayUsers)
app.patch('/api/updaterole/:id',AuthenticateUser,
(req, res, next) => {
  req.permittedRole = ["admin"];
  next();
},
Authorization,userCtlr.changeRole)
app.post('/api/findemail',userCtlr.findEmail)
app.get('/api/usersforname',userCtlr.displayUsers)

//brand api
app.post(
  "/api/createbrand",
  AuthenticateUser,
  (req, res, next) => {
    req.permittedRole = ["admin"];
    next();
  },
  Authorization,
  brandCtlr.create
);
app.delete(
  "/api/deletebrand/:id",
  AuthenticateUser,
  (req, res, next) => {
    req.permittedRole = ["admin"];
    next();
  },
  Authorization,
  brandCtlr.delete
);
app.get("/api/getbrands",brandCtlr.get)

//category api

app.post(
  "/api/createcategory",
  AuthenticateUser,
  (req, res, next) => {
    req.permittedRole = ["admin"];
    next();
  },
  Authorization,
  categoryctlr.create
);
app.delete(
  "/api/deletecategory/:id",
  AuthenticateUser,
  (req, res, next) => {
    req.permittedRole = ["admin"];
    next();
  },
  Authorization,
  categoryctlr.delete
);
app.get("/api/getcategory",categoryctlr.get)

//Product api


const storage = multer.memoryStorage()


const upload = multer({ storage});

app.post(
  "/api/createproduct",
  AuthenticateUser,
  (req, res, next) => {
    req.permittedRole = ["admin"];
    next();
  },
  Authorization,
  upload.single('file'),
  productCtlr.create
);
app.delete(
  "/api/deleteproduct/:id",
  AuthenticateUser,
  (req, res, next) => {
    req.permittedRole = ["admin"];
    next();
  },
  Authorization,
  productCtlr.delete
);
app.patch(
  "/api/updateproduct/:id",
  AuthenticateUser,
  (req, res, next) => {
    req.permittedRole = ["admin"];
    next();
  },
  Authorization,
  productCtlr.update
);
app.patch("/api/updatequantityproduct/:id",productCtlr.deleteQuantity)
app.get("/api/getproduct", productCtlr.get);
app.get("/api/getoneproduct/:id",productCtlr.getOne)

//Spare-Parts api

app.post(
  "/api/createspare",
  AuthenticateUser,
  (req, res, next) => {
    req.permittedRole = ["admin"];
    next();
  },
  Authorization,
  upload.single("file", 1),
  spareCtlr.create
);
app.patch(
  "/api/updatespare/:id",
  AuthenticateUser,
  (req, res, next) => {
    req.permittedRole = ["admin"];
    next();
  },
  Authorization,
  spareCtlr.update
);
app.delete(
  "/api/deletespare/:id",
  AuthenticateUser,
  (req, res, next) => {
    req.permittedRole = ["admin"];
    next();
  },
  Authorization,
  spareCtlr.delete
);
app.get("/api/getspares", spareCtlr.get);
app.get("/api/getspares/:id", spareCtlr.getOne);
app.get("/api/getdetails",spareCtlr.getDetails)

//Cart-Model
app.post("/api/addproductscart", cartCtlr.add);
app.patch("/api/updateproductscart/:id", cartCtlr.update);
app.delete("/api/deleteproductscart/:id", cartCtlr.delete);
app.get("/api/getcartdetails",cartCtlr.get);
app.get("/api/getcartdetails/:id",cartCtlr.find)
app.delete("/api/deleteafterpayment/:id",cartCtlr.deleteAfterPayment)

//Coupon
app.post(
  "/api/createcoupon",
  AuthenticateUser,
  (req, res, next) => {
    req.permittedRole = ["admin"];
    next();
  },
  Authorization,
  couponCtlr.create
);
app.delete(
  "/api/deletecoupon/:id",
  AuthenticateUser,
  (req, res, next) => {
    req.permittedRole = ["admin"];
    next();
  },
  Authorization,
  couponCtlr.delete
);

//Reviews
app.post(
  "/api/createreview",
  AuthenticateUser,
  (req, res, next) => {
    req.permittedRole = ["admin", "user"];
    next();
  },
  Authorize,
  reviewCtlr.create
);
app.delete(
  "/api/deletereview/:id",
  AuthenticateUser,
  (req, res, next) => {
    req.permittedRole = ["admin"];
    next();
  },
  Authorize,
  reviewCtlr.delete
);
app.get(
  "/api/getreview/:id",
  reviewCtlr.get
);

//Service
app.post(
  "/api/createservice",
  AuthenticateUser,
  (req, res, next) => {
    req.permittedRole = ["user", "admin"];
    next();
  },
  Authorization,
  serviceCtlr.create
);
app.patch(
  "/api/updateservice/:id",
  AuthenticateUser,
  (req, res, next) => {
    req.permittedRole = ["staff", "admin"];
    next();
  },
  Authorization,
  serviceCtlr.update
);
app.get("/api/getservices/:id", AuthenticateUser,
(req, res, next) => {
  req.permittedRole = ["staff", "admin","user"];
  next();
},
Authorization,serviceCtlr.get)

app.get("/api/getservices", AuthenticateUser,
(req, res, next) => {
  req.permittedRole = ["staff", "admin"];
  next();
},
Authorization,serviceCtlr.display)

app.patch("/api/updatepayment/:id",
AuthenticateUser,
(req, res, next) => {
  req.permittedRole = ["user"];
  next();
},
Authorization,serviceCtlr.updatePayment)

//Enquiry
app.post("/api/createenquiry", enquiryCtlr.create);
app.delete(
  "/api/enquirydelete/:id",
  AuthenticateUser,
  (req, res, next) => {
    req.permittedRole = ["admin", "staff"];
    next();
  },
  Authorization,
  enquiryCtlr.delete
);
app.get("/api/getenquiry",AuthenticateUser,
(req, res, next) => {
  req.permittedRole = ["admin"];
  next();
},
Authorization,enquiryCtlr.get)

app.listen(process.env.port, () => {
  console.log("listening on port:", process.env.port);
});


//Order-Data
app.post('/api/createorder',AuthenticateUser,
(req, res, next) => {
  req.permittedRole = ["admin", "staff","user"];
  next();
},
Authorization,orderCtlr.create)

app.patch('/api/updateorder/:id',AuthenticateUser,
(req, res, next) => {
  req.permittedRole = ["admin", "staff","user"];
  next();
},
Authorization,orderCtlr.update)

app.delete('/api/delete/:id',AuthenticateUser,
(req, res, next) => {
  req.permittedRole = ["admin", "staff"];
  next();
},
Authorization,orderCtlr.update)

app.get('/api/getdata',AuthenticateUser,
(req, res, next) => {
  req.permittedRole = ["admin", "staff"];
  next();
},
Authorization,orderCtlr.get)

app.get('/api/getonedata/:id',AuthenticateUser,
(req, res, next) => {
  req.permittedRole = ["admin", "staff","user"];
  next();
},
Authorization,orderCtlr.getOne)

//Sub-Category

app.post('/api/createsubcategory',AuthenticateUser,
(req, res, next) => {
  req.permittedRole = ["admin", "staff"];
  next();
},
Authorization,subCategoryCtlr.create)

app.delete('/api/deletesubcategory/:id',AuthenticateUser,
(req, res, next) => {
  req.permittedRole = ["admin", "staff"];
  next();
},
Authorization,subCategoryCtlr.delete)
app.get('/api/getsubcategory',subCategoryCtlr.get)

//mailer
app.post('/api/sendmail',AuthenticateUser,
(req, res, next) => {
  req.permittedRole = ["admin"];
  next();
},
Authorization,mailer.create)

//message

app.post('/api/sendmessage',AuthenticateUser,
(req, res, next) => {
  req.permittedRole = ["admin"];
  next();
},
Authorization,message.create)

//notification
app.post('/api/createnotification',notificationController.createNotification)
app.get('/api/getnotification',notificationController.getNotification)
app.patch('/api/updatenotification/:id',notificationController.update)

//payment
app.post("/api/create-checkout-session",stripeMethod.checkout)