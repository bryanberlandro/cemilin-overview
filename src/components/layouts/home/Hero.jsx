import { FaChevronUp } from "react-icons/fa";
import { OverviewCard } from "../../fragments/OverviewCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export function Hero({orderData}){

    useGSAP(() => {
        gsap.from("#box1", {
            x: -50, // Mulai dari bawah
            opacity: 0, // Opacity awal
            duration: 1, // Durasi animasi
            ease: "expo.inOut",
        })
        gsap.from("#box2", {
            x: 50, // Mulai dari bawah
            opacity: 0, // Opacity awal
            duration: 2, // Durasi animasi
            ease: "expo.inOut",
        })
        gsap.from("#box3", {
            y: 50, // Mulai dari bawah
            opacity: 0,
            duration: 3, // Durasi animasi
            ease: "expo.inOut",
            // height: 0,
        })
    })


    return(
        <div>
                <div className="flex gap-2">
                    <OverviewCard
                        id={"box1"}
                        title={"Income"}
                        total={"134.000"}
                        percent={"10"}
                    />
                    <OverviewCard
                        id={"box2"}
                        title={"Outcome"}
                        total={"24.000"}
                        percent={"2.5"}
                        color={"bg-gradient-to-br from-yellow-400 to-yellow-500"}
                    />
                </div>
                <div className="mt-2">
                    <OverviewCard
                        id={"box3"}
                        title={"Total Profit"}
                        total={"114.000"}
                        percent={"15"}
                        width={"full"}
                        color={"bg-white"}
                        textColor={"black"}
                        titleSize={"text-3xl"}
                        subTextColor={"text-violet-600"}
                    >
                        <div className="text-violet-500 items-center h-full justify-center flex flex-col">
                            <FaChevronUp className="text-2xl"/>
                            <FaChevronUp className="-mt-2 text-violet-400 text-lg"/>
                            <FaChevronUp className="text-sm -mt-1 text-violet-300"/>
                        </div>
                    </OverviewCard>
                </div>
            </div>
    )
}