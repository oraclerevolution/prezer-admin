// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Preservatif from 'App/Models/Preservatif'
import Application from '@ioc:Adonis/Core/Application'

export default class PreservatifsController {

    public async afficher({view}: HttpContextContract){
      const categories = await Database.from('categories').select('*').where({status:0})
      return view.render('preservatifs/add',{categories})
    }

    public async ajouter({request, view}: HttpContextContract){
      const name = request.input('name')
      const categorie_id = request.input('categorie_id')
      const prix = request.input('prix')
      const image = request.file('image',{
        size:'2mb',
        extnames:['jpg','JPG','png', 'PNG', 'jpeg', 'JPEG']
      })
      
      if(!image){
        return
      }
      
      if(!image.isValid){
        return image.errors
      }

      await image.move(Application.publicPath('images'))
      const preservatif = await Preservatif.create({
        nom_produit: name,
        prix: prix,
        id_categorie: categorie_id,
        image: image.fileName
      })

      const categories = await Database.from('categories').select('*').where({status:0})
      return view.render('preservatifs/list-categories',{categories})
    }

    public async voir({view, params}: HttpContextContract){
      const categorie_id = params.id
      const preservatifs = await Database.from('preservatifs').select('*').where({id_categorie:categorie_id, status:0})
      const imagePath = Application.publicPath("image")
      console.log(imagePath);
      return view.render('preservatifs/list',{preservatifs,imagePath})
    }

    public async listeCategorie({view}:HttpContextContract){
      const categories = await Database.from('categories').select('*').where({status:0})
      return view.render('preservatifs/list-categories',{categories})
    }

    public async index({response, params}: HttpContextContract) {
        //recuperation de la liste de toutes les preservatifs par catégorie
        const {id_categorie} = params
        try {
          const preservatifs = await Database.from('preservatifs').select('*').where({id_categorie:id_categorie,status:0})
          return response.json({
            error: false,
            message: 'La liste des articles obtenue avec succès!',
            status:200,
            preservatifs
          })
        } catch (error) {
          return response.status(500).json({
            error: true,
            message: 'Une erreur est survenue',
          })
        }
    }

    public async store({response, request}: HttpContextContract) {
        //ajouter un nouveau preservatif
        try {
          const nom_produit = request.input('nom_produit')
          const prix = request.input('prix')
          const image = request.input('image')
          const id_categorie = parseInt(request.input('id_categorie'))
    
          if (!(nom_produit || image || prix || id_categorie)) {
            return response.status(409).json({
              error: true,
              message: "Ces champs sont obligatoires !",
              status: 404,
            })
          }
    
          // Get the condom data to store them in our database
          const preservatif = await Preservatif.create({
            nom_produit:nom_produit,
            prix: prix,
            id_categorie: id_categorie,
            image: image
          })
    
          return response.status(200).json({
            error: false,
            preservatif,
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
        //afficher un seul preservatif
        const {id_preservatif} = params
        if (!id_preservatif) {
          response.status(401).json({
            error: true,
            message: "Envoyé un id valide s'il vous plait!",
          })
        }
    
        try {
        const preservatif = await Database.from('preservatifs').select('*').where({id:id_preservatif,status:0})
          return response.json({
            error: false,
            message: "le préservatif a été obtenu avec succès",
            preservatif,
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
        //modifier un preservatif
        try {
          const id  = params.preservatif_id
    
          if (!id) {
            response.status(401).json({
              error: true,
              message: "Envoyé un id valide s'il vous plait!",
            })
          }
          
          const preservatif = await Preservatif.find(id)
    
          if (preservatif === null) {
            return response.status(401).json({
              error: true,
              status:401,
              message: "Cet préservatif n'existe pas!",
            })
          }
          
          const nom_produit = request.input("nom_produit")
          const prix = request.input("prix")
          const id_categorie = request.input("id_categorie")
          const image = request.input("image")
    
          //categorie informations
          preservatif.nom_produit = nom_produit
          preservatif.prix = prix
          preservatif.id_categorie = id_categorie
          preservatif.image = image
    
          await preservatif.save()
    
          return response.json({
            error: false,
            message: 'Préservatif mis à jour!',
            status:200,
            preservatif,
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
        //suprimer un préservatif
        try {
          const id  = params.preservatif_id
    
          if (!id) {
            response.status(401).json({
              error: true,
              message: "Envoyé un id valide s'il vous plait !",
            })
          }
          
          const preservatif = await Preservatif.find(id)
    
          if (preservatif === null) {
            return response.status(401).json({
              error: true,
              status:401,
              message: "Cet préservatif n'existe pas !",
            })
          }
          
          preservatif.status = 1
          preservatif.save()
    
          return response.json({
            error: false,
            message: 'Préservatif supprimé !',
            status:200,
            preservatif
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
