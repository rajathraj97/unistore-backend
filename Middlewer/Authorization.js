const Authorize = (req,res,next) =>{
    if(req.permittedRole.includes(req.user.role)){
        next()
    }else{
        res.json({error:'error'})
    }
}
module.exports = Authorize 