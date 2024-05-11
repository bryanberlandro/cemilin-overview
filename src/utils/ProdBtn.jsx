import { Loader } from "../components/fragments/Loader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/* eslint-disable react/prop-types */
const ProdBtn = ({data, chosenProduct, setChosenProduct}) => {

    useGSAP(() => {
        gsap.from("#btn663b3f3fab6acf0390fcef07", {
            opacity: 0,
            x: -20,
            duration: 0.5,
            ease: "expo.inOut"
        })
        gsap.from("#btn663b3f65ab6acf0390fcef09", {
            opacity: 0,
            x: -20,
            duration: 1,
            ease: "expo.inOut"
        })
        gsap.from("#btn663b3f74ab6acf0390fcef0b", {
            opacity: 0,
            x: -20,
            duration: 1.5,
            ease: "expo.inOut"
        })
        gsap.from("#btn663b40deaee0537dbeff5903", {
            opacity: 0,
            x: -20,
            duration: 2,
            ease: "expo.inOut"
        })
    })

    function handleChooseProd(product){
        const sameProduct = data.find(prod => product._id == prod._id)
        if(sameProduct){
            setChosenProduct(sameProduct)
        }
    }

    if(!data){
        return(
            <Loader/>
        )
    }

    return(
        <>
        {
            data.map(dt => (
                <div 
                key={dt._id}
                id={`btn${dt._id}`} 
                onClick={() => handleChooseProd(dt)} 
                className={`rounded-lg border-2 px-4 py-1 text-sm cursor-pointer  hover:border-violet-400 hover:text-violet-500 ${chosenProduct?._id == dt._id ? "border-violet-400 text-violet-500 scale-[.98]" : "border-neutral-400 text-neutral-500"}`}
                >
                    <h1>{dt.name}</h1>
                </div>
            ))
        }
        </>
    )
}

export default ProdBtn;