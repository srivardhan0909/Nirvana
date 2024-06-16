import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";

function DResult() {
    const location = useLocation();
    const [submitted, setSubmitted] = useState(false);
    const [resp, setResp] = useState(null);

    async function handleSubmit() {
        try {
            const response = await axios.post('https://final-ps-ml1.onrender.com/dpredict', {
                vals: location.state.vals
            });
            setSubmitted(true);
            setResp(response.data);

            try {
                const scr = await axios.post('https://final-ps-backend.vercel.app/api/dislexia', {
                    name: localStorage.getItem('name'),
                    email: localStorage.getItem('email'),
                    score: Math.round(response.data.output),
                });
            } catch (error) {
                console.error('Error submitting survey:', error);
            }
        } catch (error) {
            console.error('Error submitting survey:', error);
        }
    }

    return (
        <div className='d-flex align-items-center justify-content-center z-2'>
            <div className='d-flex mt-5 shadow-lg rounded-5 flex-column w-50 gap-3 pt-5 ps-5 h-100'>
                <p className="d-flex align-items-center justify-content-center">Thank you for submitting the survey!</p>
                {submitted ? (
                    <div>
                        {resp !== null && (
                            <div className="d-flex flex-column align-content-center justify-content-center">
                                <p>Your Score: {resp.output}</p>
                                <p>{resp.prediction}</p>
                                <p>{resp.result}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <Button onClick={handleSubmit}>
                        Submit
                    </Button>
                )}
            </div>
        </div>
    )
}

export default DResult;
