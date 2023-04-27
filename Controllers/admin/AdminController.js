const AdcontactModel = require('../../models/adcontact')
const AdminModel = require('../../models/admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AdminController {

    static dashboard = (req, res) => {
        res.render('admin/dashboard')
    }
    static slider = (req, res) => {
        res.render('admin/slider')
    }
    static school = (req, res) => {
        res.render('admin/school')
    }
    static adcontact = async (req, res) => {
        try {
            //console.log('hello')
            const data = await AdcontactModel.find()
            res.render('admin/adcontact', { c: data })
        } catch (error) {
            console.log(error)
        }


    }
    static insertcontact = async (req, res) => {
        try {
            //console.log('hello')
            const ad = new AdcontactModel({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                message: req.body.message

            })
            //console.log(ad)
            await ad.save()
            res.redirect('/contact')

        } catch (error) {
            console.log(error)
        }
    }

    static registration = async (req, res) => {
        try {

            const { name, email, password, confirm_password } = req.body
            const admin = await AdminModel.findOne({ email: email })
            if (admin) {
                req.flash('error', 'Email already exists')
                res.redirect('/registration')

            }
            else {
                if (name && email && password && confirm_password) {
                    if (password == confirm_password) {

                        const hashpassword = await bcrypt.hash(password, 10)

                        const registration = await new AdminModel({
                            name: name,
                            email: email,
                            password: hashpassword
                        });
                        await registration.save()
                        res.redirect('/admin_login')

                    } else {
                        req.flash('error', 'Password And Confirmpassword Does Not Match')
                        res.redirect('/registration')
                    }

                } else {
                    req.flash('error', 'All field are required')
                    res.redirect('/registration')
                }
            }
            //console.log(req.body)

        } catch (error) {
            console.log(error)
        }
    }

    static changepassword = async (req, res) => {

        res.render('admin/changepassword.ejs', { message1: req.flash("error") })
    }


    static veryfylogin = async (req, res) => {
        try {
            //console.log(req.body)
            const { email, password } = req.body
            if (email && password) {

                const admin = await AdminModel.findOne({ email: email })

                if (admin != null) {
                    const ismatched = await bcrypt.compare(password, admin.password)

                    if ((admin.email == email) & ismatched) {
                        //genrate jwt token
                        const token = jwt.sign({ id: admin._id }, 'rudrapandit123')
                        //console.log(token)
                        res.cookie('token', token)
                        res.redirect('/admin/dashboard')
                    } else {
                        req.flash('error', 'Email or Password is incorrect')
                        res.redirect('/admin_login')
                    }

                } else {
                    req.flash('error', 'You Are Not Register User')
                    res.redirect('/admin_login')
                }

            } else {
                req.flash('error', 'All field are required')
                res.redirect('/admin_login')
            }

        } catch (error) {
            console.log(error)
        }
    }

    static logout = async (req, res) => {
        try {
            res.clearCookie('token')
            res.redirect('/admin_login')

        } catch (error) {
            console.log(error)
        }
    }

    static updatePassword = async (req, res) => {
         const { old_password, new_password, cpassword } = req.body;
        // console.log(req.admin)
        //const {_id }=req.admin
        //console.log(_id)

        if (old_password && new_password && cpassword) {
            const admin = await AdminModel.findById(req.admin._id);
            const ismatched = await bcrypt.compare(old_password, admin.password);
            //const isPasswordMatched = await userModel.comparePassword(req.body.old_password);
            if (!ismatched) {

                req.flash('error', 'Old password is incorrect')
                res.redirect('/changepassword')
            } else {
                if (new_password !== cpassword) {
                    req.flash('error', 'Paswword not Match')
                    res.redirect('/changepassword')

                } else {

                    const newHashPassword = await bcrypt.hash(new_password, 10);
                    //console.log(req.user)
                    await AdminModel.findByIdAndUpdate(req.admin._id, {
                        $set: { password: newHashPassword },
                    });


                    req.flash('error', 'Password changed succesfully Please login')
                    res.redirect('/admin_login')
                }
            }
        } else {
            req.flash('error', 'All Fields are Required')
            res.redirect('/changepassword')
        }
    }




}
module.exports = AdminController