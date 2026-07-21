const Problem = require("../models/Problem");
const UserSettings =
require("../models/UserSettings");

const syncCodeforces =
async(req,res)=>{

    try{

        const settings =
        await UserSettings.findOne();

        if(!settings){

            return res.status(404).json({

                message:"Handle not set"

            });

        }

        const handle =
        settings.codeforcesHandle;

        const response =
        await fetch(

`https://codeforces.com/api/user.status?handle=${handle}`

        );

        const data =
        await response.json();

        const accepted =

        data.result.filter(

            sub=>

            sub.verdict==="OK"

        );

        for(

            const sub of accepted

        ){

            const exists =
            await Problem.findOne({

                questionName:
                sub.problem.name,

                platform:"Codeforces"

            });

            if(!exists){

                await Problem.create({

                    questionName:
                    sub.problem.name,

                    topic:
                    sub.problem.tags.join(
                        ", "
                    ),

                    difficulty:
                    sub.problem.rating
                    ?

                    String(
                        sub.problem.rating
                    )

                    :

                    "Unknown",

                    platform:
                    "Codeforces"

                });

            }

        }

        res.json({

            message:
            "Sync completed"

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

module.exports = {

    syncCodeforces

};