import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Modal,
  Backdrop,
} from "@mui/material";
import { styled } from "@mui/system";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 450px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin: 1rem auto;
  cursor: pointer;
  position: relative;
  z-index: 1;
`;

const FloatingCard = styled(Card)(({ style }) => ({
  position: "fixed",
  top: style.top,
  left: style.left,
  width: style.width,
  height: style.height,
  transform: style.transform,
  transition: "all 0.6s ease",
  zIndex: 1400,
  borderRadius: 16,
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
  background: "#fff",
}));

const ModalWrapper = styled(Box)`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  padding: 16px;
`;

const ModalBackground = styled(Box)`
  max-width: 500px;
  width: 100%;
  border-radius: 20px;
  background: #fff;
  padding: 1rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  z-index: 1200;
`;

const JokeDescription = styled(Typography)({
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
});

const getStyledChip = (likes, dislikes) => (
  <Chip
    size="small"
    style={{ background: likes > dislikes ? "" : "crimson" }}
    label={
      <div style={{ display: "flex" }}>
        <span style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <ThumbUpIcon />
          <span>{likes}</span>
        </span>
        <span
          style={{ width: "10px", background: "gold", margin: "0px 14px" }}
        />
        <span style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <ThumbDownIcon />
          <span>{dislikes}</span>
        </span>
      </div>
    }
    color="success"
  />
);

export default function JokeCard({ title, description, likes, dislikes }) {
  const cardRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [showModalContent, setShowModalContent] = useState(false);
  const [cloneVisible, setCloneVisible] = useState(false);
  const [cloneStyle, setCloneStyle] = useState({});
  const [originalRect, setOriginalRect] = useState(null);

  const handleCardClick = () => {
    const rect = cardRef.current.getBoundingClientRect();
    const targetWidth = 500;
    const targetHeight = rect.height;
    const targetTop = window.innerHeight / 2 - targetHeight / 2;
    const targetLeft = window.innerWidth / 2 - targetWidth / 2;

    setOriginalRect(rect);
    setShowModalContent(false);
    setModalOpen(true);

    setCloneStyle({
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      transform: "scale(1)",
    });
    setCloneVisible(true);

    setTimeout(() => {
      setCloneStyle({
        top: `${targetTop}px`,
        left: `${targetLeft}px`,
        width: `${targetWidth}px`,
        height: `${targetHeight}px`,
        transform: "scale(1.05)",
      });
    }, 20);

    setTimeout(() => {
      setCloneVisible(false);
      setShowModalContent(true);
    }, 600);
  };

  const handleCloseModal = () => {
    if (!originalRect) return;

    setShowModalContent(false);

    const modalTop = window.innerHeight / 2 - originalRect.height / 2;
    const modalLeft = window.innerWidth / 2 - originalRect.width / 2;

    // Start clone card at modal center with scale 1.05
    setCloneStyle({
      top: `${modalTop}px`,
      left: `${modalLeft}px`,
      width: `${originalRect.width}px`,
      height: `${originalRect.height}px`,
      transform: "scale(1.05)",
    });
    setCloneVisible(true);

    // Animate to original position + scale 1 after short delay
    setTimeout(() => {
      setCloneStyle({
        top: `${originalRect.top}px`,
        left: `${originalRect.left}px`,
        width: `${originalRect.width}px`,
        height: `${originalRect.height}px`,
        transform: "scale(1)",
      });
    }, 20);

    // Remove clone and close modal after animation
    setTimeout(() => {
      setCloneVisible(false);
      setModalOpen(false);
    }, 620);
  };

  const cardContent = (
    <>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <JokeDescription variant="body2" color="text.secondary">
          {description}
        </JokeDescription>
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "end", p: 2, pt: 0 }}>
        {getStyledChip(likes, dislikes)}
      </Box>
    </>
  );

  return (
    <>
      <StyledCard ref={cardRef} onClick={handleCardClick}>
        {cardContent}
      </StyledCard>

      {cloneVisible && (
        <FloatingCard style={cloneStyle} onClick={handleCloseModal}>
          {cardContent}
        </FloatingCard>
      )}

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 400 }}
      >
        <ModalWrapper onClick={handleCloseModal}>
          {showModalContent && (
            <ModalBackground onClick={(e) => e.stopPropagation()}>
              <Typography variant="h5" fontWeight="bold" mb={1}>
                {title}
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={2}>
                {description}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                {getStyledChip(likes, dislikes)}
              </Box>
            </ModalBackground>
          )}
        </ModalWrapper>
      </Modal>
    </>
  );
}
