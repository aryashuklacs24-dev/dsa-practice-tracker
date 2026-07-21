const UserSettings =
require("../models/UserSettings");

const saveHandle = async(req,res)=>{

    try{

        const { codeforcesHandle }
        = req.body;

        let settings =
        await UserSettings.findOne();

        if(!settings){

            settings =
            await UserSettings.create({

                codeforcesHandle

            });

        }

        else{

            settings.codeforcesHandle =
            codeforcesHandle;

            await settings.save();

        }

        res.json(settings);

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

module.exports = {

    saveHandle

};