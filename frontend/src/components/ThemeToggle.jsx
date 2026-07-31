import { useState } from "react";


function ThemeToggle() {


    const [dark, setDark] = useState(
        document.documentElement.classList.contains("dark")
    );



    const toggle = () => {


        const html =
            document.documentElement;



        if(html.classList.contains("dark")){


            html.classList.remove(
                "dark"
            );


            setDark(false);


        }
        else{


            html.classList.add(
                "dark"
            );


            setDark(true);


        }


    };



    return (

        <button

            onClick={toggle}

            className="
                px-5
                py-2
                rounded-xl

                bg-blue-600
                hover:bg-blue-700

                text-white

                transition
            "

        >

            {
                dark
                ?
                "☀️ Light"
                :
                "🌙 Dark"
            }

        </button>

    );

}


export default ThemeToggle;