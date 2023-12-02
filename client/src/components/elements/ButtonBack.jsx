import { HiArrowUturnLeft } from "react-icons/hi2"

const ButtonBack = ({marginButton = "mb-4"}) => {
    return (
        <button type="button" className={`btn bg-[#176B87] hover:bg-[#749BC2] text-white ${marginButton}`} onClick={() => window.history.back()}><HiArrowUturnLeft /> Kembali</button>
    )
}

export default ButtonBack