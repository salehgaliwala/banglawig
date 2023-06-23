const { console, prepare, errorHandler, isValid } = require('../../helpers');
const createError = require('http-errors');
const satelize = require('satelize');
const http = require('http');
const mysql = require('mysql');
const axios = require('axios');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');


const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'wigbd'
});
connection.connect();

// Function to execute a SQL query
	function executeQuery(query,response) {
	  return new Promise((resolve, reject) => {
	    connection.query(query, (err, results) => {
	      if (err) {
	        reject(err);
	      } else {
	        resolve(results);
	      }
	    });
	  });
	}

class UtilitiesController {
	constructor() {
		console('utilities controller created');
	}

	async updatedata(req, res,next){

		const apiEndpoint = 'https://api.exchangerate-api.com/v4/latest/USD'; // Replace with your desired API endpoint
		axios.get(apiEndpoint)
		  .then((response) => {
		    const rates = response.data.rates;
		    const usdToBdtRate = Math.round(rates['BDT']); // Replace 'EUR' with your desired currency code
		    console(`USD to BDT rate: ${usdToBdtRate}`);

		    // Add the currency rate to the MySQL database
		    const query = `UPDATE currency SET rate = ${usdToBdtRate} where currency_code ='BDT'`;
		    connection.query(query, (error, results, fields) => {
		      if (error) {
		        console('Error inserting currency rate into database:', error);
		      } else {
		        console('Currency rate added to database');
		        	
		      }
		    });
		  })
		  .catch((error) => {
		    console('Error retrieving currency rate:', error);
		  });
		   res.end('Currency rate added to database');
	
	}

	async getipdata(req, res,next){
		let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
		var https = require('https');

			const options = {
			  path: '/37.111.196.74/json/',
			  host: 'ipapi.co',
			  port: 443,
			  headers: { 'User-Agent': 'nodejs-ipapi-v1.02' }
			};
			https.get(options, function(resp){
			    var body = ''
			    resp.on('data', function(data){
			        body += data;
			    });

			    resp.on('end', function(){
			        var loc = JSON.parse(body);
			        if(loc.country_code == 'BD')
						{
							const sql = 'SELECT * FROM currency WHERE country_code = ?';
								connection.query(sql, ['BD'], function (error, results, fields) {
									  if (error) throw error;

									  // Log the result to the console
									  console(results[0]['rate']);
									  const responseData = {
										'currency': 'BDT',
										'currency_rate': results[0]['rate'],
										 }
										  const jsonContent = JSON.stringify(responseData);
				  				 		 res.end(jsonContent);
									});
							
							
						}
						else
						{
							const responseData = {
								'currency': '$',
								'currency_rate': '1',
								 }
								  const jsonContent = JSON.stringify(responseData);
		  				 res.end(jsonContent);
						}
			         //res.end(loc.country_code);
			    });
			});
  

	}


	async geodata(req, res,next){
			
		try{
			//const ip = req.connection.remoteAddress;
			let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
			console(`Client IP address: ${ip}`);
			satelize.satelize({ip:'37.111.196.74'}, function(err,payload){
				console(payload);
				
				if(payload === null)
				{
					const responseData = {
						'currency': '$',
						'currency_rate': '1',
						 }
						  const jsonContent = JSON.stringify(responseData);
  				 res.end(jsonContent);
				}
				else if(payload.country_code == 'BD')
				{
					const sql = 'SELECT * FROM currency WHERE country_code = ?';
						connection.query(sql, ['BD'], function (error, results, fields) {
							  if (error) throw error;

							  // Log the result to the console
							  console(results[0]['rate']);
							  const responseData = {
								'currency': 'BDT',
								'currency_rate': results[0]['rate'],
								 }
								  const jsonContent = JSON.stringify(responseData);
		  				 		 res.end(jsonContent);
							});
					
					
				}
				else
				{
					const responseData = {
						'currency': '$',
						'currency_rate': '1',
						 }
						  const jsonContent = JSON.stringify(responseData);
  				 res.end(jsonContent);
				}
				
				//result.country = payload.country_code;
				});

				
		}
		catch(err){
			console(err.message)
			return next(err);
		}
	}

	async sendmail(req, res,next){
		  const { username,fname,lname,phone,email,country,message,age,brole,blicense,bname } = req.body;
		  const transporter = nodemailer.createTransport({
		    host: 'sandbox.smtp.mailtrap.io',
		    port: 25,
		    secure: false,
		    auth: {
		      type:'login',	
		      user: 'c2df409030aa2f',
		      pass: '42a28770cb9887'
		    }
		    
		  });
		  
	    	const mailOptions = {
   			from: 'your-email@example.com',
    		to: 'recipient@example.com',
    				subject: 'New Contact Form Wholeseller',
    				text: `
      						User Name: ${username}
      						Last Name: ${lname}
      						First Name: ${fname}
      						Email: ${email}
      						Phone/Whatsapp: ${phone}
      						Country: ${country}
      						Business Name: ${bname}
      						Business Age: ${age}
      						Business Role: ${brole}
      						Business License: ${blicense}
      						Message: ${message}
								`
  				};
  			transporter.sendMail(mailOptions, (error, info) => {
	    	if (error) {
	    	  console('Error sending email:', error);
	      	  res.status(500).json({ message: 'An error occurred while sending the email' });
	        } else {
	          console('Email sent successfully');
	          res.status(200).json({ message: 'Email sent successfully' });
	        }
	  		});	
			console('email sent');
	}	
	async reviews(req, res,next){		
		
  		const query = 'SELECT * FROM reviews order by id';

		// Execute the query
		connection.query(query, (err, results) => {
			if (err) {
			console('Error executing query:', err);
			res.status(500).json({ error: 'Failed to retrieve reviews' });
			return;
			}

			res.json(results);
		});
	}

	async getreviewsbyproductid(req, res,next){
		const productId = req.params.productId;
  		const query = 'SELECT * FROM reviews WHERE productId = ?';

		// Execute the query
		connection.query(query, [productId], (err, results) => {
			if (err) {
			console('Error executing query:', err);
			res.status(500).json({ error: 'Failed to retrieve reviews' });
			return;
			}

			res.json(results);
		});
	}

	async getreviewsbyid(req, res,next){
		const id = req.params.id;
  		const query = 'SELECT * FROM reviews WHERE id = ?';

		// Execute the query
		connection.query(query, [id], (err, results) => {
			if (err) {
			console('Error executing query:', err);
			res.status(500).json({ error: 'Failed to retrieve reviews' });
			return;
			}

			res.json(results);
		});
	}
	async reviewsdelete(req, res,next){
		const id = req.params.id;
		  const query = 'DELETE FROM reviews WHERE id = ?';
		  connection.query(query, [id], (error, results) => {
		    if (error) {
		      console.error('Error executing MySQL query:', error);
		      res.status(500).json({ error: 'An error occurred' });
		      return;
		    }
		    res.json({ message: 'Record deleted successfully' });
		  });
	}
	async reviewsupdatedata(req, res,next){
		const id = req.params.id;
		  const { title, productId,description } = req.body; // Assuming the request body contains 'name' and 'email' properties
		  const query = 'UPDATE reviews SET title = ?, productId = ?, description = ? WHERE id = ?';
		  console(query);
		  connection.query(query, [title, productId, description, id], (error, results) => {
		    if (error) {
		      console.error('Error executing MySQL query:', error);
		      res.status(500).json({ error: 'An error occurred' });
		      return;
		    }
		    res.json({ message: 'Data updated successfully' });
		  });
	}

	async reviewsImages(req, res,next){
		const productId = req.params.productId;
  		const query = 'SELECT * FROM images WHERE caseType="reviews" and caseId = ?';

		// Execute the query
		connection.query(query, [productId], (err, results) => {
			if (err) {
			console('Error executing query:', err);
			res.status(500).json({ error: 'Failed to retrieve reviews' });
			return;
			}

			res.json(results);
		});
	}
	
	async createreviews(req, res,next){

		  const query = 'INSERT INTO reviews (title, productId,description) VALUES (?, ?, ?)';
		  //const files = req.files;
		  const { title, productId,description } = req.body; 
		  connection.query(query, [title, productId,description], (error, results) => {
		    if (error) {
		      console('Error executing MySQL query:', error);
		      res.status(500).json({ error: 'An error occurred' });
		      return;
		    }
		    const insertedId = results.insertId;
		    
		    res.json({ message: 'Data inserted successfully' });
		  });
	}



	async reviewsProducts(req, res,next)
	{
		const query = 'SELECT * FROM products' ;
		connection.query(query, (err, results) => {
			if (err) {
			console('Error executing query:', err);
			res.status(500).json({ error: 'Failed to retrieve reviews' });
			return;
			}
			console(results);
			res.json(results);
		});
	}

	

	async getallmenu(req, res,next)
	{

		try {
			    const categoriesQuery = 'SELECT id, title FROM categories where parentId = 0';
			    const categories = await executeQuery(categoriesQuery);
			    const categoriesArray = [];
			    const categorySubcategory = [];
			    const subcategories = [];
			    for (let category of categories) {
			    	const cat = {
				        category_id: category.id,
				        title: category.title,
				        subcategories: []
				      };
					    const subcategoriesQuery = `SELECT id, title FROM categories WHERE parentId = ${category.id}`;
	  			        const categorySubcategories = await executeQuery(subcategoriesQuery);
	  			        for (let categorySubcategory of categorySubcategories ) {
	  			        	const sub = {
	  			        		category_id: categorySubcategory.id,
	  			        		title: categorySubcategory.title
	  			        	}
	  			        	cat.subcategories.push(sub);
	  			        	console(cat);
	  			        }
			      	categoriesArray.push(cat);
			    }

			    

			    res.json(categoriesArray);
			  } catch (err) {
			    console('Error executing query: ', err);
			    res.status(500).json({ error: 'Error executing query' });
			  }
					  
	}

	
}

module.exports = new UtilitiesController();
