import { Box, List, Pagination, Typography } from "@mui/material";
import { Offer } from "../../../@types/types";
import { useAppSelector } from "../../../hooks/hooks";
import { ApplicationItem } from "./ApplicationItem";

export const ApplicationsList = () => {
  const { querySearch } = useAppSelector((state) => state.ui);
  const { offers } = useAppSelector((state) => state.offer);

  // const filterApplications = offers.filter((app) => {
  //   const searchQuery = querySearch.trim().toLocaleLowerCase();

  //   return (
  //     app.title.toLocaleLowerCase().includes(searchQuery) ||
  //     app.technologies[0].name.toLocaleLowerCase().includes(searchQuery)
  //   );
  // });

  return (
    <Box
      overflow={"auto"}
      bgcolor={"info.main"}
      height={"calc(100vh - 80px)"}
      width={"30%"}
      sx={{ boxShadow: "-10px 10px 35px -15px rgba(0,0,0,0.7)" }}
      display={"flex"}
      justifyContent={"space-between"}
      flexDirection={"column"}
    >
      <List disablePadding>
        <Box>
          <Box bgcolor={"primary.main"} paddingX={2} paddingY={1}>
            <Typography variant='h6'>{querySearch || "Todos"}</Typography>
            <Typography variant='subtitle2'>
              {offers.length} resultados
            </Typography>
          </Box>
          {Array.isArray(offers) ? (
            offers.map((application: Offer) => (
              <ApplicationItem key={application.id} application={application} />
            ))
          ) : (
            <Typography>No offers available</Typography>
          )}
        </Box>
      </List>
      <Box display={"flex"} justifyContent={"center"} my={2}>
        <Pagination count={5} color='primary' />
      </Box>
    </Box>
  );
};
