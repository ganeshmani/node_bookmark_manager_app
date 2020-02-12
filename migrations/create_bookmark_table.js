exports.up = knex => {
  return knex.schema.createTable("bookmarks", t => {
    t
      .increments("id")
      .primary()
      .unsigned(),
      t.string("url");
  });
};

exports.down = knex => {
  return knex.schema.dropTable("bookmarks");
};
