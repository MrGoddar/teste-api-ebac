// contracts/usuarios.contract.js

const Joi = require('joi');

const listaUsuariosSchema = Joi.object({
    
    usuarios: Joi.array().items(
        Joi.object({
            nome: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            administrador: Joi.alternatives(Joi.boolean(), Joi.string()).required(), 
            _id: Joi.string().required(),
        })
    ).required(),
    quantidade: Joi.number().integer(),
    message: Joi.string().optional(),
});

module.exports = listaUsuariosSchema;