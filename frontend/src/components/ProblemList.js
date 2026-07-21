import { useEffect, useState } from "react";

import {

    getProblems,
    deleteProblem,
    updateProblem,
    previewCodeforces,
    importSelected,
    deleteHandle,
    deleteSelected

} from "../services/api";

import ProblemForm from "./ProblemForm";

function ProblemList() {

    const [problems,setProblems]=useState([]);
    const [search,setSearch]=useState("");
    const [difficultyFilter,setDifficultyFilter]=useState("");
    const [topicFilter,setTopicFilter]=useState("");
    const [preview,setPreview]=useState([]);
    const [selected,setSelected]=useState([]);

    useEffect(()=>{

        fetchProblems();

    },[]);

    const fetchProblems=async()=>{

        const data=await getProblems();

        setProblems(data);

    };

    const handleSync=async()=>{

        const handle=prompt(
            "Enter Codeforces Handle:"
        );

        if(!handle) return;

        const data=
        await previewCodeforces(
            handle
        );

        setPreview(data);

        setSelected([]);

    };

    const handleImportSelected=
    async()=>{

        if(selected.length===0){

            alert(
            "Select Questions First"
            );

            return;

        }

        await importSelected(
            selected
        );

        fetchProblems();

        setPreview([]);

        setSelected([]);

        alert(
        "Questions Added"
        );

    };

    const handleDeleteAll=
    async()=>{

        const handle=
        prompt(
        "Enter CF Handle:"
        );

        if(!handle) return;

        await deleteHandle(
            handle
        );

        fetchProblems();

        alert(
        `Deleted all questions from ${handle}`
        );

    };

    const handleDeleteSelected=
    async()=>{

        if(selected.length===0){

            alert(
            "Select Questions First"
            );

            return;

        }

        await deleteSelected({

            questions:selected

        });

        fetchProblems();

        setSelected([]);

        alert(
        "Selected Questions Deleted"
        );

    };

    const handleDelete=async(id)=>{

        await deleteProblem(id);

        fetchProblems();

    };

    const handleEdit=async(problem)=>{

        const newQuestionName=
        prompt(
            "Update Question Name:",
            problem.questionName
        );

        if(newQuestionName===null) return;

        const newTopic=
        prompt(
            "Update Topic:",
            problem.topic
        );

        if(newTopic===null) return;

        const newDifficulty=
        prompt(
            "Update Difficulty:",
            problem.difficulty
        );

        if(newDifficulty===null) return;

        const newPlatform=
        prompt(
            "Update Platform:",
            problem.platform
        );

        if(newPlatform===null) return;

        const newNotes=
        prompt(
            "Update Notes:",
            problem.notes || ""
        );

        if(newNotes===null) return;

        await updateProblem(

            problem._id,

            {

                ...problem,

                questionName:
                newQuestionName,

                topic:
                newTopic,

                difficulty:
                newDifficulty,

                platform:
                newPlatform,

                notes:
                newNotes

            }

        );

        alert(
        "Problem Updated"
        );

        fetchProblems();

    };

    const filteredProblems=
    problems.filter(

        (problem)=>

        (

        problem.questionName
        .toLowerCase()
        .includes(
        search.toLowerCase()
        )

        ||

        problem.topic
        .toLowerCase()
        .includes(
        search.toLowerCase()
        )

        ||

        problem.platform
        .toLowerCase()
        .includes(
        search.toLowerCase()
        )

        )

        &&

        (

        difficultyFilter===""

        ||

        problem.difficulty===
        difficultyFilter

        )

        &&

        (

        topicFilter===""

        ||

        problem.topic===
        topicFilter

        )

    );

    const total=problems.length;

    const easy=
    problems.filter(
    p=>p.difficulty==="Easy"
    ).length;

    const medium=
    problems.filter(
    p=>p.difficulty==="Medium"
    ).length;

    const hard=
    problems.filter(
    p=>p.difficulty==="Hard"
    ).length;

    const topics=[

        ...new Set(

        problems.map(
        p=>p.topic
        )

        )

    ];
    return(

        <div className="container">

            <h1 className="title">

                🚀 DSA Practice Tracker

            </h1>

            <div className="top-actions">

                <button
                className="sync-btn"
                onClick={handleSync}
                >

                    Sync Codeforces

                </button>

                <button
                className="delete-btn"
                onClick={handleDeleteAll}
                >

                    Delete Handle Questions

                </button>

            </div>

            <ProblemForm
            refreshProblems={
            fetchProblems
            }
            />

            {

            preview.length>0 &&

            <div className="card">

                <h2>

                Select Questions To Import/Delete

                </h2>

                <div style={{

                    display:"flex",
                    gap:"10px",
                    marginBottom:"20px"

                }}>

                    <button
                    className="sync-btn"
                    onClick={()=>setSelected(preview)}
                    >

                        Select All

                    </button>

                    <button
                    className="delete-btn"
                    onClick={()=>setSelected([])}
                    >

                        Clear All

                    </button>

                </div>

                {

                preview.map(

                (q,index)=>(

                <div
                key={index}
                style={{

                    marginBottom:"10px"

                }}
                >

                    <input

                    type="checkbox"

                    checked={selected.some(

                        item=>

                        item.questionName===q.questionName

                    )}

                    onChange={(e)=>{

                        if(

                        e.target.checked

                        ){

                            setSelected([

                                ...selected,

                                q

                            ]);

                        }

                        else{

                            setSelected(

                                selected.filter(

                                    item=>

                                    item.questionName
                                    !==
                                    q.questionName

                                )

                            );

                        }

                    }}

                    />

                    {" "}

                    {q.questionName}

                </div>

                )

                )

                }

                <div
                style={{

                    display:"flex",
                    gap:"10px",
                    marginTop:"20px"

                }}
                >

                    <button
                    className="sync-btn"
                    onClick={
                    handleImportSelected
                    }
                    >

                        Add Selected

                    </button>

                    <button
                    className="delete-btn"
                    onClick={
                    handleDeleteSelected
                    }
                    >

                        Delete Selected

                    </button>

                </div>

            </div>

            }

            <div className="dashboard">

                <div className="stat-card">

                    <h2>{total}</h2>

                    <p>Total Solved</p>

                </div>

                <div className="stat-card easy-card">

                    <h2>{easy}</h2>

                    <p>Easy</p>

                </div>

                <div className="stat-card medium-card">

                    <h2>{medium}</h2>

                    <p>Medium</p>

                </div>

                <div className="stat-card hard-card">

                    <h2>{hard}</h2>

                    <p>Hard</p>

                </div>

            </div>

            <div className="filters">

                <input

                type="text"

                placeholder=
                "Search Questions"

                value={search}

                onChange={(e)=>

                setSearch(
                e.target.value
                )}

                />

                <select
                value={
                difficultyFilter
                }
                onChange={(e)=>

                setDifficultyFilter(
                e.target.value
                )}

                >

                    <option value="">
                    All Difficulties
                    </option>

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

                <select
                value={topicFilter}
                onChange={(e)=>

                setTopicFilter(
                e.target.value
                )}

                >

                    <option value="">
                    All Topics
                    </option>

                    {

                    topics.map(

                    topic=>(

                    <option
                    key={topic}
                    value={topic}
                    >

                    {topic}

                    </option>

                    )

                    )

                    }

                </select>

            </div>

            <div className="problem-grid">

                {

                filteredProblems.length===0

                ?

                <h3>

                    No Questions Found

                </h3>

                :

                filteredProblems.map(

                (problem)=>(

                <div
                className="card"
                key={problem._id}
                >

                    <h2>

                    {problem.questionName}

                    </h2>

                    <p>

                    <strong>Topic:</strong>

                    {" "}

                    {problem.topic}

                    </p>

                    <p>

                    <strong>Difficulty:</strong>

                    {" "}

                    <span
                    className={`badge ${problem.difficulty?.toLowerCase()}`}
                    >

                        {problem.difficulty}

                    </span>

                    </p>

                    <p>

                    <strong>Platform:</strong>

                    {" "}

                    {problem.platform}

                    </p>

                    {

                    problem.link &&

                    <a

                    href={problem.link}

                    target="_blank"

                    rel="noreferrer"

                    style={{

                        display:"inline-block",
                        marginTop:"10px"

                    }}

                    >

                        🔗 Open Question

                    </a>

                    }

                    {

                    problem.notes &&

                    <div
                    style={{

                        marginTop:"15px",
                        background:"#f8fafc",
                        padding:"12px",
                        borderRadius:"12px"

                    }}
                    >

                        <strong>

                            Notes

                        </strong>

                        <p>

                            {problem.notes}

                        </p>

                    </div>

                    }

                    <div
                    className="actions"
                    style={{

                        marginTop:"20px",
                        display:"flex",
                        gap:"10px"

                    }}
                    >

                        <button
                        className="edit-btn"
                        onClick={()=>

                        handleEdit(
                        problem
                        )}

                        >

                            Edit

                        </button>

                        <button
                        className="delete-btn"
                        onClick={()=>

                        handleDelete(
                        problem._id
                        )}

                        >

                            Delete

                        </button>

                    </div>

                </div>

                )

                )

                }

            </div>

        </div>

    );

}

export default ProblemList;