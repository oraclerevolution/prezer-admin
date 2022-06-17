import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Produits extends BaseSchema {
  protected tableName = 'produits'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nom_produit')
      table.integer('prix')
      table.integer('id_categorie').unsigned().references('id').inTable('categories')
      table.integer('status').defaultTo(0)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
       table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
