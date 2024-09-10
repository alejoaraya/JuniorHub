import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { Offer } from "../../../@types/types";
import { useAppSelector } from "../../../hooks/hooks";
import { SideBarItem } from "./SideBarItem";

interface Props {
  drawerWidth: number;
}

export const SideBar = ({ drawerWidth }: Props) => {
  const { displayName, photoURL } = useAppSelector((state) => state.auth);
  const { offers: notes } = useAppSelector((state) => state.offer);

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
          <Avatar alt='avatar' src={photoURL || ""} variant='circular'></Avatar>
          <Typography
            variant='h6'
            color={"text.primary"}
            noWrap
            component={"div"}
          >
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {notes.map((note: Offer) => (
            <SideBarItem key={note.id} application={note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
