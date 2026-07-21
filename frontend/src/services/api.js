const BASE_URL = "http://localhost:5000/api/problems";


// GET ALL PROBLEMS
export const getProblems = async () => {

    const response = await fetch(BASE_URL);

    return await response.json();
};


// CREATE PROBLEM
export const createProblem = async (formData) => {

    const response = await fetch(BASE_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(formData)

    });

    return await response.json();
};


// DELETE SINGLE PROBLEM
export const deleteProblem = async (id) => {

    const response = await fetch(
        `${BASE_URL}/${id}`,
        {
            method: "DELETE"
        }
    );

    return await response.json();
};


// UPDATE PROBLEM
export const updateProblem = async (id, updatedData) => {

    const response = await fetch(
        `${BASE_URL}/${id}`,
        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(updatedData)

        }
    );

    return await response.json();
};


// CODEFORCES FULL AUTO SYNC
export const syncCodeforces = async (handle) => {

    const response = await fetch(
        `${BASE_URL}/sync/${handle}`,
        {
            method: "POST"
        }
    );

    return await response.json();
};


// PREVIEW CF QUESTIONS BEFORE IMPORT
export const previewCodeforces = async (handle) => {

    const response = await fetch(
        `${BASE_URL}/preview/${handle}`
    );

    return await response.json();
};


// IMPORT SELECTED QUESTIONS
export const importSelected = async (questions) => {

    const response = await fetch(
        `${BASE_URL}/import`,
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(questions)

        }
    );

    return await response.json();
};


// DELETE SELECTED QUESTIONS
export const deleteSelected = async (data) => {

    const response = await fetch(
        `${BASE_URL}/delete-selected`,
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        }
    );

    return await response.json();
};


// DELETE ENTIRE HANDLE QUESTIONS
export const deleteHandle = async (handle) => {

    const response = await fetch(
        `${BASE_URL}/handle/${handle}`,
        {
            method: "DELETE"
        }
    );

    return await response.json();
};