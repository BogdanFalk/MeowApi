const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');

// Connection to MongoDB
mongoose.connect('mongodb+srv://bogdan37falk:Erassus.123@meowtest.gtennjs.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error(err);
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session configuration
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://bogdan37falk:Erassus.123@meowtest.gtennjs.mongodb.net/?retryWrites=true&w=majority' })
}));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Registration route
app.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send({ user });
 } catch (err) {
        if (err.code === 11000) {
            // This error code is for duplicate key (unique constraint violation)
            res.status(400).send({ error: 'Email is already registered.' });
        } else {
            res.status(400).send(err);
        }
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: 'User not found!' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ error: 'Password is incorrect!' });
        }
        req.session.userId = user._id;
        res.send({ user });
    } catch (error) {
        res.status(400).send(error);
    }
});
