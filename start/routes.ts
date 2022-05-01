/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})
Route.get('/main', 'UsersController.admin')

//categories
Route.get('/ajouterCategorie', async ({view})=>{
  return view.render('categories/add')
})
Route.get('/listesCategories', 'CategoriesController.page')
Route.get('/voirCategories/:id', 'CategoriesController.voir')
Route.post('/ajouterlacategorie','CategoriesController.ajouter')
Route.get('/affichermodification/:id','CategoriesController.affichermodifier')
Route.post('/modifierlacategorie/:id','CategoriesController.modifier')

//preservatif

Route.get('/ajouterPreservatif','PreservatifsController.afficher')
Route.post('/creePreservatif', 'PreservatifsController.ajouter')
Route.get('/listeCategorie', 'PreservatifsController.listeCategorie')
Route.get('/preservatifs/:id', 'PreservatifsController.voir')





































































//====================================
//              API
//====================================
//categorie
Route.group(() => {
  Route.get('categories', 'CategoriesController.index') //liste des categories
  Route.post('addcategorie','CategoriesController.store') //ajouter une categorie
  Route.get('details_categorie/:id_categorie', 'CategoriesController.show') //afficher les details d'une catégorie
  Route.put('updatecategorie/:categorie_id','CategoriesController.update') //modifier la categorie
  Route.put('delete_categorie/:categorie_id', 'CategoriesController.destroy')
})
.prefix('/api/v1/')

//preservatif
Route.group(() => {
  Route.get('preservatifs/:id_categorie', 'PreservatifsController.index') //liste des preservatifs par categories
  Route.post('addpreservatif','PreservatifsController.store') //ajouter une categorie
  Route.get('details_preservatif/:id_preservatif', 'PreservatifsController.show') //afficher les details d'une catégorie
  Route.put('updatepreservatif/:preservatif_id','PreservatifsController.update') //modifier la categorie
  Route.put('delete_preservatif/:preservatif_id', 'PreservatifsController.destroy') //supprimer un preservatif
})
.prefix('/api/v1/')

//commande
Route.group(() => {
  Route.get('commandes', 'CommandesController.index') //liste de toutes les commandes
  Route.get('commandesEnAttente', 'CommandesController.CommandesEnAttentes') //liste des commandes en attente
  Route.get('commandesEnCoursDeLivraison', 'CommandesController.CommandesEnCoursDeLivraison') //liste des commandes en cours de livraison
  Route.get('commandesTerminees', 'CommandesController.CommandesTerminees') //liste des commandes terminées
  Route.get('commandesRejetees', 'CommandesController.CommandesRejetees') //liste des commandes rejetées
  Route.post('addcommande','CommandesController.store') //ajouter une commande
  Route.get('details_commande/:id_commande', 'CommandesController.show') //afficher les details d'une commande
  Route.put('updatecommande/encours/:user_number','CommandesController.Encours') //modifier la commande en cours
  Route.put('updatecommande/terminees/:user_number','CommandesController.Terminees') //modifier la commande terminées
  Route.put('updatecommande/rejetees/:user_number','CommandesController.Rejetees') //modifier la commande rejetees
})
.prefix('/api/v1/')

//paiement
Route.group(() => {
  Route.get('paiements', 'PaiementsController.index') //liste des paiements
  Route.get('details_paiement/:id_paiement', 'PaiementsController.show') //afficher les details d'un paiement
  Route.put('archive_paiement/:paiement_id', 'PaiementsController.destroy') //archiver une commande
})
.prefix('/api/v1/')

//user
Route.group(() => {
  Route.post('register', 'UsersController.store') //lregister
  Route.post('login','UsersController.login') //login
  Route.get('logout', 'UsersController.logout') //logout
})
.prefix('/api/v1/user/')