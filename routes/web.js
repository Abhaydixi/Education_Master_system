const express = require('express')
const router = express.Router()
const FrontController = require('../Controllers/FrontController')
const AdminController = require('../Controllers/admin/AdminController')
const SliderController = require('../Controllers/admin/SliderController')
const CategaryController = require('../Controllers/admin/CategaryController')
const SchoolController = require('../Controllers/admin/SchoolController')
const auth = require('../middelware/auth')




// front controller  //route  //path
router.get('/',FrontController.home)  //method
router.get('/contact',FrontController.contact)
router.get('/admin_login',FrontController.admin_login)
router.get('/registration',FrontController.registration)

router.get('/schoollist/:city',FrontController.schoollist)
router.get('/besicdetails/:id',FrontController.basicdetails)

router.post('/search',FrontController.search)


//admin controller
router.get('/admin/dashboard',auth,AdminController.dashboard)
router.post('/insertcontact',AdminController.insertcontact)
router.post('/adminregistration',AdminController.registration)
router.get('/admin/contact',AdminController.adcontact)
router.post('/veryfylogin',AdminController.veryfylogin)
router.get('/logout',AdminController.logout)
router.post('/adminchangepassword',auth,AdminController.updatePassword)
router.get('/changepassword',auth,AdminController.changepassword)

//slider controller
router.get('/admin/slider', SliderController.slider)
router.post('/insertslider', SliderController.insertslider)
router.get('/admin/slider/view/:id',SliderController.sliderview)
router.get('/admin/slideredit/:id',SliderController.sliderEdit)
router.post('/admin/sliderupdate/:id',SliderController.sliderupdate)
router.get('/admin/sliderdelete/:id',SliderController.sliderDelete)

//categary controller
router.get('/admin/categary',CategaryController.categary)
router.post('/insertcategary',CategaryController.insertcategary)
router.get('/admin/categaryview/:id',CategaryController.categaryview)
router.get('/admin/catedit/:id',CategaryController.catedit)
router.post('/catupdate/:id',CategaryController.catupdate)
router.get('/admin/catdelete/:id',CategaryController.catdelete)

//school controller
router.get('/admin/school', SchoolController.school)
router.post('/insertschool',SchoolController.insertschool)
router.get('/schoolview/:id',SchoolController.schoolview)
router.get('/schooledit/:id',SchoolController.schooledit)
router.post('/schoolupdate/:id',SchoolController.schoolupdate)
router.get('/schooldelete/:id',SchoolController.schooldelete)

module.exports = router
