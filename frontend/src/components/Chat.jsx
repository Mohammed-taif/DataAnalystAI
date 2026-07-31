import { useState } from "react";
import API from "../api/api";
import Chart from "./Chart";


function Chat({ datasetId }) {


    const [question,setQuestion] = useState("");

    const [answer,setAnswer] = useState("");

    const [loading,setLoading] = useState(false);

    const [chartData,setChartData] = useState(null);



    const askQuestion = async()=>{


        if(!question) return;



        try{


            setLoading(true);

            setAnswer(
                "Analyzing data..."
            );



            const response =
                await API.post(
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
                response.data.analysis.data ||
                response.data.analysis
            );



        }
        catch(error){


            setAnswer(
                error.response?.data?.detail ||
                "Something went wrong"
            );


        }
        finally{


            setLoading(false);


        }


    };



    return (

        <div className="
            text-gray-900
            dark:text-white
        ">


            <h2 className="
                text-2xl
                font-bold
                mb-4
            ">

                🤖 Ask AI Analyst

            </h2>




            <div className="
                flex
                gap-3
            ">


                <input

                    value={question}

                    onChange={(e)=>
                        setQuestion(e.target.value)
                    }


                    placeholder="
                    Ask about your dataset...
                    "


                    className="
                        flex-1
                        border
                        rounded-xl
                        p-3

                        text-gray-900
                        dark:text-white

                        dark:bg-gray-800
                    "

                />



                <button

                    onClick={askQuestion}

                    disabled={loading}

                    className="
                        bg-blue-600
                        text-white

                        px-6
                        rounded-xl
                    "

                >

                    {
                        loading
                        ?
                        "Thinking..."
                        :
                        "Ask"
                    }


                </button>



            </div>




            <div className="
                mt-5
                bg-gray-100
                dark:bg-gray-800

                rounded-xl
                p-4

                text-gray-900
                dark:text-white
            ">

                {answer}

            </div>




            {
                chartData &&

                <Chart data={chartData}/>

            }


        </div>

    );

}


export default Chat;