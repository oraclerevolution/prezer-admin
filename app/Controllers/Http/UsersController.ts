// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import User from "App/Models/User";

export default class UsersController {
    public async admin ({view}: HttpContextContract){
      let commandes = await Database.from('commandes').select('*').orderBy('id','desc').limit(10)
      let paiements = await Database.from('paiements').select('*').orderBy('id','desc').limit(10)
      let users = await Database.from('commandes').countDistinct('user_number','total')
      const total_users = users[0].total
      let paiement = await Database.from('paiements').count('id_commande','total')
      const total_paiement = paiement[0].total
      let revenu = await Database.from('paiements').sum('prix','total')
      const revenu_total = revenu[0].total
      let commande = await Database.from('commandes').count('user_number','total')
      const commandes_total = commande[0].total
      return view.render('main',{commandes, paiements, total_users, total_paiement, revenu_total, commandes_total})
    }
    public async store({ request, response}: HttpContextContract) {
        try {
          console.log(1)
            const name = request.input('name')
            const email = request.input('email')
            const password = request.input('password')
          console.log(2)
            if (!( name || email || password)) {
                return response.status(409).json({
                error: true,
                message: 'Les champs sont obligatoires !',
                status: 404
                })
            }
          console.log(3)
          //find if user email or phone already exist
          const is_user_email_exist = await User.query().where('email', email)
          if (is_user_email_exist && is_user_email_exist.length > 0) {
            return response.status(401).json({
              error: true,
              message: 'this email exist!',
            })
          }
          console.log(4)
          // Get the name of the saved file; to store it in your database, for example.
          const user = await User.create({
            name: name,
            email: email,
            password: password,
            user_type:2 //type admin
          })
          console.log(5)
          return response.status(200).json({
            error: false,
            user: user,
            message: 'User created with success!',
          })
        } catch (error) {
          console.log(error)
          return response.status(500).json({
            error: true,
            message: 'Une erreur est survenue!',
          })
        }
      }

    async login({ auth, request, response }) {
        const email = request.input('email')
        const password = request.input('password')
        // Lookup user manually
        const user = await User.query().where({ email: email})
        console.log(user);
        
        if (!user) {
          return response.status(404).json({
            error: true,
            messsage: 'User not found!',
          })
        }
        
        try {
          const token = await auth.use('api').attempt(email, password, {
            expiresIn: '24hours',
          })
    
          return response.json({
            error: false,
            user: user,
            token: token,
            message: 'Utilisateur connecté avec succès!',
          })
    
        } catch {
          return response.status(400).json({
            error: false,
            user: user,
            message: 'User with provided credentials could not be found',
          })
    
        }
    }

    async logout({ auth, response }) {
        {
          await auth.use('api').revoke()
          return response.json({
            error: false,
            revoked: true,
            message: 'Logout with success!',
          })
        }
    }
}
