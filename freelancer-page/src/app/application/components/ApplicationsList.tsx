import { Box, List, Pagination, Typography } from "@mui/material";
import { Offer } from "../../../@types/types";
import { useAppSelector } from "../../../hooks/hooks";
import { ApplicationItem } from "./ApplicationItem";

export const ApplicationsList = () => {
  const { querySearch } = useAppSelector((state) => state.ui);

  const filterApplications = applicationDemo.filter((app) => {
    const searchQuery = querySearch.trim().toLocaleLowerCase();

    return (
      app.title.toLocaleLowerCase().includes(searchQuery) ||
      app.technology[0].name.toLocaleLowerCase().includes(searchQuery)
    );
  });

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
              {filterApplications.length} resultados
            </Typography>
          </Box>
          {filterApplications.map((application: Offer) => (
            <ApplicationItem key={application.id} application={application} />
          ))}
        </Box>
      </List>
      <Box display={"flex"} justifyContent={"center"} my={2}>
        <Pagination count={5} color='primary' />
      </Box>
    </Box>
  );
};

const applicationDemo: Offer[] = [
  {
    id: 1,
    title: "Front-end developer",
    description: "No Country SRL.",
    price: 2,
    estimatedTime: 2,
    state: 2,
    difficult: 2,
    technology: [
      {
        id: 0,
        name: "React",
      },
    ],
  },
  {
    id: 2,
    title: "Back-end developer",
    description: "No Country SRL.",
    price: 2,
    estimatedTime: 2,
    state: 2,
    difficult: 2,
    technology: [
      {
        id: 0,
        name: "React",
      },
    ],
  },
  {
    id: 3,
    title: "Fullstack developer",
    description: "No Country SRL.",
    price: 2,
    estimatedTime: 2,
    state: 2,
    difficult: 2,
    technology: [
      {
        id: 0,
        name: "Java",
      },
    ],
  },
  {
    id: 4,
    title: "Design",
    description: "No Country SRL.",
    price: 2,
    estimatedTime: 2,
    state: 2,
    difficult: 2,
    technology: [
      {
        id: 0,
        name: "Figma",
      },
    ],
  },
  {
    id: 5,
    title: "QA",
    description: "No Country SRL.",
    price: 2,
    estimatedTime: 2,
    state: 2,
    difficult: 2,
    technology: [
      {
        id: 0,
        name: "React",
      },
      {
        id: 0,
        name: "ASD",
      },
      {
        id: 0,
        name: "cDct",
      },
    ],
  },
];
