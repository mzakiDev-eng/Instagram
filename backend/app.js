const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./src/routes/authRoutes');
const postRoutes = require('./src/routes/postRoutes');
const likeRoutes = require('./src/routes/likeRoutes');
const commentRoutes = require('./src/routes/commentRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// serve uploaded post images
app.use('/uploads', express.static(path.join(__dirname, 'src', 'upload')));

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
app.use('/api/likes' ,likeRoutes);
app.use('/api/comments' , commentRoutes);


module.exports = app ;
