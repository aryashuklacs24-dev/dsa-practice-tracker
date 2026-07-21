const Problem = require("../models/Problem");

const createProblem = async(req,res)=>{

    try{

        const newProblem =
        await Problem.create(req.body);

        res.status(201).json(newProblem);

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message:error.message
        });

    }

};

const getProblems = async(req,res)=>{

    try{

        const problems =
        await Problem.find();

        res.status(200).json(problems);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const deleteProblem = async(req,res)=>{

    try{

        const deleted =
        await Problem.findByIdAndDelete(
            req.params.id
        );

        if(!deleted){

            return res.status(404).json({
                message:"Problem not found"
            });

        }

        res.status(200).json({
            message:"Problem deleted successfully"
        });

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const updateProblem = async(req,res)=>{

    try{

        const updated =
        await Problem.findByIdAndUpdate(

            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true
            }

        );

        res.status(200).json(updated);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

const syncCodeforces = async(req,res)=>{

    try{

        const handle =
        req.params.handle;

        const response =
        await fetch(
`https://codeforces.com/api/user.status?handle=${handle}`
        );

        const data =
        await response.json();

        if(data.status!=="OK"){

            return res.status(400).json({
                message:"Invalid Codeforces Handle"
            });

        }

        const solved =
        data.result.filter(
            sub=>sub.verdict==="OK"
        );

        let addedCount=0;

        for(const submission of solved){

            const exists =
            await Problem.findOne({

                questionName:
                submission.problem.name,

                platform:
                "Codeforces"

            });

            if(!exists){

                await Problem.create({

                    questionName:
                    submission.problem.name,

                    topic:
                    submission.problem.tags?.join(", ")
                    || "General",

                    difficulty:
                    submission.problem.rating
                    ?
                    submission.problem.rating<=1200
                    ? "Easy"
                    :
                    submission.problem.rating<=1800
                    ? "Medium"
                    : "Hard"
                    : "Easy",

                    platform:"Codeforces",

                    notes:
                    `Synced from ${handle}`,

                    cfHandle:handle

                });

                addedCount++;

            }

        }

        res.status(200).json({

            message:"Codeforces Sync Complete",

            handle,

            addedQuestions:
            addedCount

        });

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message:error.message
        });

    }

};

const previewCodeforces = async(req,res)=>{

    try{

        const handle =
        req.params.handle;

        const response =
        await fetch(
`https://codeforces.com/api/user.status?handle=${handle}`
        );

        const data =
        await response.json();

        if(data.status!=="OK"){

            return res.status(400).json({
                message:"Invalid Handle"
            });

        }

        const solved =
        data.result.filter(
            sub=>sub.verdict==="OK"
        );

        const unique=[];

        const seen =
        new Set();

        for(const sub of solved){

            const name =
            sub.problem.name;

            if(!seen.has(name)){

                seen.add(name);

                unique.push({

                    questionName:name,

                    topic:
                    sub.problem.tags?.join(", ")
                    || "General",

                    difficulty:
                    sub.problem.rating
                    ?
                    sub.problem.rating<=1200
                    ? "Easy"
                    :
                    sub.problem.rating<=1800
                    ? "Medium"
                    : "Hard"
                    : "Easy",

                    platform:"Codeforces",

                    cfHandle:handle

                });

            }

        }

        res.json(unique);

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message:error.message
        });

    }

};

const importSelected = async(req,res)=>{

    try{

        const questions =
        req.body;

        let added=0;

        for(const q of questions){

            const exists =
            await Problem.findOne({

                questionName:
                q.questionName,

                platform:
                q.platform

            });

            if(!exists){

                await Problem.create({

                    ...q,

                    cfHandle:
                    q.cfHandle || "",

                    notes:
                    q.cfHandle
                    ?
                    `Synced from ${q.cfHandle}`
                    :
                    ""

                });

                added++;

            }

        }

        res.status(200).json({

            message:"Questions Imported",

            added

        });

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message:error.message
        });

    }

};

const deleteSelected = async(req,res)=>{

    try{

        const {questions}=req.body;

        if(!questions || questions.length===0){

            return res.status(400).json({
                message:"No questions selected"
            });

        }

        const names =
        questions.map(
            q=>q.questionName
        );

        const result =
        await Problem.deleteMany({

            questionName:{
                $in:names
            }

        });

        res.status(200).json({

            message:"Selected questions deleted",

            deletedCount:
            result.deletedCount

        });

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message:error.message
        });

    }

};

const deleteHandle = async(req,res)=>{

    try{

        const handle =
        req.params.handle;

        console.log(
            "DELETE HANDLE:",
            handle
        );

        const result =
        await Problem.deleteMany({

            cfHandle:handle

        });

        console.log(result);

        res.status(200).json({

            message:
            `${result.deletedCount} questions deleted`

        });

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message:error.message
        });

    }

};

module.exports={

    createProblem,
    getProblems,
    deleteProblem,
    updateProblem,
    previewCodeforces,
    importSelected,
    syncCodeforces,
    deleteSelected,
    deleteHandle

};