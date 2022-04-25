import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Preservatif extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nom_produit: string

  @column()
  public prix: number

  @column()
  public image: string

  @column()
  public id_categorie: number

  @column()
  public status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
