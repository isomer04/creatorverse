import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from  '../client'; 

function AddCreator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { data, error } = await supabase.from('creators').insert([formData]);

    if (error) {
      console.error('Error adding creator:', error);
    } else {
      console.log('Creator added:', data);
      navigate('/');
    }
  }

  return (
    <div>
      <h1>Add New Creator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>URL:</label>
          <input type="text" name="url" value={formData.url} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label>Image URL (Optional):</label>
          <input type="text" name="imageURL" value={formData.imageURL} onChange={handleChange} />
        </div>
        <button type="submit">Add Creator</button>
      </form>
    </div>
  );
}

export default AddCreator;
