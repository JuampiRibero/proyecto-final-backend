const {
  loggerWarn,
  loggerTrace,
  loggerDefault,
  loggerError,
} = require("../logger/log4js.js");

const productController = (service) => {
  return {
    createProduct: async (req, res, next) => {
      loggerTrace.trace("Ingresó a createProduct");

      if (req.body.stock === "") {
        loggerWarn.warn(
          `El usuario ingresó ${req.body.stock} como valor de stock. Se seteará en 0.`
        );
        req.body.stock = 0;
      }
      const timestamp = new Date().toLocaleString();
      req.body.timestamp = timestamp;

      try {
        await service.createProduct(req.body);
        res.status(201).redirect("/productos/agregar");
      } catch (error) {
        loggerError.error(error);
        const errorMsg = {
          message: "No se cargó el producto",
          productCreated: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    findAll: async (req, res, next) => {
      loggerTrace.trace("Ingresó a findAll");
      try {
        const products = await service.getAllProducts();
        res.status(200).render("./pages/lista", { products });
      } catch (error) {
        loggerError.error(error);
        const errorMsg = {
          message: "No se encontraron los productos",
          productsFinded: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    getOne: async (req, res, next) => {
      loggerTrace.trace("Ingresó a getOne");

      try {
        const id = req.params.id;
        loggerDefault.info(`El id ingresado es ${id}`);
        const productRetrieved = await service.getProduct(id);

        const response = {
          productsFinded: productRetrieved,
          founded: productRetrieved != undefined ? true : false,
        };
        res.status(200).render("./pages/product-detail", { response });
      } catch (error) {
        loggerError.error(error);
        const errorMsg = {
          message: `No se encontró el producto con id ${id}`,
          productFinded: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    updateProduct: async (req, res, next) => {
      loggerTrace.trace("Ingresó a updateProduct");

      try {
        const body = req.body;
        const id = req.params.id;
        const updateProduct = await service.updateProduct(id, body);
        loggerDefault.info(
          "El producto actualizado quedó de la siguiente manera: " +
            updateProduct
        );
        res.status(200).json(updateProduct);
      } catch (error) {
        loggerError.error(error);
        const errorMsg = {
          message: "No se pudo modificar el producto",
          productModify: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    deleteOne: async (req, res, next) => {
      loggerTrace.trace("Ingresó a deleteOne");

      try {
        const id = req.params.id;
        await service.deleteProduct(id);
        res.status(200).json({ msg: "Producto eliminado!" });
      } catch (error) {
        loggerError.error(error);
        const errorMsg = {
          message: "No se pudo borrar el producto",
          productsFinded: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    getByCategory: async (req, res, next) => {
      loggerTrace.trace("Ingreso a getByCategory");

      try {
        const category = req.params.category;
        const productsRetrieved = await service.getByCategory(category);
        const response = { productsFinded: productsRetrieved };
        res.status(200).render("./pages/products-by-category", { response });
      } catch (error) {
        loggerError.error(error);
        const errorMsg = {
          message: `No se encontraron los productos con la categoria ${category}`,
          productsFinded: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    getByName: async (req, res, next) => {
      loggerTrace.trace("Ingreso a getOneByName");

      try {
        const title = req.params.title;
        loggerDefault.info(`El nombre del producto ingresado es ${title}`);
        const productsRetrieved = await service.getProductByTitle(title);
        res.status(200).json(productsRetrieved);
      } catch (error) {
        loggerError.error(error);
        const errorMsg = {
          message: `No se encontraron los productos con el título ${title}`,
          productsFinded: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    getByCode: async (req, res, next) => {
      loggerTrace.trace("Ingreso a getOneByCode");

      try {
        const code = req.params.code;
        loggerDefault.info(`El codigo del producto ingresado es ${code}`);
        const productsRetrieved = await service.getProductByCode(code);
        res.status(200).json(productsRetrieved);
      } catch (error) {
        loggerError.error(error);
        const errorMsg = {
          message: `No se encontraron los productos con code ${code}`,
          productsFinded: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    getByPrice: async (req, res, next) => {
      try {
        loggerDefault.info(
          `El usuario quiere los productos entre precio: ${req.query.minvalue} y ${req.query.maxvalue}`
        );

        loggerDefault.info(req.query);

        if (
          req.query.minvalue === undefined ||
          req.query.maxvalue === undefined
        ) {
          res.status(200).render("./pages/by-price-products");
        } else {
          const pricemin = parseInt(req.query.minvalue);
          const pricemax = parseInt(req.query.maxvalue);
          const productsRetrieved = await service.getProductByPrice(
            pricemin,
            pricemax
          );
          res.status(200).json(productsRetrieved);
        }
      } catch (error) {
        loggerError.error(error);
        const errorMsg = {
          message: `No se encontraron los productos con ese rango de valores`,
          productsFinded: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    getByStock: async (req, res, next) => {
      loggerTrace.trace("Ingreso a getOneByStock");

      try {
        const stockmin = parseInt(req.query.stockmin);
        const stockmax = parseInt(req.query.stockmax);
        loggerDefault.info(
          `El usuario quiere los productos entre stock: ${stockmin} y ${stockmax}`
        );
        const productsRetrieved = await service.getProductByStock(
          stockmin,
          stockmax
        );
        res.status(200).json(productsRetrieved);
      } catch (error) {
        loggerError.error(error);
        const errorMsg = {
          message: `No se encontraron los productos con ese rango de stock`,
          productsFinded: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },
  };
};

module.exports = productController;
