import { Link } from "react-router-dom"
import { 
    HiCheck, 
    HiPencilSquare, 
    HiTrash, 
    HiDocumentPlus 
} from "react-icons/hi2"
import { getTags, createTag } from "../../services/TagService"
import { useEffect, useState } from "react"
import { useAlert } from "../../context/AlertContext"
import Alert from "../../components/elements/Alert"
import TagsTable from "../../components/table/Tags"
import ModalConfirm from "../../components/modal/confirm"

const Tags = () => {
    const [tags, setTags] = useState([])

    useEffect(() => {
        getTags(tag => {
            setTags(tag)
        })
    }, [tags])

    return (
        <>
            <ModalConfirm />
            <TagsTable title={"Tags"} data={tags} />
        </>
    )
}

export default Tags