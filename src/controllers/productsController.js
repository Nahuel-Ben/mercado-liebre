const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
	// Root - Show all products
	index: (req, res) => {
		let productList = [...products];
		product.price = toThousand(product.price);

        res.render('index', { stylesheet: 'bootstrap-grid.min', products : productList })},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		let product = products.find((e) => e.id == req.params.id);
        product.price = toThousand(product.price);

        if (product != undefined){
            res.render('products/detail', {stylesheet: 'bootstrap-grid.min', product : products})
        }

        let error = {
            name: 'Lo sentimos',
            price: '0',
            description: 'El producto no existe',
            image: 'producto-no-encontrado.png'
        }

        res.status(404).render('products/detail', {stylesheet: 'bootstrap-grid.min', product : error})
    
	},

	// Create - Form to create
	create: (req, res) => 
		// Do the magic
		res.render('products/create', { title: 'Vender | Agregar producto', stylesheet: 'bootstrap-grid.min' }),
	
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = productsController;