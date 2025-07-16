import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { styled } from '@mui/system';

// Styled Card container
const StyledCard = styled(Card)`
  max-width: 350px;
  margin: 1rem auto;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

// Styled Box for header row
const HeaderRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

// Styled Chips
const GrayChip = styled(Chip)`
  background-color: #9e9e9e;
  color: white;
`;

const YellowChip = styled(Chip)`
  background-color: #fbc02d;
  color: #000;
`;

const GoldChip = styled(Chip)`
  background-color: #ffb300;
  color: #000;
`;

const getStyledChip = (progress) => {
  if (progress === 100) {
    return <Chip size="small" label="Complete" color="success" />;
  }
  if (progress === 0) {
    return <GrayChip size="small" label="0%" />;
  }
  if (progress < 50) {
    return <YellowChip size="small" label={`${progress}%`} />;
  }
  return <GoldChip size="small" label={`${progress}%`} />;
};

export default function TodoCard({ title, description, progress }) {
  return (
    <StyledCard>
      <CardContent>
        <HeaderRow>
          <Typography variant="h6" font-weight="bold">
            {title}
          </Typography>
          {getStyledChip(progress)}
        </HeaderRow>

        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </StyledCard>
  );
}
