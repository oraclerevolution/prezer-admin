import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Paiements extends BaseSchema {
  protected tableName = 'paiements'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_commande').unsigned().references('id').inTable('commandes')
      table.integer('prix')
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
