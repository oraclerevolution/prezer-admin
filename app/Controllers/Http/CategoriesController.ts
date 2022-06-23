// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Categorie from 'App/Models/Categorie'

export default class CategoriesController {
  
    //API
    public async index({response}: HttpContextContract) {
        //recuperation de la liste de toutes les catégories
        try {
          const categories = await Database.from('categories').select('*').where({status:0})
          return response.json({
            error: false,
            message: 'La liste des catégories obtenue avec succès!',
            status:200,
            categories
          })
        } catch (error) {
          return response.status(500).json({
            error: true,
            message: 'Une erreur est survenue',
          })
        }
    }

    public async store({response, request}: HttpContextContract) {
      //ajouter une nouvelle catégorie
      try {
        const name = request.input('name')
          const image = request.input('image')
    
          if (!(name || image)) {
            return response.status(409).json({
              error: true,
              message: "Ces champs sont obligatoires !",
              status: 404,
            })
          }
    
          // Get the categorie data to store them in our database
          const categorie = await Categorie.create({
            name:name,
            image: image
          })
    
          return response.status(200).json({
            error: false,
            categorie,
            status: 200,
          })
        } catch (error) {
          console.log(error)
          return response.status(500).json({
            error: true,
            message: 'Une erreur est survenue!',
          })
        }
    }

    public async show({response,params}: HttpContextContract) {
        //afficher une seule catégorie
        const {id_categorie} = params
        if (!id_categorie) {
          response.status(401).json({
            error: true,
            message: "Envoyé un id valide s'il vous plait!",
          })
        }
    
        try {
          const categorie = await Database.from('categories').select('*').where({id:id_categorie, status:0})
          return response.json({
            error: false,
            message: "la catégorie a été obtenu avec succès",
            categorie,
            status:200
        })
        } catch (error) {
          return response.status(500).json({
            error: true,
            message: 'Une erreur est survenue',
          })
        }
    }

    public async update({response, request,params}: HttpContextContract) {
        //modifier une catégorie
        try {
          const id  = params.categorie_id
    
          if (!id) {
            response.status(401).json({
              error: true,
              message: "Envoyé un id valide s'il vous plait!",
            })
          }
          
          const categorie = await Categorie.find(id)
    
          if (categorie === null) {
            return response.status(401).json({
              error: true,
              status:401,
              message: "Cette catégorie n'existe pas!",
            })
          }
          
          const name = request.input("name")
          const image = request.input("image")
    
          //categorie informations
          categorie.name = name
          categorie.image = image
    
          await categorie.save()
    
          return response.json({
            error: false,
            message: 'Catégorie mis à jour!',
            status:200,
            categorie,
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

    public async destroy({response, params}: HttpContextContract) {
        //suprimer une categorie
        try {
          const id  = params.categorie_id
    
          if (!id) {
            response.status(401).json({
              error: true,
              message: "Envoyé un id valide s'il vous plait !",
            })
          }
          
          const categorie = await Categorie.find(id)
    
          if (categorie === null) {
            return response.status(401).json({
              error: true,
              status:401,
              message: "Cette catégorie n'existe pas !",
            })
          }
          
          categorie.status = 1
          categorie.save()
    
          return response.json({
            error: false,
            message: 'Catégorie supprimé !',
            status:200,
            categorie
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
