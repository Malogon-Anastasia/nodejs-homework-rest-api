const {Schema, model} = require("mongoose");
const Joi = require("joi");
 
const contactSchema = Schema(
    {
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      favorite: {
        type: Boolean,
        default: false,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    
}, {versionKey:false, timestamps: true})



const nameSchema = Joi.string()
  .regex(/^[a-zA-Z]+ [a-zA-Z]+$/i)
  .min(3)
  .max(30)
  .insensitive()

const emailSchema = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] },
})

const phoneSchema = Joi.string().regex(/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/);

const favoriteJoiSchema = Joi.object({favorite: Joi.bool().required()})

const joiSchema = Joi.object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    favorite: Joi.bool(),
});

const Contact = model("contact", contactSchema);
module.exports = {
    Contact,
    joiSchema,
    favoriteJoiSchema
} 