import { Link } from "react-router-dom"

const ButtonLink = ({children, to, onClick, disabled}) => {
    return (
        <Link to={to} className={`btn bg-[#2AA39E] hover:bg-[#749BC2] text-white`}>
            {children}
        </Link>
    )
}

export default ButtonLink