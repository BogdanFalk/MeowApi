const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (email) => {
                const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(email);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (password) => {
                // At least one uppercase, one number, one special character, min 8 characters
                console.log(password);
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                console.log(passwordRegex.test(password));
                return passwordRegex.test(password);
            },
            message: () => `Password should have at least one uppercase character, one number, and one special character, and be minimum 8 characters long.`
        }
    },
    age: Number,
    birthday: Date,
    prefix: {type: Number, required: true},
    phone: {type: String, required: false},
    imageUrl: String
});

// Hashing password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

userSchema.pre('findOneAndUpdate', async function(next) {
    const update = this.getUpdate();
    if (update.password) {
        update.password = await bcrypt.hash(update.password, 8);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
