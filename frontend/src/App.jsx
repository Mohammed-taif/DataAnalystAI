import { useState } from "react";

import Upload from "./components/Upload";
import Chat from "./components/Chat";
import DatasetCard from "./components/DatasetCard";


function App() {

    const [datasetId, setDatasetId] = useState(null);
    const [datasetInfo, setDatasetInfo] = useState(null);


    return (

        <div className="min-h-screen bg-gray-100 p-8">


            <div className="max-w-5xl mx-auto">


                {/* Header */}

                <div className="
                    bg-white
                    rounded-xl
                    shadow
                    p-6
                    mb-6
                ">

                    <h1 className="
                        text-4xl
                        font-bold
                    ">
                        DataAnalystAI 🚀
                    </h1>


                    <p className="
                        text-gray-600
                        mt-2
                    ">
                        AI Powered Data Analyst Dashboard
                    </p>

                </div>



                {/* Upload Card */}

                <div className="
                    bg-white
                    rounded-xl
                    shadow
                    p-6
                    mb-6
                ">

                    <Upload
                        setDatasetId={setDatasetId}
                        setDatasetInfo={setDatasetInfo}
                    />

                </div>



                {/* Dataset Information */}

                <DatasetCard
                    data={datasetInfo}
                />



                {/* Chat Card */}

                {
                    datasetId && (

                        <div className="
                            bg-white
                            rounded-xl
                            shadow
                            p-6
                            mb-6
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