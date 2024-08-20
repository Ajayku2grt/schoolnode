const express =  require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnect');
const dotenv  = require('dotenv').config();
// require('./schedular1');
// require('./schedular2');

connectDB(); //databse
const app = express();

const port =  process.env.PORT;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use(errorHandler);


app.listen(port, () => {
    console.log('from port');
})