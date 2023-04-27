const CategaryModel = require('../../models/categary');


var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'di61xlmoy', 
    api_key: '365262784934562', 
    api_secret: 'BhgYhnemhXBA_VcD5e5nZdH5gt8',
    // secure: true
  });
 
class CategaryController{
    static categary = async(req,res)=>{
      
       try{
        const data = await CategaryModel.find()
        //console.log(data)
        res.render('admin/categary/categary',{d:data})

       }catch(error){
        console.log(error)
       }
    }
    static insertcategary = async(req,res)=>{
        try{
            //console.log('hello')
            //console.log(req.files.image)
            const file = req.files.image
            //console.log(file)
            const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
                folder:'masImage'
            })
            //console.log(myimage)
            const result = new CategaryModel({
                title:req.body.title,
                cityimage:{
                    public_id: myimage.public_id,
                    url: myimage.secure_url
                }
            })
            await result.save()
            res.redirect('/admin/categary') 
            //console.log(myimage)
            // const result = new CotegaryModel({
            //     title:req.body.title,
            // })
            // await result.save()
            // //console.log(result)
            // //url of rout
            // res.redirect('/admin/categary') 

        }catch(error){
            console.log(error)
        }
    }

    static categaryview = async(req,res)=>{
        try{
            //console.log(req.params.id)
            const data = await CategaryModel.findById(req.params.id)
            //console.log(data)
            res.render('admin/categary/view',{view:data})

        }catch(error){
            console.log(error)
        }
    }

    static catedit = async(req,res)=>{
        try{
            //console.log(req.params.id)
            const data = await CategaryModel.findById(req.params.id)
            //console.log(data)
            res.render('admin/categary/edit',{edit:data})

        }catch(error){
            console.log(error)
        }
    }

    static catupdate = async(req,res)=>{
        try{
            //console.log(req.body)
            //console.log(req.params.id)
            //frist delete the image
            const categary = await CategaryModel.findById(req.params.id)
            const imageid = categary.cityimage.public_id
            //console.log(imageid)
            await cloudinary.uploader.destroy(imageid)

            // second update image
            const file = req.files.image
            //console.log(file)
            const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
                folder:'masImage'
            })


            const update = await CategaryModel.findByIdAndUpdate(req.params.id,{

                title:req.body.title,
                cityimage:{
                    public_id: myimage.public_id,
                    url: myimage.secure_url
                }
                
            })
            await update.save()
            res.redirect('/admin/categary')

        }catch(error){
            console.log(error)
        }
    }


    static catdelete = async(req,res)=>{
        try{
            //delete image code
            const categary = await CategaryModel.findById(req.params.id)
            const imageid = categary.cityimage.public_id
            //console.log(imageid)
            await cloudinary.uploader.destroy(imageid)
            //console.log(req.body)
            //console.log(req.params.id)
             await CategaryModel.findByIdAndDelete(req.params.id)
            
            res.redirect('/admin/categary')

        }catch(error){
            console.log(error)
        }
    }

   

    
  
}






module.exports = CategaryController