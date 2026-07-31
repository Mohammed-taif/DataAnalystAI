function DatasetCard({ data }) {

    if (!data) return null;


    return (

        <div className="
            bg-white
            rounded-xl
            shadow
            p-6
            mb-6
        ">


            <h2 className="
                text-2xl
                font-bold
                mb-6
            ">
                📄 Dataset Overview
            </h2>



            <div className="
                grid
                grid-cols-2
                md:grid-cols-3
                gap-4
            ">


                <div className="
                    bg-gray-100
                    rounded-lg
                    p-4
                ">

                    <p className="text-gray-500">
                        📄 File
                    </p>

                    <p className="font-bold mt-2 truncate">
                        {data.filename}
                    </p>

                </div>



                <div className="
                    bg-gray-100
                    rounded-lg
                    p-4
                ">

                    <p className="text-gray-500">
                        📊 Rows
                    </p>

                    <p className="text-2xl font-bold">
                        {data.rows}
                    </p>

                </div>



                <div className="
                    bg-gray-100
                    rounded-lg
                    p-4
                ">

                    <p className="text-gray-500">
                        🗂️ Columns
                    </p>

                    <p className="text-2xl font-bold">
                        {data.columns}
                    </p>

                </div>



                <div className="
                    bg-gray-100
                    rounded-lg
                    p-4
                ">

                    <p className="text-gray-500">
                        ⚠️ Missing Values
                    </p>

                    <p className="text-2xl font-bold">
                        {data.missing}
                    </p>

                </div>



                <div className="
                    bg-gray-100
                    rounded-lg
                    p-4
                ">

                    <p className="text-gray-500">
                        🔁 Duplicate Rows
                    </p>

                    <p className="text-2xl font-bold">
                        {data.duplicates}
                    </p>

                </div>


            </div>


        </div>

    );

}


export default DatasetCard;