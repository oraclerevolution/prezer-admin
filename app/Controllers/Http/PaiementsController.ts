// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Paiement from 'App/Models/Paiement'

export default class PaiementsController {
    public async index({response}: HttpContextContract) {
        //recuperation de la liste de tous les paiements
        try {
          const paiements = await Database.from('paiements').select('*').where({status:0})
          return response.json({
            error: false,
            message: 'La liste des paiements obtenue avec succès!',
            status:200,
            paiements
          })
        } catch (error) {
          return response.status(500).json({
            error: true,
            message: 'Une erreur est survenue',
          })
        }
    }

    public async show({response,params}: HttpContextContract) {
        //afficher un seul paiement
        const {id_paiement} = params
        if (!id_paiement) {
          response.status(401).json({
            error: true,
            message: "Envoyé un id valide s'il vous plait!",
          })
        }
    
        try {
        const paiement = await Database.from('paiements').select('*').where({id:id_paiement,status:0})
          return response.json({
            error: false,
            message: "la catégorie a été obtenu avec succès",
            paiement,
            status:200
        })
        } catch (error) {
          return response.status(500).json({
            error: true,
            message: 'Une erreur est survenue',
          })
        }
    }

    
    public async destroy({response, params}: HttpContextContract) {
        //archiver un paiement
        try {
          const id  = params.paiement_id
    
          if (!id) {
            response.status(401).json({
              error: true,
              message: "Envoyé un id valide s'il vous plait !",
            })
          }
          
          const paiement = await Paiement.find(id)
    
          if (paiement === null) {
            return response.status(401).json({
              error: true,
              status:401,
              message: "Cet paiement n'existe pas !",
            })
          }
          
          paiement.status = 1
          paiement.save()
    
          return response.json({
            error: false,
            message: 'Paiement archivé !',
            status:200,
            paiement
          })
    
        } catch (error) {
          console.log(error)
          return response.status(500).json({
            error: true,
            status: 404,
            message: 'Une erreur est survenue!',
          })
        }
    }
}
