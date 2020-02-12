module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: "password",
      database: "bookmark_app"
    }
  },
  staging: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "123456",
      database: "bookmark_app"
    }
  }
};
