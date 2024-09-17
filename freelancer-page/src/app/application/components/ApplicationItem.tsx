import { TurnedInNot } from "@mui/icons-material";
import {
  Grid2 as Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { startSavingActiveOffer } from "../../../store";

import { useMemo } from "react";
import { Offer } from "../../../@types/types";
import { useAppDispatch } from "../../../hooks/hooks";

interface Props {
  application: Offer;
}

export const ApplicationItem = ({ application }: Props) => {
  const dispatch = useAppDispatch();

  const onActiveNote = () => {
    dispatch(startSavingActiveOffer(application));
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
            secondary={`${
              application.technologies[0]
                ? application.technologies[0].name
                : ""
            }`}
          />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
