//imorting the dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; //cros origin resource sharing. 
                        //allows to make request from one website to another website in the browser,
                        //which is normally prohibited because of SOP


import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

app.use(express.urlencoded({extended : true}));
app.use(express.json({ limit: "30mb", extended: true}));
app.use(cors());


app.use('/posts', postRoutes);

//connecting to mongodb
//const CONNECTION_URL = 'mongodb+srv://mdmostafa:mdmostafa@nodejs-authentication.4tkhl.mongodb.net/test?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

//using mongoose to connect to our database
mongoose.connect(process.env.CONNECTION_URL, { 
    useNewUrlParser : true,
    useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));


mongoose.set('useFindAndModify', false);