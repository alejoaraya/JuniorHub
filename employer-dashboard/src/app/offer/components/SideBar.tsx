import { EditSharp } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Grid2 as Grid,
  IconButton,
  List,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Offer } from "../../../@types/types";
import { useAppSelector } from "../../../hooks/hooks";
import { SideBarItem } from "./SideBarItem";
import { useNavigate } from "react-router";

interface Props {
  drawerWidth: number;
}

export const SideBar = ({ drawerWidth }: Props) => {
  const navigate = useNavigate();
  const {
    name: firstName,
    lastName,
    mediaUrl,
  } = useAppSelector((state) => state.auth);
  const { offers } = useAppSelector((state) => state.offer);

  return (
    <Box flexShrink={{ sm: 0 }} component={"nav"} width={{ sm: drawerWidth }}>
      <Drawer
        variant='permanent'
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <Grid container justifyContent={"space-between"} width={"100%"}>
            <Grid container alignItems={"center"} gap={2}>
              <Avatar
                alt='avatar'
                src={mediaUrl || ""}
                variant='circular'
              ></Avatar>
              <Typography
                variant='h6'
                color={"text.primary"}
                noWrap
                component={"div"}
              >
                {firstName} {lastName}
              </Typography>
            </Grid>
            <Tooltip
              onClick={() => navigate("/edit")}
              color='secondary'
              title='Edit profile'
            >
              <IconButton>
                <EditSharp />
              </IconButton>
            </Tooltip>
          </Grid>
        </Toolbar>
        <Divider />

        <List>
          {Array.isArray(offers) ? (
            offers.map((offer: Offer) => (
              <SideBarItem key={offer.id} offer={offer} />
            ))
          ) : (
            <></>
          )}
        </List>
      </Drawer>
    </Box>
  );
};
