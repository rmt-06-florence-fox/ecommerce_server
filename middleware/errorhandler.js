module.exports = (err, req, res, next)=>{
  if(err.name === 'Validation Error'){
    const messages = err.message.map((e)=> ({message: e.message}))
    res.status(err.status).json({messages})
  }else if(err.message) res.status(err.status).json({message: err.message})
  else if(err.messages) res.status(err.status).json({messages: err.messages})
  else res.status(500).json({message: 'Internal Server Error'})
}