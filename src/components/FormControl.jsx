export default function FormControl({
    name,
    type,
    id,
    value,
    labelText,
    onChange,
    ...props
}) {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="block mb-1 text-black font-bold">
                {labelText}
            </label>
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                {...props}
                onChange={onChange}
                className="block p-2 px-3 font-medium text-black border border-gray-300 text-base rounded w-full"
            />
        </div>
    );
}
