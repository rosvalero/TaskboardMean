const multer = require('multer');

const DIR =  '../public' 

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null /*se coloca para que no tome en cuenta ningún error*/, DIR)
    },
    filename: (req, file, cb)=> {
      const filename = Date.now() + '-' + file.originalname.toLowerCase().split(' ').join('-') /*.join('-') para que cuando una los dos elementos le ponga un - */
      cb(null,filename)
    }
  })
  
  const upload = multer({
      storage: storage,
      fileFilter:(req,file,cb)=>{
          if(file.mimetype = "image/png" || filemimetype == "image/jpg" || file.mimetype == "image/jpeg") {
              cb(null, true)
          }else{
              cb(null,false)
              return cb(new Error('Solo acepta .png .jpg y .jpeg'))
          }
      }
    })

    module.exports = upload