import API from "../api/api";


function ReportButton({ datasetInfo, insights, explanation }) {


    const downloadReport = async () => {


        try {


            const response = await API.post(
                "/report/",
                {
                    filename: datasetInfo?.filename || "dataset.csv",

                    insights: insights,

                    explanation: explanation || "No AI analysis available."
                },

                {
                    responseType: "blob"
                }
            );



            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );


            const link = document.createElement("a");


            link.href = url;


            link.download = "DataAnalystAI_Report.pdf";


            document.body.appendChild(link);


            link.click();


            link.remove();



        }

        catch(error) {

            console.error(
                "Report generation failed",
                error
            );

            alert(
                "Could not generate report"
            );

        }

    };



    return (

        <button

            onClick={downloadReport}

            className="
                bg-green-600
                text-white
                px-6
                py-3
                rounded-lg
                hover:bg-green-700
            "

        >

            📄 Download Report

        </button>

    );

}


export default ReportButton;