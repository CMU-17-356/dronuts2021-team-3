module.exports = {
  HOST: 'dronuts2021-team-3-postgres.postgres.database.azure.com',
  PORT: 5432,
  USER: 'postgres@dronuts2021-team-3-postgres',
  PASSWORD: 'team3dronuts!',
  DB: 'postgres',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
