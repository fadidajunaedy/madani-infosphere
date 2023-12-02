import { 
    HiOutlineNewspaper, 
    HiOutlineClipboard, 
    HiOutlineRectangleGroup, 
    HiOutlineBookmark
} from "react-icons/hi2"
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getReports } from '../../services/ReportServices'
import { getContacts } from '../../services/contactServices'
import Hero from "../../images/hero.jpg"
import Alert from '../../components/elements/Alert'
import Datepicker from "react-tailwindcss-datepicker"
import SelectTags from '../../components/elements/SelectTags'
import moment from "moment"

const Dashboard = () => {
    // const [dateRange, setDateRange] = useState({
    //     startDate: moment().startOf('month').format('YYYY-MM-DD'),
    //     endDate: moment().endOf('month').format('YYYY-MM-DD'),
    // })
    const [startDate, setStartDate] = useState(moment().startOf('month').format('YYYY-MM-DD'))
    const [endDate, setEndDate] = useState(moment().endOf('month').format('YYYY-MM-DD'))
    
    const [reports, setReports] = useState([])
    const [whatMadaniCount, setWhatMadaniCount] = useState(null)
    const [sopCount, setSopCount] = useState(null)
    const [programCount, setProgramCount] = useState(null)
    const [knowledgeCenterCount, setKnowledgeCenterCount] = useState(null)
    const [directoryContactCount, setDirectoryContactCount] = useState(null)

    const [keyword, setKeyword] = useState("")
    const [tags, setTags] = useState([])

    const navigate = useNavigate()

    const handleValueDate = newValue => {
        setWhatMadaniCount(null)
        setSopCount(null)
        setProgramCount(null)
        setKnowledgeCenterCount(null)
        setDirectoryContactCount(null)
        setDateRange(newValue)
    }

    const handleValueStartDate = e => {
        // setWhatMadaniCount(null)
        // setSopCount(null)
        // setProgramCount(null)
        // setKnowledgeCenterCount(null)
        // setDirectoryContactCount(null)
        // setDateRange(newValue)
        console.log(e.target.value)
    }

    const handleValueEndDate = e => {
        // setWhatMadaniCount(null)
        // setSopCount(null)
        // setProgramCount(null)
        // setKnowledgeCenterCount(null)
        // setDirectoryContactCount(null)
        // setDateRange(newValue)
        console.log(e.target.value)
    }

    const handleSearchData = async (e) => {
        e.preventDefault()

        if (keyword.length === 0) {
            return 
        }
        navigate(`/reports?keyword=${keyword}`)
    }
    
    useEffect(() => {

        getReports(data => {
            const reportsInDateRange = data.filter(report => {
                const createdAtDate = moment(report.createdAt).format('YYYY-MM-DD')
                return createdAtDate >= startDate && createdAtDate <= endDate;
            })
            setReports(reportsInDateRange)
            setWhatMadaniCount(reportsInDateRange.filter(report => report.subcategory === "weekly-update").length);
        
            setSopCount(reportsInDateRange.filter(report => 
                report.subcategory === "sop-keuangan" || 
                report.subcategory === "sop-komunikasi" ||
                report.subcategory === "sop-hrga"
            ).length);
        
            setProgramCount(reportsInDateRange.filter(report => 
                report.subcategory === "hutan-dan-iklim" || 
                report.subcategory === "komoditas-berkelanjutan" ||
                report.subcategory === "pembangunan-hijau" ||
                report.subcategory === "bioenergi"
            ).length);
        
            setKnowledgeCenterCount(reportsInDateRange.filter(report => 
                report.subcategory === "rencana-strategis" || 
                report.subcategory === "publikasi-internal" ||
                report.subcategory === "materi-literasi" ||
                report.subcategory === "peraturan-dan-regulasi" ||
                report.subcategory === "db-tabular" ||
                report.subcategory === "db-spasial" ||
                report.subcategory === "siaran-pers" ||
                report.subcategory === "infografik" ||
                report.subcategory === "catatan-rapat" ||
                report.subcategory === "media-coverage" ||
                report.subcategory === "report-sosmed" ||
                report.subcategory === "bioenergi"
            ).length);

        })

        getContacts(data => {
            const contactsInCurrentMonth = data.filter(report => {
                const createdAtDate = moment(report.createdAt).format('YYYY-MM-DD')
                return createdAtDate >= startDate && createdAtDate <= endDate;
            })
            setDirectoryContactCount(contactsInCurrentMonth.length)
        })
    }, [startDate, endDate])
    

    return (
        <div data-aos="fade-up">
            <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-4 mb-4">
                    <span className="font-semibold">
                        Periode Data
                    </span>
                    <div className="flex items-center gap-2">
                        <input type="date" name="startDate" className="input input-bordered" onChange={handleValueStartDate} value={startDate}/>
                    </div>
                    <span className="">
                        -
                    </span>
                    <div className="flex items-center gap-2">
                        <input type="date" name="startDate" className="input input-bordered" onChange={handleValueEndDate} value={endDate}/>
                    </div>
                </div>
                {/* <div className="">
                    
                    <Datepicker 
                    containerClassName="w-72" 
                    value={dateRange} 
                    inputClassName="input input-bordered w-72"
                    toggleClassName="invisible"
                    popoverDirection="down"
                    displayFormat={"DD MM YYYY"} 
                    onChange={handleValueDate} 
                    showShortcuts={true}
                    /> 
                </div> */}
                {/* <div className='ml-auto flex justify-start items-start prose-lg'>
                    <Link to="/documentation" className="btn btn-ghost">About</Link>
                    <Link to="/documentation" className="btn btn-ghost">FAQ</Link>
                </div> */}
            </div>
            <Alert />
           
            <div className="card bg-[#176B87] text-white grid grid-cols-1 sm:grid-cols-2 overflow-hidden 
            h-[300px]  sm:h drop-shadow-lg shadow-green-800 mb-2" >
                 
                <div className="px-6 py-12 flex flex-col justify-end prose-sm">
                    
                    <div>
                        <h1 className="font-bold mb-0">Madani Infosphere</h1>
                    </div>
                    <div>
                    <h3 className="font-bold mb-4">Selamat Datang!</h3>
                    <p>
                        Dapatkan beragam pengetahuan dan informasi terpadu terkait 
                        kerja-kerja MADANI berkelanjutan yang dapat mendukung kinerja anda
                    </p>
                    </div>
                </div>
                <figure className="rounded-none hidden sm:block">
                    <img src={Hero} className="h-[100%] w-full object-cover hidden sm:block" alt="" />
                </figure>
            </div>
           
            <div className="flex flex-col gap-4 items-center py-4 mb-2 prose-sm">
                <h3 className="text-lg font-bold">Apa yang kamu butuhkan ?</h3>
                <div className="w-full md:max-w-md flex gap-4">
                    <form className="w-full flex items-center gap-2" onSubmit={handleSearchData}>
                        <input 
                        type="text"
                        placeholder="Cari berdasarkan keyword dan tag..."
                        onChange={(e) => setKeyword(e.target.value)}
                        value={keyword}
                        className="input input-bordered w-full"
                        required/>
                        <button 
                        type="submit"
                        className="btn bg-[#176B87] hover:bg-[#7EB0C4] text-white px-4"
                        >Cari</button>
                        {/* <SelectTags handleChangeOption={(e) => {
                            const selectedTags = e.map(option => option.value);
                            setTags(selectedTags)
                        }} valueEdit={tags}/> */}
                    </form>
                    {/* <Link to={tags.length > 0 ? `/reports?tags=${tags}` : ''}
                        className='btn btn-primary min-h-full text-base-200 font-semibold'>
                        Cari
                    </Link> */}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 prose-sm">
                <Link to="/weekly-update" className="stat bg-[#7EB0C4] rounded-lg drop-shadow-lg">
                    <div className="text-white stat-title font-bold">What's up Madani</div>
                    <div className="text-white stat-value flex items-center"><HiOutlineNewspaper size={32} className="mr-2"/>
                        {whatMadaniCount === null ? <span className="loading loading-dots loading-md"></span> : whatMadaniCount}
                    </div>
                </Link>
                <Link to="/hutan-dan-iklim" className="stat bg-[#749BC2] rounded-lg drop-shadow-lg">
                    <div className="text-white stat-title font-bold">Program</div>
                    <div className="text-white stat-value flex items-center"><HiOutlineClipboard size={32} className="mr-2"/>
                        {programCount === null ? <span className="loading loading-dots loading-md"></span> : programCount}
                    </div>
                </Link>
                <Link to="/rencana-strategis" className="stat bg-[#6286A3] rounded-lg drop-shadow-lg">
                    <div className="text-white stat-title font-bold">Knowledge Center</div>
                    <div className="text-white stat-value flex items-center"><HiOutlineRectangleGroup size={32} className="mr-2"/>
                        {knowledgeCenterCount === null ? <span className="loading loading-dots loading-md"></span> : knowledgeCenterCount}
                    </div>
                </Link>    
                <Link to="/direktori-kontak" className="stat bg-[#57788E] rounded-lg drop-shadow-lg">
                    <div className="text-white stat-title font-bold">Direktori Kontak</div>
                    <div className="text-white stat-value flex items-center"><HiOutlineBookmark size={32} className="mr-2"/>
                        {directoryContactCount === null ? <span className="loading loading-dots loading-md"></span> : directoryContactCount}
                    </div>
                </Link>    
            </div>
        </div>
    )
}

export default Dashboard