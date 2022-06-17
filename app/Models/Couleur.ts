import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Produit from './Produit'

export default class Couleur extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public couleur: string

  @column()
  public status: number

  @column()
  public id_produit: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Produit)
  public produits: BelongsTo<typeof Produit>
}
