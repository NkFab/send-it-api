import { celebrate, Joi } from "celebrate";

export default class Validate {
    static login() {
        return celebrate({
            body: Joi.object().keys({
                email: Joi.string().email().required().trim(),
                pass: Joi.string().min(6).required().trim()
            })
        })
    }
    static signup() {
        return celebrate({
            body: Joi.object().keys({
                "username": Joi.string().insensitive().required().trim(),
                "pass": Joi.string().min(6).required().trim(),
                "email": Joi.string().email().required().trim(),
                "user_type": Joi.string().valid('Admin', 'Client').required()
            })
        })
    }
    static parcelOrder() {
        return celebrate({
            body: Joi.object().keys({

            })
        })
    }
}