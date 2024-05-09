import { FaChevronUp } from "react-icons/fa";
import { OverviewCard } from "../../fragments/OverviewCard";

export function Hero(){
    return(
        <div>
                <div className="flex gap-2">
                    <OverviewCard
                        title={"Income"}
                        total={"134.000"}
                        percent={"10"}
                    />
                    <OverviewCard
                        title={"Outcome"}
                        total={"24.000"}
                        percent={"2.5"}
                        color={"bg-gradient-to-br from-yellow-400 to-yellow-500"}
                    />
                </div>
                <div className="mt-2">
                    <OverviewCard
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