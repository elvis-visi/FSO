const Note = require('./note')
const User = require('./user')

// 1-M relationship connection between the users and notes entries. 
User.hasMany(Note)
Note.belongsTo(User)


module.exports = {
  Note, User
}