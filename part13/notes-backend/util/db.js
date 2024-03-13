const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(DATABASE_URL)

// automates the process of keeping your DB schema synchronized with your
//application's models and requirements.
const runMigrations = async () => {
  //umzug instance -> handles the execution, logging, and tracking of migrations
  const migrator = new Umzug({
    // where to find the migration scripts that define how to update the database schema
    migrations: {
      glob: 'migrations/*.js',
    },/*records which migrations have been run, allowing Umzug to determine which
     migrations need to be applied and preventing the same migration from being run
      multiple times
    */
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    /*object provides a set of methods for performing database schema operations, 
    allowing your migration scripts to interact with the database.
    */
    context: sequelize.getQueryInterface(),
    logger: console,
  })
  
  //migrator.up() -> apply all pending migrations
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }