const ButtonSubmit = ({children, className, type, onClick, disabled}) => {
    return (
        <button type={type} className={`btn bg-[#2AA39E] hover:bg-[#45c4bf] text-white ${className}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}

export default ButtonSubmit