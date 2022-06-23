// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class BoutiquesController {
    public async index({response}: HttpContextContract){
        const boutiques = await Database.from('boutiques').select('*').where({status:0})
        return response.json({
            error: false,
            message: 'La liste des boutiques obtenue avec succès!',
            status:200,
            boutiques
          })
    }

    public async show({response, params}: HttpContextContract){
        const id = params.id_boutique
        const detailsBoutique = await Database.from('boutiques').select('*').where({id:id})
        return response.json({
            error: false,
            message: "Détails d'une boutique obtenus avec succès",
            status: 200,
            detailsBoutique
        })
    }
}
