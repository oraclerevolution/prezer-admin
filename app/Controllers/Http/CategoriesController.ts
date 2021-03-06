// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Categorie from 'App/Models/Categorie'
import Application from '@ioc:Adonis/Core/Application'
import Moment from 'moment'

export default class CategoriesController {
  
    public async page({view}: HttpContextContract){
      const categories = await Database.from('categories').select('*').where({status:0})
      const publicPath = Application.configPath('images')
      return view.render('categories/list',{categories, publicPath})
    }
  
    public async create({view}: HttpContextContract){
      return view.render('categorie/add')
    }
  
    public async ajouter({request, response}: HttpContextContract){
      const name = request.input('name')
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
      
      const categorie = new Categorie

      categorie.name = name
      categorie.image = `images/${image.fileName}`
      await categorie.save()

      response.redirect('/listesCategories')
    }
  
    public async affichermodifier({params,view}: HttpContextContract){
      const id = params.id
      const categorie = await Database.from('categories').select('*').where({id:id, status:0})
      const name = categorie[0].name
      const image = categorie[0].image
      const identifiant = categorie[0].id
      console.log(categorie);
      return view.render('categories/edit',{name, image, identifiant})
    }

    public async modifier({params,response, request}: HttpContextContract){
      const id = params.id
      const name = request.input('name')
      const image = request.file('image',{
        size:'2mb',
        extnames:['jpg','JPG','png', 'PNG', 'jpeg', 'JPEG']
      })

      const categorie = await Categorie.findOrFail(id)
      
      if(!image){
        //si ya pas d'image dans le champs, on modifier juste la categorie
        categorie.name = name
        await categorie.save()
        return response.redirect('/affichermodification/'+categorie.id)
      }else{
        //si ya une image dans le champ
        if(!image.isValid){
          return image.errors
        }
        await image.move(Application.publicPath('images'))
        let nomImage:any;
        nomImage = image.fileName
        categorie.name = name
        categorie.image = nomImage
        return response.redirect('/affichermodification/'+categorie.id)
      }
      
    }
    
    //API
    public async index({response}: HttpContextContract) {
        //recuperation de la liste de toutes les cat??gories
        try {
          const categories = await Database.from('categories').select('*').where({status:0})
          return response.json({
            error: false,
            message: 'La liste des cat??gories obtenue avec succ??s!',
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
      //ajouter une nouvelle cat??gorie
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

    public async voir({view, params}: HttpContextContract){
      const {id} = params
      const categories = await Database.from('categories').select('*').where({id:id, status:0})
      const dateParse = Moment(categories[0].created_at).format('d MMM YYYY')
      console.log(categories)
      
      return view.render('categories/view',{categories:categories, dateParse})
    }

    public async show({response,params}: HttpContextContract) {
        //afficher une seule cat??gorie
        const {id_categorie} = params
        if (!id_categorie) {
          response.status(401).json({
            error: true,
            message: "Envoy?? un id valide s'il vous plait!",
          })
        }
    
        try {
          const categorie = await Database.from('categories').select('*').where({id:id_categorie, status:0})
          return response.json({
            error: false,
            message: "la cat??gorie a ??t?? obtenu avec succ??s",
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
        //modifier une cat??gorie
        try {
          const id  = params.categorie_id
    
          if (!id) {
            response.status(401).json({
              error: true,
              message: "Envoy?? un id valide s'il vous plait!",
            })
          }
          
          const categorie = await Categorie.find(id)
    
          if (categorie === null) {
            return response.status(401).json({
              error: true,
              status:401,
              message: "Cette cat??gorie n'existe pas!",
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
            message: 'Cat??gorie mis ?? jour!',
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
              message: "Envoy?? un id valide s'il vous plait !",
            })
          }
          
          const categorie = await Categorie.find(id)
    
          if (categorie === null) {
            return response.status(401).json({
              error: true,
              status:401,
              message: "Cette cat??gorie n'existe pas !",
            })
          }
          
          categorie.status = 1
          categorie.save()
    
          return response.json({
            error: false,
            message: 'Cat??gorie supprim?? !',
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
