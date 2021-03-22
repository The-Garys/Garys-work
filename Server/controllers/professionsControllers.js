const Services = require("../models/Services");

module.exports={
    addProfession: async (req, res) => {
        console.log("professiin", req.body)
       const profession = new Services({
        profession:req.body.profession,
          });
          try{
              const saved= await Services.findOne({profession: req.body.profession})
              if(saved){
                 return res.send('already exist')
              }
          await profession.save();
          res.send(profession);
         } catch(err) {
          res.json({message: err})
         }
        },

        getProfessions: async(req, res) => {
            try {
              const professions = await Services.find();
              console.log(professions);
              res.send(professions);
            } catch (error) {
              console.log(error);
            }
          }
   
   }