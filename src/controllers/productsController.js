const fs = require('fs');
const path = require('path');
//const { Router } = require('express');
const multer = require('multer');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
	// Root - Show all products
	productsList: (req, res) => {
		res.render('products', {products : products})},
	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		let product = products.find((e) => e.id == req.params.id);

        if (product != undefined){
            res.render('detail', {stylesheet: 'bootstrap-grid.min', product : products})
        }

        /* res.status(404).render('products/detail', {stylesheet: 'bootstrap-grid.min', product : error}) */
    
	},

	// Create - Form to create
	create: (req, res) => 
		// Do the magic
		res.render('product-create-form', { title: 'Vender | Agregar producto', stylesheet: 'bootstrap-grid.min' }),
	
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		res.send('Soy el store')
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		res.send('Soy el edit')
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