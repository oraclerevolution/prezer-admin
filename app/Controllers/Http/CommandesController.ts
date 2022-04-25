// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Commande from 'App/Models/Commande'
import Paiement from 'App/Models/Paiement'

export default class CommandesController {
    public async index({response}: HttpContextContract) {
        //recuperation de la liste de toutes les commandes
        try {
          const commandes = await Database.from('commandes').select('*').where({status:0})
          return response.json({
            error: false,
            message: 'La liste des commandes obtenue avec succès!',
            status:200,
            commandes
          })
        } catch (error) {
          return response.status(500).json({
            error: true,
            message: 'Une erreur est survenue',
          })
        }
    }

    public async CommandesTerminees({response}: HttpContextContract) {
      //recuperation de la liste de toutes les commandes terminées
      try {
        const commandes = await Database.from('commandes').select('*').where({statut:2, status:0})
        return response.json({
          error: false,
          message: 'La liste des commandes terminées obtenue avec succès!',
          status:200,
          commandes
        })
      } catch (error) {
        return response.status(500).json({
          error: true,
          message: 'Une erreur est survenue',
        })
      }
    }

    public async CommandesEnAttentes({response}: HttpContextContract) {
      //recuperation de la liste de toutes les commandes en attentes
      try {
        const commandes = await Database.from('commandes').select('*').where({statut:0, status:0})
        return response.json({
          error: false,
          message: 'La liste des commandes en attentes obtenue avec succès!',
          status:200,
          commandes
        })
      } catch (error) {
        return response.status(500).json({
          error: true,
          message: 'Une erreur est survenue',
        })
      }
    }

    public async CommandesEnCoursDeLivraison({response}: HttpContextContract) {
      //recuperation de la liste de toutes les commandes en cours de livraison
      try {
        const commandes = await Database.from('commandes').select('*').where({statut:1, status:0})
        return response.json({
          error: false,
          message: 'La liste des commandes en cours de livraison obtenue avec succès!',
          status:200,
          commandes
        })
      } catch (error) {
        return response.status(500).json({
          error: true,
          message: 'Une erreur est survenue',
        })
      }
    }

    public async CommandesRejetees({response}: HttpContextContract) {
      //recuperation de la liste de toutes les commandes rejetées
      try {
        const commandes = await Database.from('commandes').select('*').where({statut:3, status:0})
        return response.json({
          error: false,
          message: 'La liste des commandes rejetées obtenue avec succès!',
          status:200,
          commandes
        })
      } catch (error) {
        return response.status(500).json({
          error: true,
          message: 'Une erreur est survenue',
        })
      }
    }

    public async store({response, request}: HttpContextContract) {
        //ajouter une nouvelle commande
        try {
          const user_number = request.input('user_number')
          const id_produit = request.input('id_produit')
          const prix = request.input('prix')
    
          if (!(user_number || id_produit || prix)) {
            return response.status(409).json({
              error: true,
              message: "Ces champs sont obligatoires !",
              status: 404,
            })
          }
    
          // Get the order data to store them in our database
          const commande = await Commande.create({
            user_number: user_number,
            id_produit: id_produit,
            prix: prix
          })
    
          return response.status(200).json({
            error: false,
            commande,
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
        //afficher une seule commande
        const {id_commande} = params
        if (!id_commande) {
          response.status(401).json({
            error: true,
            message: "Envoyé un id valide s'il vous plait!",
          })
        }
    
        try {
          const commande = await Database.from('commandes').select('*').where({id:id_commande, status:0})
          return response.json({
            error: false,
            message: "la commande a été obtenu avec succès",
            commande,
            status:200
        })
        } catch (error) {
          return response.status(500).json({
            error: true,
            message: 'Une erreur est survenue',
          })
        }
    }

    public async Encours({response,params}: HttpContextContract) {
        //modifier une commande
        try {
          const user  = params.user_number 
    
          if (!user) {
            response.status(401).json({
              error: true,
              message: "Envoyé un numero valide s'il vous plait!",
            })
          }
          
          const commande = await Commande.findBy('user_number', user)
    
          if (commande === null) {
            return response.status(401).json({
              error: true,
              status:401,
              message: "Cette commande n'existe pas!",
            })
          }
              
          //categorie informations
          if (commande.statut == 0 && commande.status == 0) {
            commande.statut = 1
            await commande.save()
          } else {
            return response.status(500).json({
              error: true,
              status: 404,
              message: 'La commande doit avoir été supprimée'
            }) 
          }    
          
    
          return response.json({
            error: false,
            message: 'Commande mis à jour!',
            status:200,
            commande,
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

    public async Terminees({response,params}: HttpContextContract) {
      //modifier une commande
      try {
        const user  = params.user_number
  
        if (!user) {
          response.status(401).json({
            error: true,
            message: "Envoyé un id valide s'il vous plait!",
          })
        }
        
        const commande = await Commande.findBy('user_number', user)
  
        if (commande === null) {
          return response.status(401).json({
            error: true,
            status:401,
            message: "Cette commande n'existe pas!",
          })
        }
  
        //categorie informations
        if (commande.statut == 1 && commande.status == 0) {
          commande.statut = 2
          await commande.save()
        } else {
          return response.status(500).json({
            error: true,
            status: 404,
            message: 'La commande doit avoir été supprimée'
          }) 
        }

        const id_commande = commande.id
        const prix = commande.prix

        if (!(id_commande || prix)) {
          return response.status(409).json({
            error: true,
            message: "Ces champs sont obligatoires !",
            status: 404,
            data: [id_commande,prix]
          })
        }

        // Get the paiement data to store them in our database
        const paiement = await Paiement.create({
          id_commande:id_commande,
          prix: prix
        })
    
        return response.json({
          error: false,
          message: 'Commande terminées !',
          status:200,
          commande,
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

    public async Rejetees({response,params}: HttpContextContract) {
      //modifier une commande
      try {
        const user  = params.user_number
  
        if (!user) {
          response.status(401).json({
            error: true,
            message: "Envoyé un id valide s'il vous plait!",
          })
        }
        
        const commande = await Commande.findBy('user_number',user)
  
        if (commande === null) {
          return response.status(401).json({
            error: true,
            status:401,
            message: "Cette commande n'existe pas!",
          })
        }
        
        //categorie informations
        if (commande.statut == 2 && commande.status == 0) {
          commande.statut = 3
          await commande.save()
        } else {
          return response.status(500).json({
            error: true,
            status: 404,
            message: 'La commande doit avoir été supprimée'
          }) 
        } 

        return response.json({
          error: false,
          message: 'Commande rejetées !',
          status:200,
          commande,
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
