const { createHash } = require("../auth/bcrypt/bcrypt.js");

const { loggerError } = require("../logger/log4js.js");

const userController = (service) => {
  return {
    createUser: async (req, res, next) => {
      try {
        const userToCreate = {
          name: req.body.name,
          lastname: req.body.lastname,
          age: req.body.age,
          number: req.body.number,
          address: req.body.address,
          email: req.body.email,
          avatar: `/static/avatar/${req.file.filename}`,
          password: createHash(req.body.password),
        };

        await service.createUser(userToCreate);
        res.status(200).json({ message: "Usuario creado" });
      } catch (error) {
        loggerError.error(error);
        const errorMsg = {
          message: `No se creo el usuario.`,
          userCreated: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    findUsers: async (req, res, next) => {
      try {
        const response = await service.findUsers();
        res.status(200).json(response);
      } catch (error) {
        loggerError.error(error);
        const errorMsg = {
          message: `No se encontraron los usuarios.`,
          userFounded: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    findUserById: async (req, res, next) => {
      try {
        const { id } = req.params;
        const response = await service.findUserById(id);
        res.status(200).json(response);
      } catch (error) {
        loggerError.error(error);
        const errorMsg = {
          message: `No se encontró el usuario con id ${id}.`,
          userFinded: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    deleteUserById: async (req, res, next) => {
      try {
        const { id } = req.params;
        await service.deleteUserById(id);
        res.status(200).json({ msg: `Usuario ${id} borrado.` });
      } catch (error) {
        loggerError.error(error);
        const errorMsg = {
          message: `No se borro el usuario con id ${id}.`,
          userDeleted: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    updateUserById: async (req, res, next) => {
      try {
        const { id } = req.params;
        const { body } = req;
        await service.updateUserById(id, body);
        res.status(200).json({ msg: `Usuario ${id} actualizado` });
      } catch (error) {
        loggerError.error(error);
        const errorMsg = {
          message: `No se actualizó el usuario con id ${id}.`,
          userUpdated: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },

    findUserByEmail: async (req, res, next) => {
      try {
        const { email } = req.params;
        const response = await service.findUserByEmail(email);
        res.status(200).json(response);
      } catch (error) {
        loggerError.error(error);
        const errorMsg = {
          message: `No se encontró el usuario con email ${email}.`,
          userFinded: false,
          error: error,
        };
        res.status(400).json(errorMsg);
      }
    },
  };
};

module.exports = userController;
