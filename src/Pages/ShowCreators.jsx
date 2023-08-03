import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client'; 
import { Container, Typography, Button, Box, Grid } from '@mui/material';

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
      <Button component={Link} to="/add" variant="contained" color="primary">
        Add New Creator
      </Button>
      <Grid container spacing={2}>
        {creators.map((creator) => (
          <Grid key={creator.id} item xs={12} md={6}>
            <Box mt={3}>
              <Typography variant="h5">
                <Link to={`/creators/${creator.id}`} style={{ textDecoration: 'none' }}>
                  {creator.name}
                </Link>
              </Typography>
              <Typography variant="body1">{creator.description}</Typography>
              <img
                src={creator.imageURL}
                alt={creator.name}
                style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ShowCreators;
