// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
// import { v4 as uuid } from 'uuid'
// import Image from 'App/Models/Image'
// import Couleur from 'App/Models/Couleur'
// import Parfum from 'App/Models/Parfum'

export default class ProduitsController {

    public async index({response, params}: HttpContextContract) {
        //recuperation de la liste de toutes les preservatifs par catégorie
        const {id_categorie} = params
        try {
          const produits = await Database.from('produits').select('*').where({id_categorie:id_categorie,status:0})
          return response.json({
            error: false,
            message: 'La liste des produits obtenue avec succès!',
            status:200,
            produits
          })
        } catch (error) {
          return response.status(500).json({
            error: true,
            message: 'Une erreur est survenue',
          })
        }
    }

    // public async store({response, request}: HttpContextContract) {
    //     //ajouter un nouveau preservatif
    //     try {
    //       const nom_produit = request.input('nom_produit')
    //       const prix = request.input('prix')
    //       const image = request.input('image')
    //       const id_categorie = parseInt(request.input('id_categorie'))
    
    //       if (!(nom_produit || image || prix || id_categorie)) {
    //         return response.status(409).json({
    //           error: true,
    //           message: "Ces champs sont obligatoires !",
    //           status: 404,
    //         })
    //       }
    
    //       // Get the condom data to store them in our database
    //       const preservatif = await Produit.create({
    //         nom_produit:nom_produit,
    //         prix: prix,
    //         id_categorie: id_categorie,
    //         //image: image
    //       })
    
    //       return response.status(200).json({
    //         error: false,
    //         preservatif,
    //         status: 200,
    //       })
    //     } catch (error) {
    //       console.log(error)
    //       return response.status(500).json({
    //         error: true,
    //         message: 'Une erreur est survenue!',
    //       })
    //     }
    // }

    public async show({response,params}: HttpContextContract) {
        //afficher un seul produit
        const {id_produit} = params
        if (!id_produit) {
          response.status(401).json({
            error: true,
            message: "Envoyé un id valide s'il vous plait!",
          })
        }
    
        try {
        const produit = await Database.from('produits').select('*').where({id:id_produit,status:0})
          return response.json({
            error: false,
            message: "le produit a été obtenu avec succès",
            produit,
            status:200
        })
        } catch (error) {
          return response.status(500).json({
            error: true,
            message: 'Une erreur est survenue',
          })
        }
    }

    // public async update({response, request,params}: HttpContextContract) {
    //     //modifier un preservatif
    //     try {
    //       const id  = params.preservatif_id
    
    //       if (!id) {
    //         response.status(401).json({
    //           error: true,
    //           message: "Envoyé un id valide s'il vous plait!",
    //         })
    //       }
          
    //       const preservatif = await Produit.find(id)
    
    //       if (preservatif === null) {
    //         return response.status(401).json({
    //           error: true,
    //           status:401,
    //           message: "Cet préservatif n'existe pas!",
    //         })
    //       }
          
    //       const nom_produit = request.input("nom_produit")
    //       const prix = request.input("prix")
    //       const id_categorie = request.input("id_categorie")
    //       //const image = request.input("image")
    
    //       //categorie informations
    //       preservatif.nom_produit = nom_produit
    //       preservatif.prix = prix
    //       preservatif.id_categorie = id_categorie
    //       //preservatif.image = image
    
    //       await preservatif.save()
    
    //       return response.json({
    //         error: false,
    //         message: 'Préservatif mis à jour!',
    //         status:200,
    //         preservatif,
    //       })
    //     } catch (error) {
    //       console.log(error)
    //       return response.status(500).json({
    //         error: true,
    //         status: 404,
    //         message: 'Une erreur est survenue!',
    //       })
    //     }
    // }

    // public async destroy({response, params}: HttpContextContract) {
    //     //suprimer un préservatif
    //     try {
    //       const id  = params.preservatif_id
    
    //       if (!id) {
    //         response.status(401).json({
    //           error: true,
    //           message: "Envoyé un id valide s'il vous plait !",
    //         })
    //       }
          
    //       const preservatif = await Produit.find(id)
    
    //       if (preservatif === null) {
    //         return response.status(401).json({
    //           error: true,
    //           status:401,
    //           message: "Cet préservatif n'existe pas !",
    //         })
    //       }
          
    //       preservatif.status = 1
    //       preservatif.save()
    
    //       return response.json({
    //         error: false,
    //         message: 'Préservatif supprimé !',
    //         status:200,
    //         preservatif
    //       })
    
    //     } catch (error) {
    //       console.log(error)
    //       return response.status(500).json({
    //         error: true,
    //         status: 404,
    //         message: 'Une erreur est survenue!',
    //       })
    //     }
    // }
}
