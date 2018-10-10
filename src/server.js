import express from 'express';
import morgan from 'morgan';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config';

import usersRoutes from './services/users';
import loginRoutes from './services/login';
import classRoutes from './services/class';
import centerRoutes from './services/center';
import dossierRoutes from './services/dossiers';
import subjectRoutes from './services/subject';
import testRoutes from './services/test';
import questionRoutes from './services/question';
import calendarRoutes from './services/calendar';
import notificationRoutes from './services/notification';
import calendarWeekRoutes from './services/calendarWeek';

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
app.use('/api/dossier', dossierRoutes);
app.use('/api/subject', subjectRoutes);
app.use('/api/test', testRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/calendarWeek', calendarWeekRoutes);

//start server
app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});