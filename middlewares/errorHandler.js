module.exports = (e, req, res, next)=>{
    console.log(e)
    // if(e.status) {
    //     res.status(e.status).json({message: e.message})
    //   } else if (e.name == 'SequelizeUniqueConstraintError') {
    //     res.status(401).json({message: `email is already used`})
    //   } else if(e.name == 'SequelizeValidationError'){
    //     res.status(400).json({message: `${e.message}`})
    //   } else {
    //     res.status(500).json({message: 'internal server error'})
    //   }
    if(e.name == 'SequelizeValidationError') {
      // const messages = e.message.map((e)=> ({message: `${e.message}`}))
      let messages = []
      for (let i=0; i<e.errors.length; i++) {
        messages.push(e.errors[i].message)
      }
      console.log(messages)
      res.status(400).json({message: `${messages}`})
    } else if (e.name == 'SequelizeUniqueConstraintError') {
      res.status(401).json({message: `email is already used`})
    } else if (e.status){
      res.status(e.status).json({message: e.message})
    } else {
      res.status(500).json({message: 'internal server error'})
    }
}