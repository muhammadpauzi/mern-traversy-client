export default function Container({ children, ...props }) {
    return (
        <div className="max-w-4xl mx-auto block px-2" {...props}>
            {children}
        </div>
    );
}
