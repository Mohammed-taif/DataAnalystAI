import { useState } from "react";
import API from "../api/api";
import Chart from "./Chart";


function Chat({ datasetId }) {


    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const [chartData, setChartData] = useState(null);



    const askQuestion = async () => {


        if (!question.trim()) return;


        const userQuestion = question;


        setQuestion("");


        setMessages(prev => [

            ...prev,

            {
                role: "user",
                text: userQuestion
            }

        ]);



        try {


            setLoading(true);



            const response = await API.post(
                "/ask/",
                {
                    dataset_id: datasetId,
                    question: userQuestion
                }
            );



            setMessages(prev => [

                ...prev,

                {
                    role: "ai",
                    text: response.data.ai_explanation
                }

            ]);



            // FIXED chart data
            if (
                response.data.analysis?.data
            ) {

                setChartData(
                    response.data.analysis.data
                );

            }
            else {

                setChartData(
                    response.data.analysis
                );

            }



        }


        catch(error) {


            setMessages(prev => [

                ...prev,

                {
                    role: "ai",
                    text:
                    error.response?.data?.detail ||
                    "Something went wrong"
                }

            ]);


        }


        finally {

            setLoading(false);

        }

    };



    return (

        <div>


            <h2 className="
                text-2xl
                font-bold
                mb-4
            ">
                🤖 Ask AI Analyst
            </h2>



            <div className="
                space-y-4
                mb-6
                max-h-96
                overflow-y-auto
            ">


                {
                    messages.map(
                        (msg,index)=>(

                            <div

                                key={index}

                                className={
                                    msg.role === "user"
                                    ?
                                    "bg-blue-100 p-4 rounded-lg ml-auto max-w-xl"
                                    :
                                    "bg-gray-100 p-4 rounded-lg max-w-xl"
                                }

                            >

                                <p className="font-bold">

                                    {
                                        msg.role === "user"
                                        ?
                                        "You"
                                        :
                                        "AI"
                                    }

                                </p>


                                <p className="whitespace-pre-line">
                                    {msg.text}
                                </p>


                            </div>

                        )
                    )
                }



                {
                    loading && (

                        <div className="
                            bg-gray-100
                            p-4
                            rounded-lg
                        ">
                            🤖 AI is thinking...
                        </div>

                    )
                }


            </div>




            <div className="flex gap-3">


                <input

                    className="
                    flex-1
                    border
                    rounded-lg
                    p-3
                    "

                    value={question}

                    onChange={(e)=>
                        setQuestion(e.target.value)
                    }

                    placeholder="Ask about your dataset..."

                />



                <button

                    className="
                    bg-blue-600
                    text-white
                    px-6
                    rounded-lg
                    "

                    onClick={askQuestion}

                    disabled={loading}

                >

                    Ask

                </button>


            </div>




            {
                chartData && (

                    <Chart
                        data={chartData}
                    />

                )
            }


        </div>

    );

}


export default Chat;