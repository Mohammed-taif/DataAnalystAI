import {

    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid

} from "recharts";



function Chart({ data }) {


    if (!data || typeof data !== "object") {

        return null;

    }



    const chartData =
        Object.entries(data).map(
            ([name,value]) => ({

                name,

                value

            })
        );



    const colors = [

        "#2563eb",
        "#16a34a",
        "#9333ea",
        "#ea580c",
        "#dc2626"

    ];



    return (


        <div className="
            bg-white
            dark:bg-gray-900
            rounded-2xl
            shadow
            p-6
            mt-6
        ">


            <h2 className="
                text-2xl
                font-bold
                mb-6
                dark:text-white
            ">

                📊 Data Visualization

            </h2>




            <ResponsiveContainer

                width="100%"

                height={350}

            >


                <BarChart

                    data={chartData}

                >


                    <CartesianGrid

                        strokeDasharray="3 3"

                    />


                    <XAxis

                        dataKey="name"

                    />


                    <YAxis />



                    <Tooltip />



                    <Bar

                        dataKey="value"

                        radius={[
                            10,
                            10,
                            0,
                            0
                        ]}

                        fill="#2563eb"

                    />



                </BarChart>


            </ResponsiveContainer>



        </div>


    );

}


export default Chart;