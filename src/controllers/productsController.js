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
            return res.render('detail', {stylesheet: 'bootstrap-grid.min', product : products})
        }

        res.status(404).render('products/detail', {stylesheet: 'bootstrap-grid.min', product : error})
    
	},

	// Create - Form to create
	create: (req, res) => 
		// Do the magic
		res.render('product-create-form', { title: 'Vender | Agregar producto', stylesheet: 'bootstrap-grid.min' }),
	
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic    
                let productsList = [...products];
                let addProduct = {
	           id: productsList [productsList.length - 1].id + 1,
                   ...req.body,
                   avatar: req.files [0].filename
                }
                productsList.push (addProduct)

                fs.writeFileSync ('./data/productsDataBase.json', JSON.stringify(productsList))

                res.redirect ('/products')
         },
	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic

                let product = products.find (r => r.id == req.params.id);
                  if (product != undefied) {
		     return res.render ('product-edit-form', { title: 'Editar | Modificar producto', stylesheet: 'bootstrap-grid.min' })
                  }

                res.status (404).send ('No se encontró el producto')

	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		
                let productsList = [...products]
                let product = productsList.find (r => r.id == req.params.id);
                let avatar = product.avatar
                   if (req.files [0] != undefined) {
                   avatar = req.files[0].filename
                   }
     
                 productsList =productsList.map (r => {
                   if (r.id == product.id) {
                      r = {
                            id: product.id,
                            ...req.body,
                            avatar: avatar
                           }
                   }
                  return r
                  });
               
               fs.writeFileSync ('./data/productsDataBase.json', JSON.stringify(productsList))
               res.redirect ('detail', {stylesheet: 'bootstrap-grid.min', product : products})
        },
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = productsController;
