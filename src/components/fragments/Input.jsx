export function Input({htmlFor, label, onChange, placeholder, type, name, id, value}){
    return(
        <div className="flex flex-col gap-2">
        <label 
            htmlFor={htmlFor} className="text-neutral-500 text-sm"
        >{label}
        </label>
        <input 
            onChange={onChange}
            type={type} 
            name={name} 
            id={id}
            value={value && value}
            placeholder={placeholder}
            className="outline-none focus:border-violet-400 border-b-2 bg-violet-50 rounded-sm px-4 py-1"
        />
        <p className="text-yellow-500 text-xs">{name == "name" ? "* optional" : ""}</p>
        </div>
    )
}