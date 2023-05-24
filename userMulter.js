const multer=require('multer');
const path=require('path');
const upload=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'assest','userImages'));
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+Date.now()+"-"+path.extname(file.originalname));
    }
})
module.exports=upload;