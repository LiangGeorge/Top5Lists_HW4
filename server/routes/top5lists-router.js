const auth = require('../auth')
const express = require('express')
const Top5ListController = require('../controllers/top5list-controller')
const UserController = require('../controllers/user-controller')
const router = express.Router()

router.post('/top5list', (req,res,next) => auth.verify(req,res,next), Top5ListController.createTop5List)
router.put('/top5list/:id', (req,res,next) => auth.verify(req,res,next), Top5ListController.updateTop5List)
router.delete('/top5list/:id', (req,res,next) => auth.verify(req,res,next), Top5ListController.deleteTop5List)
router.get('/top5list/:id', (req,res,next) => auth.verify(req,res,next), Top5ListController.getTop5ListById)
router.get('/top5lists', (req,res,next) => auth.verify(req,res,next), Top5ListController.getTop5Lists)
router.get('/top5listpairs/:email',(req,res,next) => auth.verify(req,res,next), Top5ListController.getTop5ListPairs)

router.post('/register', UserController.registerUser)
router.get('/loggedIn', UserController.getLoggedIn)
router.post('/login', UserController.loginUser)
router.get('/logout', UserController.logoutUser)
module.exports = router