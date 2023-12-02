import { useEffect, useState } from 'react'
import TableAdmins from "../../components/table/Admins"
import { getUsers } from '../../services/UserServices'
import Modal from '../../components/modal'
import ModalConfirm from '../../components/modal/confirm'

const Admins = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers(user => {
            setUsers(user)
        })
    }, [users])

    return (
        <>
            <Modal />
            <ModalConfirm />
            <TableAdmins title={"Admins"} data={users} />
        </>
    )
}

export default Admins