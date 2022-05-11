const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.profile = user; //now user data goes to the req.profile
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;  // in profile we don't want to show salt value or password to the logged in user 
  req.profile.encry_password = undefined; // or other value like date we only show data that is usefull for the user 
  req.profile.updatedAt = undefined;
  req.profile.createdAt = undefined;
  return res.json(req.profile);
};

// exports.getAllUser = (req, res) => {
//   User.find().exec((err, users) => {
//     if(err || !users) {
//       return res.json({
//         error: "no user found"
//       });
//     }
//     res.json(users);
//   });
// };

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(      
    { _id: req.profile._id },
    { $set: req.body }, // updated values goes in the $set (data from the front end)
    { new: true, useFindAndModify: false }, //must use
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user"
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);   // same process as above
    }
  );
};

exports.userPurchaseList = (req, res) => { ///this is fetched from the order model
  Order.find({ user: req.profile._id }) // this will find the user in the db
    .populate("user", "_id name") // and this helps to fetch the id name of that user in the 
    .exec((err, order) => { // with the help of this we also fetch the order array from the db to front end
      if (err) {
        return res.status(400).json({
          error: "No Order in this account"
        });
      }
      return res.json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => { // this is a middleware
  let purchases = []; // this is an array
  req.body.order.products.forEach(product => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id
    });
  });

  //store thi in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } }, //the push is used by front end to push the information
    { new: true }, //from the db send me back the object that is updated one not the old one.
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list"
        });
      }
      next();
    }
  );
};
