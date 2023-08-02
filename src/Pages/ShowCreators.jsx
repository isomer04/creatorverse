import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client'; 
import { Container, Typography, Link as MUILink, Box } from '@mui/material';

function ShowCreators() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    // Fetch all content creators from the database when the component mounts
    async function fetchCreators() {
      const { data, error } = await supabase.from('creators').select('*');
      if (error) {
        console.error('Error fetching creators:', error);
      } else {
        setCreators(data);
      }
    }

    fetchCreators();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Content Creators
      </Typography>
      <MUILink component={Link} to="/add" color="primary">
        Add New Creator
      </MUILink>
      {creators.map((creator) => (
        <Box key={creator.id} mt={3}>
          <Typography variant="h5">
            <MUILink component={Link} to={`/creators/${creator.id}`} color="inherit">
              {creator.name}
            </MUILink>
          </Typography>
          <Typography variant="body1">{creator.description}</Typography>
        </Box>
      ))}
    </Container>
  );
}

export default ShowCreators;
