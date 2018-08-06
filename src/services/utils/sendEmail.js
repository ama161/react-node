import express from 'express';
import db from '../../database';
const router = express.Router();
const connection = db();

var jwt = require('jsonwebtoken'); 
var Cryptr = require('cryptr'); 
var nodemailer = require('nodemailer');

var secrets = require('../config/secret');
var cryptr = new Cryptr(secrets.cryptSecret);
import {generateToken} from './token';

const url = 'http://localhost:3003';

function send(mailOptions){
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
				user: 'ama161@gcloud.ua.es',
				pass: 'super10mas'
		}
	});
	
	transporter.sendMail(mailOptions, function(err, info){
		if(err){
			console.log(err);
		}else{
			console.log('Email enviado correctamente');
			console.log(info);
		}
	})
}

export function sendEmailAdmin(req, res, callback){
	var mail = req.email;
	var idU = req.id_user;
	var enlace = url + '/#/login';
	var mailOptions ={
		from: 'info@gmail.com',
		to: mail,
		subject: 'Bievenido '+email,
		html: "<h1>Bienvenido "+email+"!</h1><p> Has sido aceptado para formar parte de nuesta plataforma!<br> Para continuar con tu registro sigue el enlace siguiente: <a href='"+enlace+"'> iniciar sesión</a><br> Gracias por confiar en nosostros."
	};

	send(mailOptions);
}

export function sendEmailStudent(req, res, callback){
	var mail = req.email;
	var idU = req.id_user;
	generateToken(idU, (result) => {
		if(result.hasOwnProperty('token')){
			var enlace = url + '/#/register2?' + result.token + '?' + idU;
			var mailOptions ={
				from: 'info@gmail.com',
				to: mail,
				subject: 'Bievenido',
				html: "<h1>Bienvenido "+mail+"!</h1><p>Has sido registrado como estudiante en nuestra plataforma!<br> Para continuar con tu registro sigue el enlace siguiente: <a href='"+enlace+"'> iniciar sesión</a><br> Gracias por confiar en nosostros."
			};

			send(mailOptions);
		}
	});
}

export function sendEmailTeacher(req, callback){
	var mail = req.email;
	var idU = req.id_user;
	generateToken(idU, (result) => {
		if(result.hasOwnProperty('token')){
			var enlace = url + '/#/register2?' + result.token + '?' + idU;
			send({
				from: 'info@gmail.com',
				to: mail,
				subject: 'Bievenido',
				html: "<h1>Bienvenido "+mail+"!</h1><p>Has sido registrado como profesor en nuestra plataforma!<br> Para continuar con tu registro sigue el enlace siguiente: <a href='"+enlace+"'> iniciar sesión</a><br> Gracias por confiar en nosostros."
			});
		}
	});
}

export function sendEmailParent(req, res, callback){
	var mail = req.email;
	var idU = req.id_user;
	generateToken(idU, (result) => {
		if(result.hasOwnProperty('token')){
			var enlace = url + '/#/register2?' + result.token + '?' + idU;
			var mailOptions ={
				from: 'info@gmail.com',
				to: mail,
				subject: 'Bievenido',
				html: "<h1>Bienvenido "+mail+"!</h1><p>Has sido registrado como padre en nuestra plataforma!<br> Para continuar con tu registro sigue el enlace siguiente: <a href='"+enlace+"'> iniciar sesión</a><br> Gracias por confiar en nosostros."
			};

			send(mailOptions);
		}
	});
}