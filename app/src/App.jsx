import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

// Get logs from the server, this function would be in a repository if this was an actual app
const getLogs = async () => {
    const response = await axios.get(API_URL + "/logs");
    return response.data;
};

function App() {
    const [userInput, setUserInput] = useState("");
    const [sentimentResult, setSentimentResult] = useState(null);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        // Get logs on app startup
        getLogs().then((data) => {
            setLogs(data);
            console.log(data);
        });
    }, []);

    // Analyze sentiment on button click
    const analyzeSentiment = async () => {
        const response = await axios.post(API_URL + "/analyze", {
            user_input: userInput,
        });
        const data = response.data;
        setSentimentResult(data);
        setLogs([data, ...logs]);
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mx-auto p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Sentiment Analysis</h1>
                <div className="mb-4">
                    <textarea
                        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        placeholder="Input..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                    ></textarea>
                    <button onClick={analyzeSentiment} className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        Analyze
                    </button>
                </div>

                {sentimentResult && (
                    <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md">
                        <h2 className="text-xl font-semibold">Sentiment Result</h2>
                        <p>Polarity: {sentimentResult.output_polarity}</p>
                        <p>Subjectivity: {sentimentResult.output_subjectivity}</p>
                        <p>Is Positive: {sentimentResult.output_is_positive ? "Yes" : "No"}</p>
                    </div>
                )}

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Activity Logs</h2>
                    <div className="space-y-4">
                        {logs.map((log, index) => (
                            <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                                <p>
                                    <strong>Input:</strong> {log.user_input}
                                </p>
                                <p>
                                    <strong>Polarity:</strong> {log.output_polarity}
                                </p>
                                <p>
                                    <strong>Subjectivity:</strong> {log.output_subjectivity}
                                </p>
                                <p>
                                    <strong>Is Positive:</strong> {log.output_is_positive ? "Yes" : "No"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
