import { useEffect, useState } from 'react'
import TableUsers from '../../components/table/Users'
import { getUsers } from '../../services/UserServices'
import Modal from '../../components/modal'
import ModalConfirm from '../../components/modal/confirm'

const Users = () => {
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
            <TableUsers title={"Users"} data={users} />
        </>
    )
}

export default Users