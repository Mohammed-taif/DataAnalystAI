import { useState } from "react";
import API from "../api/api";


function Upload({ setDatasetId }) {

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    const uploadFile = async () => {

        if (!file) {
            setMessage("Please select a CSV file");
            return;
        }


        const formData = new FormData();

        formData.append(
            "file",
            file
        );


        try {

            setLoading(true);
            setMessage("Uploading dataset...");


            const response = await API.post(
                "/upload/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    timeout: 120000
                }
            );


            setDatasetId(
                response.data.dataset_id
            );


            setMessage(
                "Upload successful ✅"
            );


        } catch (error) {

            console.log(error.response || error);

            setMessage(
                error.response?.data?.detail || error.message
            );


        } finally {

            setLoading(false);

        }
    };


    return (
        <div>

            <h2>
                Upload Dataset
            </h2>


            <input
                type="file"
                accept=".csv"
                onChange={(e) =>
                    setFile(e.target.files[0])
                }
                disabled={loading}
            />


            <button
                onClick={uploadFile}
                disabled={loading}
            >

                {
                    loading
                    ? "Uploading..."
                    : "Upload"
                }

            </button>


            {
                loading && (
                    <div>
                        <p>
                            Processing CSV file...
                        </p>

                        <progress />
                    </div>
                )
            }


            <p>
                {message}
            </p>

        </div>
    );
}


export default Upload;