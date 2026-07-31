import { useState } from "react";
import API from "../api/api";


function Upload({ setDatasetId, setDatasetInfo }) {

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


            // Save dataset id for Chat
            setDatasetId(
                response.data.dataset_id
            );


            // Save dataset information
            setDatasetInfo({
                filename: response.data.filename,
                rows: response.data.profile.rows,
                columns: response.data.profile.columns,
                missing: response.data.profile.missing_values,
                duplicates: response.data.profile.duplicate_rows
            });


            setMessage(
                "Upload successful ✅"
            );


        } catch (error) {

            console.log(error);

            setMessage(
                error.response?.data?.detail ||
                "Upload failed ❌"
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <div>

            <h2 className="text-2xl font-bold mb-4">
                📂 Upload Dataset
            </h2>


            <input
                className="
                    border
                    p-2
                    rounded-lg
                    mb-4
                    block
                "
                type="file"
                accept=".csv"
                onChange={(e) =>
                    setFile(e.target.files[0])
                }
                disabled={loading}
            />


            <button

                className="
                    bg-blue-600
                    text-white
                    px-5
                    py-2
                    rounded-lg
                    hover:bg-blue-700
                    transition
                    disabled:bg-gray-400
                "

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

                    <div className="mt-4">

                        <p>
                            Processing CSV file...
                        </p>

                        <progress />

                    </div>

                )
            }


            <p className="mt-3">
                {message}
            </p>


        </div>

    );

}


export default Upload;