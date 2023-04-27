const jwt = require('jsonwebtoken')
const AdminModel = require('../models/admin')



const checkAdminAuth = async (req, res, next) => {

    //console.log('helo middelware')
    const { token } = req.cookies
    //console.log(jwt)
    if (!token){
       
        req.flash('error', 'unauthorized admin')
        res.redirect('/admin_login')
    } else {
       const data = jwt.verify(token,'rudrapandit123')
       //console.log(data)
       const admin_data = await AdminModel.findOne({_id:data.id})
       //console.log(admin_data)
       req.admin = admin_data
       next()
    }

}


module.exports = checkAdminAuth