import Select from 'react-select'
import { getTags } from '../../services/TagService'
import { useEffect, useState } from 'react'
const SelectTags = ({handleChangeOption, valueEdit = []}) => {
    const [tags, setTags] = useState([])

    useEffect(() => {
        getTags(tag => {
            setTags(tag)
        })
        
    }, [])
    const formatedTags = tags.map(tag => ({
        label: tag.title,
        value: tag.title
    }))
    return (
        
            <Select
                value={valueEdit.map(tag => ({ label: tag, value: tag }))}
                name="tags"
                isMulti
                options={formatedTags}
                className="basic-multi-select select-bordered w-full lg:max-w-md rounded-lg"
                classNamePrefix="select"
                onChange={handleChangeOption}
                required
                
            />
    )
}

export default SelectTags