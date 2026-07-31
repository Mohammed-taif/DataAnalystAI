import { useState } from "react";
import API from "../api/api";


function Upload({ setDatasetId, setDatasetInfo, setInsights }) {


    const [file, setFile] = useState(null);

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);



    const uploadFile = async () => {


        if (!file) {

            setMessage(
                "Please select a CSV file"
            );

            return;

        }



        const formData = new FormData();


        formData.append(
            "file",
            file
        );



        try {


            setLoading(true);

            setMessage(
                "Uploading dataset..."
            );



            const response = await API.post(

                "/upload/",

                formData,

                {

                    headers: {

                        "Content-Type":
                        "multipart/form-data"

                    },

                    timeout:120000

                }

            );




            setDatasetId(
                response.data.dataset_id
            );



            setDatasetInfo({

                filename:
                response.data.filename,


                rows:
                response.data.profile.rows,


                columns:
                response.data.profile.columns,


                missing:
                response.data.profile.missing_values,


                duplicates:
                response.data.profile.duplicate_rows

            });



            setInsights(
                response.data.insights
            );



            setMessage(
                "Upload successful ✅"
            );



        }
        catch(error){


            console.log(error);


            setMessage(

                error.response?.data?.detail ||
                "Upload failed ❌"

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

                text-gray-900
                dark:text-white
            ">

                📂 Upload Dataset

            </h2>




            <input

                type="file"

                accept=".csv"


                onChange={(e)=>

                    setFile(
                        e.target.files[0]
                    )

                }


                disabled={loading}


                className="

                    block

                    w-full

                    text-gray-900
                    dark:text-white

                    file:mr-4
                    file:py-2
                    file:px-4

                    file:rounded-xl

                    file:border-0

                    file:bg-blue-600
                    file:text-white

                    hover:file:bg-blue-700

                    dark:file:bg-blue-500

                "

            />





            <button


                onClick={uploadFile}


                disabled={loading}


                className="

                    mt-4

                    bg-blue-600

                    hover:bg-blue-700

                    text-white

                    px-6
                    py-2

                    rounded-xl

                    transition

                    disabled:bg-gray-400

                "


            >


                {

                    loading

                    ?

                    "Uploading..."

                    :

                    "Upload"

                }


            </button>





            {

                loading && (


                    <div className="
                        mt-4

                        text-gray-700
                        dark:text-gray-300
                    ">


                        <p>
                            Processing CSV file...
                        </p>


                        <div className="
                            w-full
                            bg-gray-300
                            dark:bg-gray-700

                            rounded-full
                            h-3
                            mt-2
                        ">


                            <div className="
                                bg-blue-600
                                h-3
                                rounded-full
                                animate-pulse
                                w-2/3
                            ">


                            </div>


                        </div>


                    </div>


                )

            }





            <p className="

                mt-4

                text-gray-700

                dark:text-gray-300

            ">

                {message}

            </p>



        </div>


    );


}


export default Upload;