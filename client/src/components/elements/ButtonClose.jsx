const ButtonClose = ({children, onClick}) => {
    return (
        <button type="button" className={`btn bg-[#176B87] hover:bg-[#2e8fb0] text-white`} onClick={onClick}>
            {children}
        </button>
    )
}

export default ButtonClose