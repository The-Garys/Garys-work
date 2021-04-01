const Services = require("../models/Services");

module.exports={
    addProfession: async (req, res) => {
        console.log("professiin", req.body)
      
          try{
            const {profession, image}= req.body
              const saved= await Services.findOne({profession: req.body.profession})
              if(saved){
                 return res.send('already exist')
              }
              const newProfession = new Services({
                profession,
                image
                  });
          await newProfession.save();
          res.send(newProfession);
         } catch(err) {
          console.log(err)
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
      updateImgandService: async (req, res) => {
        try {
          const { image,profession } = req.body;
          let service = await Services.findByIdAndUpdate(
            { _id: req.params.id },
            {
              image,
              profession,
            },
            { new: true }
          );
          console.log('aaaaa====>', service)
        
          res.send({ success: "successfully updated", data: service });
        } catch (error) {
          console.log(error);
        }
      },
      // updateService: async (req, res) => {
      //   console.log(req.params);
      //   console.log(req.body);
      //   try {
      //     const { profession } = req.body;
      //     let service = await Services.findByIdAndUpdate(
      //       { _id: req.params.id },
      //       {
      //         profession
      //       },
      //       { new: true }
      //     );
      //     console.log('aaaaa====>', service)
        
      //     res.send({ success: "successfully updated", data: service });
      //   } catch (error) {
      //     console.log(error);
      //   }
      // },
   
   }