const ButtonReset = ({children, onClick, disabled}) => {
    return (
        <button type="reset" className={`btn bg-[#749BC2] hover:bg-[#8db3d9] text-white`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}

export default ButtonReset