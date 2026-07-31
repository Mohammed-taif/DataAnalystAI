import { useState } from "react";
import Upload from "./components/Upload";
import Chat from "./components/Chat";


function App() {

    const [datasetId, setDatasetId] = useState(null);


    return (

        <div>

            <h1>
                DataAnalystAI 🚀
            </h1>


            <Upload
                setDatasetId={setDatasetId}
            />


            {
                datasetId && (
                    <Chat
                        datasetId={datasetId}
                    />
                )
            }


        </div>

    );
}


export default App;