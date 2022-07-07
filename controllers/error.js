exports.getError=(req,res)=>{
   
    res.status(404).render('error',{pageTitle:"404 Error"})
   }