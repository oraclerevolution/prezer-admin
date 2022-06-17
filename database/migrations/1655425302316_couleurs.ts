import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Couleurs extends BaseSchema {
  protected tableName = 'couleurs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('couleur')
      table.integer('status').defaultTo(0)
      table.integer('id_produit').unsigned().references('id').inTable('produits')
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
