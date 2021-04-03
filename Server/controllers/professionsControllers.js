const Services = require("../models/Services");

module.exports = {
  addProfession: async (req, res) => {
    console.log("professiin", req.body);
    const profession = new Services({
      profession: req.body.profession,
      image: req.body.image,
    });
    try {
      const saved = await Services.findOne({ profession: req.body.profession });
      if (saved) {
        return res.send("already exist");
      }
      await profession.save();
      res.send(profession);
    } catch (err) {
      res.json({ message: err });
    }
  },

  getProfessions: async (req, res) => {
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
      const { image, profession } = req.body;
      let service = await Services.findByIdAndUpdate(
        { _id: req.params.id },
        {
          image,
          profession,
        },
        { new: true }
      );
      console.log("aaaaa====>", service);

      res.send({ success: "successfully updated", data: service });
    } catch (error) {
      console.log(error);
    }
  },
  deleteService:async(req,res)=>{
    try {
      const deleteService=await Services.findOneAndDelete({_id:req.params.id});
      res.send(deleteService)
    }
    catch (error) {
    console.log(error); 
  }
  }
};
