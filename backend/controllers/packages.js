const Package = require("../models/packages")


const getfixedpackages = async (req,res) =>{
    try{
        const allpackages= await Package.find();
        res.json(allpackages);
    }catch(error){
        res.status(500).json({message:'Error fetching packages'});
    }
}

module.exports = getfixedpackages;