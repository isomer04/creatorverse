import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import {
  Container,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
  Box,
} from '@mui/material';

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
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Add New Creator
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mt={2}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="URL"
            name="url"
            value={formData.url}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box mt={2}>
          <TextareaAutosize
            name="description"
            value={formData.description}
            onChange={handleChange}
            rowsMin={4}
            placeholder="Description"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Image URL (Optional)"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Button variant="contained" color="primary" type="submit" mt={2}>
          Add Creator
        </Button>
      </form>
    </Container>
  );
}

export default AddCreator;
