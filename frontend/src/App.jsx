import { useState } from "react";

import Upload from "./components/Upload";
import Chat from "./components/Chat";
import DatasetCard from "./components/DatasetCard";
import InsightsCard from "./components/InsightsCard";
import ReportButton from "./components/ReportButton";
import ThemeToggle from "./components/ThemeToggle";


function App() {


    const [datasetId, setDatasetId] = useState(null);

    const [datasetInfo, setDatasetInfo] = useState(null);

    const [insights, setInsights] = useState(null);



    return (

        <div className="
            min-h-screen
            p-8

            bg-white
            dark:bg-black

            transition-colors
            duration-300
        ">


            <div className="
                max-w-6xl
                mx-auto
            ">



                {/* HEADER */}

                <div className="
                    bg-white
                    dark:bg-gray-900

                    text-gray-900
                    dark:text-white

                    rounded-2xl
                    shadow

                    p-8
                    mb-6

                    flex
                    justify-between
                    items-start
                ">


                    <div>


                        <h1 className="
                            text-5xl
                            font-extrabold

                            bg-gradient-to-r
                            from-blue-600
                            to-purple-600

                            text-transparent
                            bg-clip-text
                        ">

                            DataAnalystAI 🚀

                        </h1>



                        <p className="
                            mt-3
                            text-lg

                            text-gray-600
                            dark:text-gray-300
                        ">

                            AI Powered Data Analytics Platform

                        </p>



                        <p className="
                            mt-2
                            text-sm

                            text-gray-500
                            dark:text-gray-400
                        ">

                            Upload • Analyze • Ask Questions • Generate Reports

                        </p>


                    </div>



                    <ThemeToggle />


                </div>





                {/* UPLOAD */}


                <div className="
                    bg-white
                    dark:bg-gray-900

                    text-gray-900
                    dark:text-white

                    rounded-2xl
                    shadow

                    p-6
                    mb-6
                ">


                    <Upload

                        setDatasetId={setDatasetId}

                        setDatasetInfo={setDatasetInfo}

                        setInsights={setInsights}

                    />


                </div>





                {
                    datasetInfo && (

                        <DatasetCard

                            data={datasetInfo}

                        />

                    )
                }





                {
                    insights && (

                        <InsightsCard

                            insights={insights}

                        />

                    )
                }





                {
                    insights && (

                        <div className="mb-6">


                            <ReportButton

                                datasetInfo={datasetInfo}

                                insights={insights}

                                explanation="
                                AI generated analysis from DataAnalystAI
                                "

                            />


                        </div>

                    )
                }





                {
                    datasetId && (

                        <div className="
                            bg-white
                            dark:bg-gray-900

                            text-gray-900
                            dark:text-white

                            rounded-2xl
                            shadow

                            p-6
                        ">


                            <Chat

                                datasetId={datasetId}

                            />


                        </div>

                    )
                }



            </div>


        </div>

    );

}


export default App;