import { useState } from "react";
import API from "../api/api";
import Chart from "./Chart";

function Chat({ datasetId }) {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState(null);


    const askQuestion = async () => {

        if (!question) return;


        try {

            setLoading(true);
            setAnswer("Analyzing data...");


            const response = await API.post(
                "/ask/",
                {
                    dataset_id: datasetId,
                    question: question
                }
            );


            setAnswer(
                response.data.ai_explanation
            );
            setChartData(
                response.data.analysis
            );


        } catch (error) {

            setAnswer(
                error.response?.data?.detail ||
                "Something went wrong"
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div>

            <h2>
                Ask AI Analyst 🤖
            </h2>


            <input
                value={question}
                onChange={(e)=>
                    setQuestion(e.target.value)
                }
                placeholder="Ask about your dataset..."
            />


            <button
                onClick={askQuestion}
                disabled={loading}
            >
                {
                    loading
                    ? "Thinking..."
                    : "Ask"
                }
            </button>


            <p>
                {answer}
            </p>

            {
                chartData && (
                    <Chart data={chartData} />
                )
            }

        </div>

    );
}


export default Chat;