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


    if (!data) {
        return null;
    }


    const chartData = Object.entries(data)
        .map(([name, value]) => ({
            name,
            value
        }));


    return (

        <div style={{ width: "600px", height: "400px" }}>

            <h2>
                Data Visualization 📊
            </h2>


            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <BarChart data={chartData}>

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

    );
}


export default Chart;