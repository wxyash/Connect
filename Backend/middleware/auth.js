const { User } = require('../models/user')

module.exports.VerifyUser = async function (data) {
  let user
  try {
    user = await User.findOne({ email: data.email })
    if (!user) {
      throw new Error('User Not Found')
    }
  } catch (error) {
    throw new Error(error.message)
  }

  if (user.password === data.password) {
    return user
  } else {
    throw new Error('Auth Error')
  }

}