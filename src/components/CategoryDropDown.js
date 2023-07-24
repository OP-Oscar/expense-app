import React, {useState, useEffect} from 'react'
import axios from 'axios'



function CategoryDropDown() {
  //managing state of category drop down
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const url = "http://localhost:5050";

  useEffect(() => {
    // axios categories from the backend
    axios.get(`${url}/category`)
      .then((res) => setCategories(res.data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <label>Select Category</label>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.category_id} value={category.category_name}>  {/* category.id => category.category_id*/}
            {category.category_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropDown