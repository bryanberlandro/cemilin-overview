export function Input({htmlFor, label, onChange, placeholder, type, name, id, value}){
    return(
        <>
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
            className="outline-none focus:border-violet-400 border-2 rounded-lg px-4 py-1"
        />
        </>
    )
}