const { z, string } = require('zod')

const accountValidate = z.object({
  username : z.string().min(8).max(15),
  password : z.string().min(8).max(20).refine((value) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
  }, {
    message: "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
  })
})

const courseValidation = z.object({
  title : z.string().max(30),
  description : z.string().max(100),
  price : z.number(), 
  imageLink : z.string().url().regex(/\.(jpeg|jpg|gif|png|webp|svg)$/i, "Invalid image URL"), 
  published : z.boolean(), 
})

module.exports = { accountValidate , courseValidation };