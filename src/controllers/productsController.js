const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* const numberFormat = new Intl.toThousand('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  })  */

const productsController = {
	// Root - Show all products
	productsList: (req, res) => {
        products.map(i => i.price = numberFormat.format(i.price))   //Se recorre el json de products para convertir el formato nuemérico.
		res.render('products', {products : products})},
	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		let product = products.find((r) => r.id == req.params.id);    //Se busca el producto en el json de datos.

        if (product != undefined){
            return res.render('detail', {stylesheet: 'bootstrap-grid.min', product : product})
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
                let productsList = [...products];    //Se hace una copia del json
                let addProduct = {
	           id: productsList [productsList.length - 1].id + 1,     //se crea un nuevo objeto con id propio
                   ...req.body,
                   //image: req.files [0].filename
                }
                productsList.push (addProduct)     //El nuevo objeto se agrega dentro del json, al final del array.

                fs.writeFileSync ('../data/productsDataBase.json', JSON.stringify(productsList))    //Se sobresscribe el json de datos.

                res.redirect ('/products')       //Finalmente se redirige al usuario.
         },
	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic

                let product = products.find (r => r.id == req.params.id);
                  if (product != undefined) {
		     return res.render ('product-edit-form', { title: 'Editar | Modificar producto', stylesheet: 'bootstrap-grid.min', product : product })
                  }

                res.status (404).send ('No soe encontró el producto')

	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		
                let productsList = [...products]     //Se copia en una nueva variable el json de datos.
                let product = productsList.find (r => r.id == req.params.id);   //Se busca el producto en cuestion dentro de la variable creada.
                /* let image = image.image                   //La imagen del producto se guarda en una variable
                   if (req.files [0] != undefined) {
                   image = req.files[0].filename
                   }
      */
                 productsList = productsList.map (r => {
                   if (r.id == product.id) {
                      r = {
                            id: product.id,
                            ...req.body,
                            //image: image
                           }
                   }
                  return r
                  });
               
               fs.writeFileSync ('../data/productsDataBase.json', JSON.stringify(productsList))
               res.redirect ('detail', {stylesheet: 'bootstrap-grid.min', product : products})
        },
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
                let productsList = [...products]
                let product = productsList.find(e => e.id == req.params.id);
                productsList = productsList.filter( e => e.id != product.id);

        fs.writeFileSync('../data/productsDataBase.json', JSON.stringify(productsList));
        res.redirect('/products');
        }
};

module.exports = productsController;
