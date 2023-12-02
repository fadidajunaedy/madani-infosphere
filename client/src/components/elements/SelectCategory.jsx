import axios from "axios"
import { useEffect, useState } from "react"

const SelectCategory = ({handleChangeOption, valueEdit, position, role}) => {
    const [categories, setCategories] = useState([])
    const handleGetCategories = async () => {
        const response = await axios.get(`http://localhost:4000/api/reports/categories/${position}?role=${role}`, {withCredentials: true})
        setCategories(response.data)
    }
    useEffect(() => {
        handleGetCategories()
    }, [])

    return (
        <div className="w-full flex flex-col md:flex-row justify-between md:items-center my-4">
            <label className="label">
                <span className="label-text font-bold">Kategori</span>
            </label>
            <select 
                name="category" 
                className="select select-bordered w-full md:max-w-md" 
                onChange={handleChangeOption}
                value={valueEdit}
                required>
                <option value={null}>Pilih Kategori</option>
                {categories.map((category, index) => (
                    <option key={index} value={category.value}>{category.category}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectCategory