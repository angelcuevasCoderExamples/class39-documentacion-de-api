import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import __dirname from './utils/index.js';
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

const app = express();
const PORT = process.env.PORT||8080;
//mongodb://localhost:27017
const connection = mongoose.connect(`mongodb+srv://angelpablocuevas1989:EghP7p3eTEtgWPyu@codercluster.5ny2sqo.mongodb.net/test`)

app.use(express.json());
app.use(cookieParser());

//swagger-documentation 
const swaggerOptions = {
    definition:{
        openapi: '3.0.1',
        info: {
            title: "documetación de AdoptMe API",
            description: "API pensada para usar de ejemplo en la clase 39-swagger"
        }
    },
    apis: [`${__dirname}/../docs/**/*.yaml`]
}

const specs = swaggerJsDoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
