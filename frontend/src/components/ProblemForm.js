import { useState } from "react";
import { createProblem } from "../services/api";

function ProblemForm({ refreshProblems }) {

    const [formData,setFormData] = useState({

        questionName:"",
        topic:"",
        difficulty:"Easy",
        platform:"",
        notes:"",
        link:""

    });

    const handleChange=(e)=>{

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };

    const handleLinkParse=(url)=>{

        let platform="";
        let questionName="";

        if(url.includes("leetcode.com")){

            platform="Leetcode";

            const parts=url.split("/problems/");

            if(parts[1]){

                questionName=parts[1]
                .split("/")[0]
                .replace(/-/g," ");

            }

        }

        else if(url.includes("codeforces.com")){

            platform="Codeforces";

            const match=url.match(/problem\/(\w+)\/(\w+)/);

            if(match){

                questionName=`CF ${match[1]}-${match[2]}`;

            }

        }

        setFormData(prev=>({

            ...prev,

            link:url,
            platform,
            questionName:
            questionName || prev.questionName

        }));

    };

    const handleSubmit=async(e)=>{

        e.preventDefault();

        if(

            !formData.questionName ||

            !formData.topic ||

            !formData.platform

        ){

            alert(
                "Fill required fields"
            );

            return;
        }

        try{

            await createProblem(formData);

            alert(
                "Problem Added Successfully"
            );

            refreshProblems();

            setFormData({

                questionName:"",
                topic:"",
                difficulty:"Easy",
                platform:"",
                notes:"",
                link:""

            });

        }

        catch(error){

            console.log(error);

            alert(
                "Failed to add problem"
            );

        }

    };

    return(

        <form
        className="problem-form"
        onSubmit={handleSubmit}
        >

            <input
                placeholder="Paste Problem Link"
                value={formData.link}
                onChange={(e)=>
                handleLinkParse(
                    e.target.value
                )}
            />

            <input
                name="questionName"
                placeholder="Question Name"
                value={formData.questionName}
                onChange={handleChange}
            />

            <input
                name="topic"
                placeholder="Topic"
                value={formData.topic}
                onChange={handleChange}
            />

            <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
            >

                <option value="Easy">
                    Easy
                </option>

                <option value="Medium">
                    Medium
                </option>

                <option value="Hard">
                    Hard
                </option>

            </select>

            <input
                name="platform"
                placeholder="Platform"
                value={formData.platform}
                onChange={handleChange}
            />

            <input
                name="notes"
                placeholder="Notes"
                value={formData.notes}
                onChange={handleChange}
            />

            <button
            type="submit"
            >

                Add Problem

            </button>

        </form>

    );

}

export default ProblemForm;