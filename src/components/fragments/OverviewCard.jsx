/* eslint-disable react/prop-types */
export function OverviewCard({title, total, percent, color, width, textColor, children, subTextColor, titleSize, id}){
    return(
        <div id={id} className={`rounded-lg px-5 flex items-center justify-between ${width ? width : 'w-1/2'} shadow-soft py-4 ${textColor ? textColor : "text-white"} ${color ? color : "bg-gradient-to-br from-violet-400 to-violet-500"}`}>
            <div>
                <h1 className="font-medium text-sm">{title}</h1>
                <h1 className={`font-semibold text-xl mt-2 ${titleSize ? titleSize : "text-xl"}`}>Rp. {total}</h1>
                <p className={`text-xs ${subTextColor ? subTextColor : "text-neutral-100"} mt-1`}>+{percent}% than usual</p>
            </div>
            {children && children}
        </div>
    )
}