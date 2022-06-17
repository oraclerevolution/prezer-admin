import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Categorie from './Categorie'
import Couleur from './Couleur'
import Image from './Image'
import Parfum from './Parfum'

export default class Produit extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nom_produit: string

  @column()
  public prix: number

  @column()
  public id_categorie: number

  @column()
  public status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Categorie)
  public categories: BelongsTo<typeof Categorie>

  @hasMany(()=> Couleur)
  public couleurs: HasMany<typeof Couleur>

  @hasMany(()=> Image)
  public images: HasMany<typeof Image>

  @hasMany(()=> Parfum)
  public parfums: HasMany<typeof Parfum>
}
