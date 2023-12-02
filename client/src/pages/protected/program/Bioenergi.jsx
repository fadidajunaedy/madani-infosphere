import { useEffect, useState } from 'react'
import Reports from "../../../components/table/Reports"
import { getReports } from '../../../services/ReportServices'
import Modal from "../../../components/modal"
import ModalConfirm from "../../../components/modal/confirm"
import ProgramLink from '../../../components/elements/ProgramLink'
import { LRUCache } from 'lru-cache'

const Bioenergi = () => {
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
            <ProgramLink />
            <Reports title={"Bioenergi"} data={data} category="program" subcategory="bioenergi"/>
        </>
    )
}

export default Bioenergi