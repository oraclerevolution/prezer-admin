import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Commandes extends BaseSchema {
  protected tableName = 'commandes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('user_number').notNullable()
      table.integer('id_produit').unsigned().references('id').inTable('preservatifs')
      table.integer('prix').notNullable()
      table.integer('statut').notNullable().defaultTo(0) //0 pour en attente - 1 pour en cours de livraison - 2 pour livrée et payée - 3 pour rejetée
      table.integer('status').notNullable().defaultTo(0)
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
