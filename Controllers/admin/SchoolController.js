const SchoolModel = require('../../models/school');
var cloudinary = require('cloudinary').v2;
const CotegaryModel = require('../../models/categary');


cloudinary.config({ 
    cloud_name: 'di61xlmoy', 
    api_key: '365262784934562', 
    api_secret: 'BhgYhnemhXBA_VcD5e5nZdH5gt8',
    // secure: true
  });


class SchoolController{
    static school = async(req,res)=>{
        try{
            const data = await SchoolModel.find()
            const c_name= await CotegaryModel.find()
            //console.log(data)

            res.render('admin/school/school', {d:data,c:c_name})

        }catch(error){
            console.log(error)
        }        
    }

    static insertschool = async(req,res)=>{
        try{
            //console.log(req.body)
            //console.log(req.files.image)
            const file = req.files.image
            const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
                folder: 'schoolImage'
            })
            //console.log(myimage)
            
            const result = new SchoolModel({
                // title:req.body.title,
                image:{
                    public_id: myimage.public_id,
                    url: myimage.secure_url
                },
                schoolname:req.body.schoolname,
                address:req.body.address,
                description:req.body.description,
                c_name:req.body.c_name,
                instruction_medium: req.body.instruction_medium,
                affiliated_board:req.body.affiliated_board,
                type:req.body.type,
                phone_number:req.body.phone_number,
                email:req.body.email,
                library:req.body.library,
                india_rank:req.body.india_rank
                
            })
            await result.save()
            res.redirect('/admin/school')
            //console.log(result)
           

        }catch(error){
            console.log(error)
        }
    }
    static schoolview = async(req,res)=>{
        try{
            //console.log(req.params.id)
            const data = await SchoolModel.findById(req.params.id)
            //console.log(data)
            res.render('admin/school/view',{view:data})

        }catch(error){
            console.log(error)
        }
    }

    static schooledit = async(req,res)=>{
        try{
            //console.log(req.params.id)
            const data = await SchoolModel.findById(req.params.id)
            //console.log(data)
            res.render('admin/school/edit',{edit:data})

        }catch(error){
            console.log(error)
        }
    }

    static schoolupdate = async(req,res)=>{
        try{
            //console.log(req.body)
            //console.log(req.params.id)
            const update = await SchoolModel.findByIdAndUpdate(req.params.id,{
                title:req.body.title,
                schoolname:req.body.schoolname,
                address:req.body.address,
                description:req.body.description,
                c_name:req.body.c_name,
                instruction_medium: req.body.instruction_medium,
                affiliated_board:req.body.affiliated_board,
                type:req.body.type,
                phone_number:req.body.phone_number,
                email:req.body.email,
                library:req.body.library,
                india_rank:req.body.india_rank
            })
            await update.save()
            res.redirect('/admin/school')

        }catch(error){
            console.log(error)
        }
    }

    static schooldelete = async(req,res)=>{
        try{
            //console.log(req.body)
            //console.log(req.params.id)
            const school = await SchoolModel.findById(req.params.id)
            const imageid = school.image.public_id
            //console.log(imageid)
            await cloudinary.uploader.destroy(imageid)
            const schooldelete = await SchoolModel.findByIdAndDelete(req.params.id)
           
            res.redirect('/admin/school')

        }catch(error){
            console.log(error)
        }
    }

    
}

module.exports = SchoolController