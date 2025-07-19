import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import { styled } from "@mui/system";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const StyledCard = styled(Card)`
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeaderRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const JokeDescription = styled(Typography)({
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
});

const getStyledChip = (likes, dislikes) => {
  return (
    <Chip
      size="small"
      style={{ 
        background: 'linear-gradient(to right, #4caf50 50%, crimson 50%)'
      }}
      label={
        <div style={{ display: "flex",gap:'30px' }}>
          <div
            style={{
              display: "flex",
              gap: "6px",
              justifyItems: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            <ThumbUpIcon />
            <span>{likes}</span>
          </div>
          
          <div
            style={{
              display: "flex",
              gap: "6px",
              justifyItems: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            <ThumbDownIcon />
            <span>{dislikes}</span>
          </div>
        </div>
      }
    />
  );
};

export default function JokeCard({ joke, jokeSelected }) {
  const { title, joke: description, likes, dislikes, lang } = joke;
  return (
    <StyledCard
      onClick={() => {
        jokeSelected(joke);
      }}
    >
      <CardContent>
        <HeaderRow>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            {title}
          </Typography>
        </HeaderRow>

        <JokeDescription variant="body2" color="text.secondary">
          {description}
        </JokeDescription>
      </CardContent>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          margin: "0px 20px 20px 0px",
        }}
      >
        {getStyledChip(likes, dislikes)}
      </div>
    </StyledCard>
  );
}