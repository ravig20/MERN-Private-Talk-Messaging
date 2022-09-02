const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsersSchema = new mongoose.Schema({
    pic: {
        public_id: String,
        url: String,    
    },
    name: {
        type: String,
        required: [true, "name is required "],
    },
    phone:{
        type: Number,
        required: [true, "phone number is required "],
        unique: [true, "email already exist"]
    },
    email: {
        type: String,
        required: [true, "email is required "],
        unique: [true, "email already exist"]
    },
    password: {
        type: String,
        required: [true, "password is required "],
        minLength: [6, "password must be at least 6 characters"],
        select: false,
    },
    caption:{
        type: String,
    },
    isowner:{
        type:Boolean,
        default: false,

    }, 
    isStar:{
        type: Boolean,
        default: false,
    },
},
{
    timeStamps:true,
}
);
// create hash password
UsersSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
const Users = mongoose.model('Users',UsersSchema);
module.exports = Users