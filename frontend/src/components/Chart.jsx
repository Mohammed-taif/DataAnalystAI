import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";


function Chart({ data }) {

    if (!data) return null;


    const chartData = Object.entries(data)
        .map(([name, value]) => ({
            name,
            value
        }));


    return (

        <div className="
            bg-white
            rounded-xl
            shadow
            p-6
            mt-6
        ">

            <h2 className="
                text-xl
                font-bold
                mb-4
            ">
                📊 Data Visualization
            </h2>


            <div
                style={{
                    width: "100%",
                    height: 400
                }}
            >

                <ResponsiveContainer>

                    <BarChart
                        data={chartData}
                    >

                        <CartesianGrid />


                        <XAxis
                            dataKey="name"
                        />


                        <YAxis />


                        <Tooltip />


                        <Bar
                            dataKey="value"
                        />

                    </BarChart>

                </ResponsiveContainer>


            </div>


        </div>

    );

}


export default Chart;