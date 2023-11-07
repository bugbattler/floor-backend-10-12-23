const User = require("../../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// exports.signup = (req, res) => {
//   console.log(req.body)
//   User.findOne({ email: req.body.email }).exec(async (error, user) => {
//     if (user)
//       return res.status(400).json({
//         error: "Admin already registered",
//       });

//     const { firstName, lastName, email, password } = req.body;
//     // const hash_password = await bcrypt.hash(password, 10);
//     const _user = new User({
//       firstName,
//       lastName,
//       email,
//       password,
//       role: "admin"
//     });

//     _user.save((error, data) => {
//       if (error) {
//         return res.status(400).json({
//           message: "Something went wrong",
//         });
//       }
//       if(data){
//         return res.status(201).json({
//             message:"Admin created successfully",
//             user:data
//         })
//       }
//     });
//   });
// };

// exports.signin = (req, res) => {
//   User.findOne({ email: req.body.email }).exec(async (error, user) => {
//     if (error) return res.status(400).json({ error });
//     if (user) {
//       const isPassword = await user.authenticate(req.body.password);
//       if (isPassword && user.role==="admin") {
//         const token = jwt.sign({_id: user._id, role:user.role}, process.env.JWT_SECRET, { expiresIn:"1d"});
//         const { _id, firstName, lastName, email, role, fullName } = user;
//         res.status(200).json({
//           token,
//           user: { _id, firstName, lastName, email, role, fullName },
//         });
//       } else {
//         return res.status(400).json({
//           message: "Something went wrong",
//         });
//       }
//     } else {
//       return res.status(400).json({ message: "Something went wrong" });
//     }
//   });
// };
exports.signup = async (req, res) => {
  try {
    const find = await User.findOne({ email: req.body.email });
    if (find) {
      return res.status(400).json({
        error: "User already registered",
      });
    }
    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName, lastName, email, password, role:"admin"
    });
    _user
      .save()
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

exports.signin = async (req, res) => {
  try {
    let { email, password } = req.body;
    User.findOne({ email }).then(async (user) => {
      if (user) {
        const isPassword = await user.matchPassword(password);
        if (isPassword) {
          const token = await user.generateToken();
          const {
            _id,
            firstName, lastName, email
          } = user;
          res.cookie("token", token, { expiresIn: "1d" });
          res.status(200).json({
            token,
            user: {
              _id,
              firstName, lastName, email
            },
          });
        } else {
          return res.status(400).json({ message: "Invalid Password" });
        }
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
    });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
exports.getUser = async (req, res) => {
  try {
    const response = await User.find();
    const filter = response.filter((user) => user.role === "user");
    res.json(filter);
  } catch {
    (err) => res.json(err);
  }
};
