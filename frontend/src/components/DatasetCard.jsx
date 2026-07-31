import { motion } from "framer-motion";


function DatasetCard({ data }) {


    if (!data) return null;


    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 20
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            className="
                bg-white
                dark:bg-gray-900

                text-gray-900
                dark:text-white

                rounded-2xl
                shadow

                p-6
                mb-6
            "

        >


            <h2 className="
                text-2xl
                font-bold
                mb-5

                text-gray-900
                dark:text-white
            ">

                📄 Dataset Overview

            </h2>



            <div className="
                space-y-3

                text-gray-700
                dark:text-gray-200
            ">


                <p>
                    <span className="font-bold">
                        Filename:
                    </span>

                    {" "}
                    {data.filename}

                </p>



                <p>

                    <span className="font-bold">
                        Rows:
                    </span>

                    {" "}
                    {data.rows}

                </p>



                <p>

                    <span className="font-bold">
                        Columns:
                    </span>

                    {" "}
                    {data.columns}

                </p>



                <p>

                    <span className="font-bold">
                        Missing Values:
                    </span>

                    {" "}
                    {data.missing}

                </p>



                <p>

                    <span className="font-bold">
                        Duplicate Rows:
                    </span>

                    {" "}
                    {data.duplicates}

                </p>


            </div>


        </motion.div>

    );

}


export default DatasetCard;