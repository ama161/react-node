import express from 'express';
import morgan from 'morgan';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config';

import usersRoutes from './services/users';
import loginRoutes from './services/login';
import classRoutes from './services/class';
import centerRoutes from './services/center';

//init packages
const app = express();

//settings server
app.set('port', process.env.PORT || 3003);

//middleware
app.use(morgan('dev'));
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(express.json());

//routes
app.get('/api', (req, res)=>{
    res.send('Welcome to my API!');
});

app.use('/api/users', usersRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/class', classRoutes);
app.use('/api/center', centerRoutes);

//start server
app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});