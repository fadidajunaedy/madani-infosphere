import { NavLink } from "react-router-dom"
import { 
    HiOutlineSquares2X2, 
    HiOutlineNewspaper, 
    HiOutlineClipboard, 
    HiOutlineRectangleGroup, 
    HiOutlineBookmark, 
    HiChevronUp, 
    HiChevronDown,
    HiOutlineClipboardDocumentList,
    HiOutlineUsers,
    HiOutlineUserGroup,
    HiOutlineTag
} from "react-icons/hi2"
import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const Sidebar = () => {
    const [isOpenWhatIsUpMadani, setIsOpenWhatIsUpMadani] = useState(false)
    const [isOpenSOPGuidelines, setIsOpenSOPGuidelines] = useState(false)
    const [isOpenProgram, setIsOpenProgram] = useState(false)
    const [isOpenKnowledgeCenter, setIsOpenKnowledgeCenter] = useState(false)

    const { userData } = useContext(AuthContext)

    const toggleOpen = (section) => {

        switch (section) {
        case 'whatIsUpMadani':
            setIsOpenWhatIsUpMadani(!isOpenWhatIsUpMadani);
            break;
        case 'SOPGuidelines':
            setIsOpenSOPGuidelines(!isOpenSOPGuidelines);
            break;
        case 'program':
            setIsOpenProgram(!isOpenProgram);
            break;
        case 'knowledgeCenter':
            setIsOpenKnowledgeCenter(!isOpenKnowledgeCenter);
            break;
        default:
            break;
        }
    };
    return (
    <div className="drawer-side z-10">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
        <ul className="menu w-80 min-h-full bg-base-100 text-base-content shadow-lg p-0">
            <li className="w-full h-[9vh] flex justify-center items-start">
                <span className="text-2xl font-bold w-full"> Madani Infosphere</span>
            </li>
            <li className="w-full my-0">
                <NavLink to="/"><HiOutlineSquares2X2 size={24}/>&nbsp;Dashboard</NavLink>
            </li>
            <div className="divider my-1"></div>
            <li>
                <span
                className="cursor-pointer "
                onClick={() => toggleOpen('whatIsUpMadani')}
                >
                    <HiOutlineNewspaper size={24}/>&nbsp;What is up Madani? 
                    { isOpenWhatIsUpMadani ? <HiChevronDown size={16}/> : <HiChevronUp size={16}/> }
                </span>
                <ul
                    className={`subcategory-list ${
                    isOpenWhatIsUpMadani ? 'block' : 'hidden'
                    } transition-all duration-300 ease-in-out`}
                >
                    <li className="ml-7"><NavLink to="/weekly-update">Weekly Updates</NavLink></li>
                    <li className="ml-7"><NavLink to="/event-calendar">Event Calendar</NavLink></li>
                </ul>
            </li>
            
            <li>
                <span
                className="cursor-pointer "
                onClick={() => toggleOpen('SOPGuidelines')}
                >
                    <HiOutlineClipboard size={24}/>&nbsp;SOP & Guidelines
                    { isOpenSOPGuidelines ? <HiChevronDown /> : <HiChevronUp /> }
                </span>
                <ul
                    className={`subcategory-list ${
                    isOpenSOPGuidelines ? 'block' : 'hidden'
                    } transition-all duration-300 ease-in-out`}
                >
                    <li className="ml-7"><NavLink to="/sop-keuangan">SOP Keuangan</NavLink></li>
                    <li className="ml-7"><NavLink to="/sop-komunikasi">SOP Komunikasi</NavLink></li>
                    <li className="ml-7"><NavLink to="/sop-hrga">SOP HRGA</NavLink></li>
                </ul>
            </li>
            <li>
                <span
                    className="cursor-pointer"
                    onClick={() => toggleOpen('program')}
                >
                    <HiOutlineRectangleGroup size={24}/>&nbsp;Program
                    { isOpenProgram ? <HiChevronDown size={16}/> : <HiChevronUp size={16}/> }
                </span>
                <ul
                    className={`subcategory-list ${
                    isOpenProgram ? 'block' : 'hidden'
                    } transition-all duration-300 ease-in-out`}
                >
                    <li className="ml-7"><NavLink to="/hutan-dan-iklim">Hutan dan Iklim</NavLink></li>
                    <li className="ml-7"><NavLink to="/komoditas-berkelanjutan">Komoditas Berkelanjutan</NavLink></li>
                    <li className="ml-7"><NavLink to="/pembangunan-hijau">Pembangunan Hijau</NavLink></li>
                    <li className="ml-7"><NavLink to="/bioenergi">Bioenergi</NavLink></li>
                </ul>
            </li>
            <li>
                <span
                    className="cursor-pointer "
                    onClick={() => toggleOpen('knowledgeCenter')}
                >
                    <HiOutlineBookmark size={24}/>&nbsp;Knowledge Center
                    { isOpenKnowledgeCenter ? <HiChevronDown size={16}/> : <HiChevronUp size={16}/> }
                </span>
                <ul
                    className={`subcategory-list ${
                    isOpenKnowledgeCenter ? 'block' : 'hidden'
                    } transition-all duration-300 ease-in-out`}
                >
                    <li className="ml-7"><NavLink to="/rencana-strategis">Rencana Strategis</NavLink></li>
                    <li className="ml-7"><NavLink to="/publikasi-internal">Publikasi Internal</NavLink></li>
                    <li className="ml-7"><NavLink to="/materi-literasi">Materi Literasi</NavLink></li>
                    <li className="ml-7"><NavLink to="/peraturan-dan-regulasi">Peraturan dan Regulasi</NavLink></li>
                    <li className="ml-7"><NavLink to="/db-tabular">Database Tabular</NavLink></li>
                    <li className="ml-7"><NavLink to="/db-spasial">Database Spasial</NavLink></li>
                    <li className="ml-7"><NavLink to="/siaran-pers">Siaran Pers</NavLink></li>
                    <li className="ml-7"><NavLink to="/infografik">Infografik</NavLink></li>
                    <li className="ml-7"><NavLink to="/media-monitoring">Media Monitoring</NavLink></li>
                    <li className="ml-7"><NavLink to="/catatan-rapat">Catatan Rapat</NavLink></li>
                    <li className="ml-7"><NavLink to="/asset-digital">Asset Digital</NavLink></li>
                    <li className="ml-7"><NavLink to="/direktori-kontak">Direktori Kontak</NavLink></li>
                    <li className="ml-7"><NavLink to="/media-coverage">Media Coverage</NavLink></li>
                    <li className="ml-7"><NavLink to="/laporan-sosmed">Laporan Sosial Media</NavLink></li>
                </ul>
            </li>
            <div className="divider my-1"></div>
            
            <li className="w-full">
                <NavLink to="/documentation"><HiOutlineClipboardDocumentList size={24}/>&nbsp;Documentation</NavLink>
            </li>
            {(userData.role === "admin" || userData.role === "super-admin") && (
            <>
            <li className="w-full">
                <NavLink to="/users"><HiOutlineUserGroup size={24}/>&nbsp;Users</NavLink>
            </li>
            {userData.role === "super-admin" && (
            <li className="w-full">
                <NavLink to="/admins"><HiOutlineUsers size={24}/>&nbsp;Admins</NavLink>
            </li>
            )}
            <li className="w-full">
                <NavLink to="/tags"><HiOutlineTag size={24}/>&nbsp;Tags</NavLink>
            </li>
            </>
            )}
        </ul>
    </div>
    )
}

export default Sidebar