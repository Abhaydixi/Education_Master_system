const SliderModal = require("../models/slider")
const CategaryModel = require('../models/categary')
const SchoolModel =require("../models/school")

 
class FrontController{

    static home = async(req,res)=>{
        const data = await SliderModal.find()
        const city = await CategaryModel.find()
        res.render('home',{s:data , c:city})

    }

    static contact =(req,res)=>{
        res.render("contact")
    }

    static admin_login = async(req,res)=>{
        try{
            res.render('ad_login',{message:req.flash('error')})

        }catch(error){
            console.log(error)
        }
    }

    static registration =(req,res)=>{
        try{
            res.render('registration',{message:req.flash('error')})

        }catch(error){
            console.log(error)
        }
    }

   

    static schoollist =async(req,res)=>{
        try{
            const cityName = req.params.city
            const data = await SliderModal.find()
            const city = await CategaryModel.find()
            const schoollist =await SchoolModel.find({c_name:cityName})
            //console.log(schoollist)
            res.render("schoollist",{s:data , c:city,schoollist:schoollist, cityName:cityName })
        }catch(error){
            console.log(error)
        }
        
    }
    static basicdetails = async(req,res)=>{
        try{
            const id = req.params.id
            const data = await SliderModal.find()
            const schooldetail =await SchoolModel.findById({_id:id})
            //console.log(schooldetail)
            
            res.render('basicdetails',{s1:data, s:schooldetail})
            // console.log('hello')

        }catch(error){
            console.log(error)
        }
    }

    static search = async(req,res)=>{
        try{
            //console.log('hello')
            // res.render('search')
            const data= req.body.search
            if(data){
                const search_data = await SchoolModel.find({'c_name':{$regex:data}})
                //console.log(search_data)
                res.render('search',{user:search_data})
            }
             

            //console.log(data)
        }catch(error){
            console.log(error)
        }
    }


}

module.exports=FrontController