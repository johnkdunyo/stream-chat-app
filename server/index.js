const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/auth')


const app = express();

const PORT = process.env.PORT || 3001;
console.log(PORT)


// middle wares
app.use(cors());
app.use(express.json())
app.use(express.urlencoded())

app.use(authRouter);


//defautl route
app.get('/', (req, res) => {
    res.send( 'Welcome dude')
});



app.listen(PORT, ()=> {
    console.log(`Server running on PORT ${PORT} successfully`)
});
