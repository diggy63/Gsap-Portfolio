module.exports={
    testApi,
}

function testApi(req,res){
    res.status(200).json({msg:"we have connection"})
}