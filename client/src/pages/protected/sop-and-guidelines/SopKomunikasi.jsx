import { useEffect, useState } from 'react'
import Reports from "../../../components/table/Reports"
import { getReports } from '../../../services/ReportServices'
import Modal from "../../../components/modal"
import ModalConfirm from "../../../components/modal/confirm"
import { LRUCache } from 'lru-cache'

const SopKomunikasi = () => {
    const [data, setData] = useState([])
    const cache = new LRUCache({ max: 5000 })

    useEffect(() => {
        const cachedData = cache.get('reports')
        if (cachedData) {
            setData(cachedData)
        } else {
            getReports(reports => {
                setData(reports)
                cache.set('reports', reports)
            })
        }
    }, [data])

    return (
        <>
            <Modal />
            <ModalConfirm />
            <Reports title={"SOP Komunikasi"} data={data} category="sop-and-guidelines" subcategory="sop-komunikasi"/>
        </>
    )
}

export default SopKomunikasi