import { useEffect, useState } from 'react'
import TableContacts from '../../../components/table/Contacts'
import { getContacts } from '../../../services/contactServices'
import Modal from '../../../components/modal'
import ModalConfirm from '../../../components/modal/confirm'
import { LRUCache } from 'lru-cache'

const DirektoriKontak = () => {
    const [contacts, setContacts] = useState([])
    const cache = new LRUCache({ max: 5000 })

    useEffect(() => {
        const cachedContacts = cache.get('contacts')
        if (cachedContacts) {
            setContacts(cachedContacts)
        } else {
            getContacts(contacts => {
                setContacts(contacts)
                cache.set('contacts', contacts)
            })
        }
    }, [contacts])

    return (
        <>
            <Modal />
            <ModalConfirm />
            <TableContacts title={"Direktori Kontak"} data={contacts} />
        </>
    )
}

export default DirektoriKontak