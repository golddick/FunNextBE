const Product = require('../models/Products')

module.exports = {
    createProducts: async(req, res) => {
        const newProduct = new Product(req.body);
        try {
            await newProduct.save();
            res.status(200).json('This Product created successfully ')
            
        }catch (error){
            console.log(error.message)
            res.status(500).json('Product Failed to create')
        }
    },


    getAllProduct: async (req, res) => {
        try {
          const products = await Product.find().sort({ createdAt: -1 });
          res.status(200).json(products);
        console.log(products)
        } catch (error) {
          res.status(500).json('Failed to get all products');
        }
      },


    getProduct: async(req, res) => {
        try{
            const product = await Product.findById(req.params.id)
            res.status(200).json(product)
        }catch (error){
            res.status(500).json(' Failed to get product')
        }
    },


    searchProduct: async(req, res) => {
        try {
            const result = await Product.aggregate([
              {
                $search: {
                  index: "FunNex",
                  text: {
                    query: req.params.key,
                    path: {
                      wildcard: "*"
                    }
                  }
                }
              }
     
            ]);
          
            if (result.length > 0) {
              res.status(200).json(result);
            } else {
              res.status(404).json({ message: 'No products found' });
            }
          } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
          }
          
    },


}