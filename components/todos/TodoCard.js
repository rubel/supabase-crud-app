import {
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
  } from '@mui/material';
  import { styled } from '@mui/system';
  
  // Styled Card container
  const StyledCard = styled(Card)({
    maxWidth: 350,
    margin: '1rem auto',
    borderRadius: '16px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  });
  
  // Custom colored Chip using sx prop
  const getChipProps = (progress) => {
    if (progress === 100) {
      return { label: 'Complete', color: 'success' };
    }
    if (progress === 0) {
      return { label: '0%', sx: { backgroundColor: '#9e9e9e', color: 'white' } }; // gray
    }
    if (progress < 50) {
      return { label: `${progress}%`, sx: { backgroundColor: '#fbc02d', color: '#000' } }; // yellow
    }
    return { label: `${progress}%`, sx: { backgroundColor: '#ffb300', color: '#000' } }; // gold
  };
  
  export default function TodoCard({ title, description, progress }) {
    const chipProps = getChipProps(progress);
  
    return (
      <StyledCard>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h6" fontWeight="bold">
              {title}
            </Typography>
            <Chip size="small" {...chipProps} />
          </Box>
  
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </StyledCard>
    );
  }
  