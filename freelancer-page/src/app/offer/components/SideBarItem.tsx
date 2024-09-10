import { TurnedInNot } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid2 as Grid,
} from "@mui/material";
import { setActiveNote } from "../../../store";

import { useMemo } from "react";
import { Offer } from "../../../@types/types";
import { useAppDispatch } from "../../../hooks/hooks";

interface Props {
  application: Offer;
}

export const SideBarItem = ({ application }: Props) => {
  const dispatch = useAppDispatch();

  const onActiveNote = () => {
    dispatch(setActiveNote(application));
  };

  const fixTitle = useMemo(() => {
    return application.title.length > 25
      ? application.title.substring(0, 25) + "..."
      : application.title;
  }, [application.title]);

  return (
    <ListItem onClick={onActiveNote} disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot color={"secondary"} />
        </ListItemIcon>
        <Grid container>
          <ListItemText
            primary={fixTitle}
            secondary={application.technology[0].name}
          />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
