const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const postRoutes = require('./src/routes/postRoutes');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//middleware
app.get('/' , (req, res)=>{
    res.status(200).json({
        success: true ,
        message: "API is working of this database"
    });
});
//routes
app.use('/api/auth' , authRoutes);
app.use('/api/posts' , postRoutes);
module.exports = app ;
