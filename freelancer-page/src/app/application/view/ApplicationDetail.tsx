import { Box, Button, Chip, Grid2 as Grid, Typography } from "@mui/material";
import { TableApplicationDetail } from "./ApplicationDetail/components/TableApplicationDetail";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { startApplyOffer } from "../../../store";

export const ApplicationDetail = () => {
  const { offerActive } = useAppSelector((state) => state.offer);
  const dispatch = useAppDispatch();
  const onApply = () => {
    Swal.fire({
      title: "¿Seguro que quieres aplicar?",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Aplicar",
      cancelButtonText: "Cancel",
    }).then((value) => {
      if (value.value) {
        dispatch(startApplyOffer());
      }
    });
  };

  return (
    <>
      {offerActive ? (
        <Box
          bgcolor={"Background"}
          overflow={"auto"}
          sx={{
            boxShadow: "10px 10px 35px -15px rgba(0,0,0,0.7)",
          }}
          height={"calc(100vh - 80px)"}
          width={"70%"}
        >
          <Grid container margin={8}>
            <Grid display={"flex"} flexDirection={"column"} gap={2}>
              <Box display={"flex"} flexDirection={"column"}>
                <Typography variant='h5' fontWeight={"bold"}>
                  {offerActive?.title}
                </Typography>
                <Typography variant='subtitle2'>
                  Hecho por {offerActive.fullNameAuthor}.
                </Typography>
              </Box>
              <Box display={"flex"} gap={1}>
                {offerActive?.technologies.map((tech) => (
                  <Chip key={tech.id} color='primary' label={tech.name} />
                ))}
              </Box>
              <Typography textAlign={"justify"}>
                {offerActive.description}
              </Typography>
              {/* <Divider /> */}
              <TableApplicationDetail />
              <Button onClick={onApply} variant='contained' size='large'>
                Postularse
              </Button>
              {/* <Box display={"flex"}>
              <Typography variant='h6'>Precio por hora: $</Typography>
              <Typography variant='h5' fontWeight={"bold"}>
                10
              </Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography variant='h6'>Tiempo estipulado</Typography>
              <Typography variant='h5' fontWeight={"bold"}>
                una semana
              </Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography variant='h6'>Dificultad:</Typography>
              <Typography variant='h5' fontWeight={"bold"}>
                Media
              </Typography>
            </Box> */}
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box
          bgcolor={"Background"}
          overflow={"auto"}
          alignItems={"center"}
          justifyContent={"center"}
          display={"flex"}
          sx={{
            boxShadow: "10px 10px 35px -15px rgba(0,0,0,0.7)",
          }}
          height={"calc(100vh - 80px)"}
          width={"70%"}
        >
          <Typography color='secondary' variant='h4' fontWeight={"bold"}>
            Select a offer
          </Typography>
        </Box>
      )}
    </>
  );
};
