const Note = require('./note')
const User = require('./user')

// 1-M relationship connection between the users and notes entries. 
User.hasMany(Note)
Note.belongsTo(User)
Note.sync({ alter: true })
User.sync({ alter: true })

module.exports = {
  Note, User
}