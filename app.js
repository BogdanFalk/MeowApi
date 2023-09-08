const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");

// Connection to MongoDB
mongoose
  .connect(
    "mongodb+srv://bogdan37falk:Erassus.123@meowtest.gtennjs.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session configuration
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://bogdan37falk:Erassus.123@meowtest.gtennjs.mongodb.net/?retryWrites=true&w=majority",
    }),
  })
);

const userRoutes = require("./routes/userRoutes");
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// ... [connection to MongoDB and other middleware]

app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use('/reviews', reviewRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
