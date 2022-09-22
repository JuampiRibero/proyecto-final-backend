const { PERSISTENCE } = require("../config/globals.js");
const { productService } = require("../services/index.js");

const mailingService = require("../services/mailingService.js");
const createHtml = require("../utils/ticketHTML.js");
const whatsAppTwilio = require("../services/twilio.whatsapp.js");
const { twilioSmsFinishBuy } = require("../sms/twilio.js");

const orderController = (service) => {
  return {
    createOrder: async (req, res, next) => {
      try {
        const cartBody = req.body;
        const orderNumber = await service.getAllOrders();
        const finalCart = {
          productsOnCart: [],
          orderNumber: orderNumber.length + 1,
          timestamp: new Date().toLocaleDateString(),
          state: "generated",
          email: req.session.passport.user.email,
        };
        for (i = 0; i < cartBody.length; i++) {
          let productFinded = await productService.getProduct(cartBody[i].id);
          finalCart.productsOnCart.push({
            product: productFinded,
            quantity: cartBody[i].quantity,
          });
        }
        const orderCreated = await service.createOrder(finalCart);
        
        if (PERSISTENCE === "mongodb") {
          const emailSubject = `Nuevo pedido de: ${req.session.passport.user.name} @ mail: ${req.session.passport.user.email}`;

          const emailBody = createHtml.createHtml(orderCreated);

          await mailingService.mailingGmail({
            from: "Servidor de Node.js",
            to: ["olaf.spencer99@ethereal.email", process.env.GMAIL_USER],
            subject: emailSubject,
            html: emailBody,
          });
          await whatsAppTwilio(emailSubject, req.session.passport.user.number);
          await twilioSmsFinishBuy(
            req.session.passport.user.number,
            "Hemos recibido su pedido y se encuentra en proceso"
          );
        }

        delete req.session.cartSession;

        res.status(201).render("./pages/welcome");
      } catch (error) {
        console.log(error);
        const errorMsg = {
          message: `No se pudo crear orden`,
          orderCreated: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    getAllOrder: async (req, res, next) => {
      try {
        const response = await service.getAllOrders();
        res.status(200).json(response);
      } catch (error) {
        console.log(error);
        const errorMsg = {
          message: `No se encontró ordenes.`,
          orderFinded: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    getOneOrder: async (req, res, next) => {
      try {
        console.log("Ingresó a getOneOrder");
        const { id } = req.params;
        const response = await service.getOneOrder(id);
        res.status(200).json(response);
      } catch (error) {
        console.log(error);
        const errorMsg = {
          message: `No se encontró orden con id ${id}.`,
          orderFinded: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    deleteOneOrder: async (req, res, next) => {
      try {
        const { id } = req.params;
        const response = await service.deleteOneOrder(id);
        res.status(200).json(response);
      } catch (error) {
        console.log(error);
        const errorMsg = {
          message: `No se encontró orden con id ${id}.`,
          orderDeleted: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    async updateOneOrder(req, res, next) {
      try {
        const { id } = req.params;
        const { body } = req;
        const response = await service.updateOneOrder(id, body);
        res.status(200).json(response);
      } catch (error) {
        console.log(error);
        const errorMsg = {
          message: `No se encontró orden con id ${id}.`,
          orderUpdated: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },
  };
};

module.exports = orderController;
