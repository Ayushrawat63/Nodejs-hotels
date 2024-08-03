const mongoose = require("mongoose");
const data = require("../DB");
const bcrypt=require('bcrypt');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    required: true,
    enum: ['chef','manager', 'waiter'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
  },
  username:{
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  }

});

userSchema.pre('save', async function(next){
    const user= this;
    if(!user.isModified('password')) return next();
    try{
       const  salt=await bcrypt.genSalt(10);
       const hashpassword= await bcrypt.hash(user.password,salt)
       user.password=hashpassword;
       next();
    }
    catch(err){
      return next(err)
    }

},)

userSchema.methods.comparePassword =  function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

const AllUser = mongoose.model("AllUser", userSchema);

module.exports = AllUser;

