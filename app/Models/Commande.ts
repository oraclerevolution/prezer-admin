import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Commande extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_number: string

  @column()
  public id_produit: number

  @column()
  public prix: number

  @column()
  public statut: number

  @column()
  public status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
