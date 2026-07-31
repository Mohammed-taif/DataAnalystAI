import { motion } from "framer-motion";


function InsightsCard({ insights }) {


    if (!insights) return null;



    return (

        <motion.div

            initial={{
                opacity:0,
                y:20
            }}

            animate={{
                opacity:1,
                y:0
            }}

            className="
                bg-white
                dark:bg-gray-900

                rounded-2xl
                shadow

                p-6
                mb-6

                text-gray-900
                dark:text-white
            "

        >


            <h2 className="
                text-2xl
                font-bold
                mb-5
            ">

                💡 Quick Insights

            </h2>



            <div className="
                grid
                md:grid-cols-4
                gap-4
            ">


                <div className="
                    bg-blue-100
                    dark:bg-blue-900

                    rounded-xl
                    p-4
                ">

                    <p className="
                        text-sm
                        text-gray-600
                        dark:text-gray-300
                    ">
                        Total Sales
                    </p>


                    <h3 className="
                        text-xl
                        font-bold
                    ">
                        ${insights.total_sales}
                    </h3>

                </div>





                <div className="
                    bg-green-100
                    dark:bg-green-900

                    rounded-xl
                    p-4
                ">

                    <p className="
                        text-sm
                        text-gray-600
                        dark:text-gray-300
                    ">
                        Total Profit
                    </p>


                    <h3 className="
                        text-xl
                        font-bold
                    ">
                        ${insights.total_profit}
                    </h3>

                </div>





                <div className="
                    bg-purple-100
                    dark:bg-purple-900

                    rounded-xl
                    p-4
                ">


                    <p className="
                        text-sm
                        text-gray-600
                        dark:text-gray-300
                    ">
                        Avg Discount
                    </p>


                    <h3 className="
                        text-xl
                        font-bold
                    ">
                        {insights.average_discount}%
                    </h3>


                </div>





                <div className="
                    bg-orange-100
                    dark:bg-orange-900

                    rounded-xl
                    p-4
                ">


                    <p className="
                        text-sm
                        text-gray-600
                        dark:text-gray-300
                    ">
                        Top Category
                    </p>


                    <h3 className="
                        text-xl
                        font-bold
                    ">
                        {insights.top_category}
                    </h3>


                </div>



            </div>


        </motion.div>

    );

}


export default InsightsCard;