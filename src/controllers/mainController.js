const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports =  {
	index: (req, res, next) => {
		res.render('index', {products : products})
		//res.send('Hola soy index')
	},
	
	search: (req, res) => {
		// Do the magic
		res.send('Soy el search')
	},
};

//module.exports = controller;
