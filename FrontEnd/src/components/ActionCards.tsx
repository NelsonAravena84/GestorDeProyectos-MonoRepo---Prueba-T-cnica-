import { Paper, Typography } from "@mui/material";

interface ActionCardsTypes {
  titulo: string;
  descripcion: string;
  onClick: any;
}

export default function ActionCards({
  titulo,
  descripcion,
  onClick,
}: ActionCardsTypes) {
  return (
    <Paper
      variant="outlined"   
      elevation={0}       
      sx={{
        p: 5,
        bgcolor: "black",
        textAlign: "center",
        cursor: "pointer",
        borderRadius: 3,
        borderColor: "#2CFF05", 
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
      onClick={onClick}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
        sx={{ color: "white" }}
      >
        {titulo}
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "white" }}
      >
        {descripcion}
      </Typography>
    </Paper>
  );
}