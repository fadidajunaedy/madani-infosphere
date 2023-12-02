import { useEffect, useState } from "react"
import axios from "axios"

const SelectSubCategory = ({handleChangeOption, category, valueEdit, position, role}) => {
    const [subCategories, setSubCategories] = useState([]);

  const handleGetSubCategories = async () => {
    if (category) {
      const response = await axios.get(`http://localhost:4000/api/reports/categories/${position}/${category}?role=${role}`, { withCredentials: true });
      setSubCategories(response.data);
    } else {
      setSubCategories([])
    }
  };

  useEffect(() => {
    handleGetSubCategories();
  }, [category]);

    return (
        <div className="w-full flex flex-col md:flex-row justify-between md:items-center my-4">
            <label className="label">
                <span className="label-text font-bold">Sub Kategori</span>
            </label>
            <select 
                name="category" 
                className="select select-bordered w-full md:max-w-md" 
                onChange={ handleChangeOption }
                value={ valueEdit }
                disabled={ !category }
                required>
                <option value={null}>Pilih Sub Kategori</option>
                { subCategories.map((category, index) => (
                    <option key={ index } value={ category.value }>{ category.label }</option>
                )) }
            </select>
        </div>
    )
}

export default SelectSubCategory