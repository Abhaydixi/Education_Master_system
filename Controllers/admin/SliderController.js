const SliderModal = require('../../models/slider');
const { slider } = require('./AdminController');
var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'di61xlmoy',
    api_key: '365262784934562',
    api_secret: 'BhgYhnemhXBA_VcD5e5nZdH5gt8',
    //secure: true
});
class SliderController{



        static slider = async(req,res) =>{
              try{
                 const data = await SliderModal.find()
                // console.log(data)
                res.render('admin/slidernew/slider',{s:data})
              }
             
              catch(error){
                console.log(error)
              }
                 

        }


    static insertslider = async (req, res) => {
        try {
            // console.log(req.files.image)
            // console.log(req.body)
            const file = req.files.image
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'Edu_slider'
            })
            //console.log(myimage)
            const result = new SliderModal({
                title: req.body.title,
                description: req.body.description,
                image: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url
                }
            })
            //console.log(result)
            await result.save()
            res.redirect('/admin/slider')

        } catch (error) {
            console.log(error)
        }

}
static sliderview = async (req,res)=>{
    try{
        //console.log('heloo')
        // console.log(req.params.id)
         const result = await SliderModal.findById(req.params.id);
         //console.log(result)
         res.render("admin/slidernew/view",{view:result})

    }catch(error){
        console.log(error);
    }
}


static sliderEdit = async (req, res) => {

    try {
        //console.log(req.params.id)
        const data = await SliderModal.findById(req.params.id)
        //console.log(data)

        res.render('admin/slidernew/edit', { edit: data })

    } catch (error) {
        console.log(error)
    }
}

static sliderupdate = async (req, res) => {

    try {
        //console.log(req.body)
        //console.log(req.params.id)
        //first delete the image
        const blog = await SliderModal.findById(req.params.id) //code off delete server image
        const imageid = blog.image.public_id
        //console.log(imageid)
        await cloudinary.uploader.destroy(imageid)

        //second update image
        const file = req.files.image
        const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'Edu_slider'
        })

        const update = await SliderModal.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            image: {
                public_id: myimage.public_id,
                url: myimage.secure_url
            }
        })
        await update.save()
        res.redirect('/admin/slider')

    } catch (error) {
        console.log(error)
    }
}




static sliderDelete = async (req, res) => {
    try {
        //cloudinary server image delete code 
        const slider = await SliderModal.findById(req.params.id)
         const imageid = slider.image.public_id
        // // console.log(imageid)
         await cloudinary.uploader.destroy(imageid)


        await SliderModal.findByIdAndDelete(req.params.id)

        res.redirect('/admin/slider')
    }
    catch (error) {
        console.log(error)
    }

}



}
module.exports = SliderController