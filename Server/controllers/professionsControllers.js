const Services = require("../models/Services");

module.exports={
    addProfession: async (req, res) => {
        console.log("professiin", req.body)
       const profession = new Services({
        profession:req.body.profession,
        image:req.body.image,
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
          },
      updateImg: async (req, res) => {
        console.log(req.params);
        console.log(req.body);
        try {
          const { image } = req.body;
          let service = await Services.findByIdAndUpdate(
            { _id: req.params.id },
            {
              image
            },
            { new: true }
          );
          console.log('aaaaa====>', service)
        
          res.send({ success: "successfully updated", data: service });
        } catch (error) {
          console.log(error);
        }
      },
      updateService: async (req, res) => {
        console.log(req.params);
        console.log(req.body);
        try {
          const { profession } = req.body;
          let service = await Services.findByIdAndUpdate(
            { _id: req.params.id },
            {
              profession
            },
            { new: true }
          );
          console.log('aaaaa====>', service)
        
          res.send({ success: "successfully updated", data: service });
        } catch (error) {
          console.log(error);
        }
      },
   
   }