import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { startSetActiveOffer } from "../../../store";

import { useMemo } from "react";
import { Offer } from "../../../@types/types";
import { useAppDispatch } from "../../../hooks/hooks";

interface Props {
  offer: Offer;
}

export const SideBarItem = ({ offer }: Props) => {
  const dispatch = useAppDispatch();

  const onActiveNote = () => {
    dispatch(startSetActiveOffer(offer));
  };

  const fixTitle = useMemo(() => {
    return offer.title.length > 17
      ? offer.title.substring(0, 17) + "..."
      : offer.title;
  }, [offer.title]);

  const fixDescription = useMemo(() => {
    return offer.description.length > 22
      ? offer.description.substring(0, 22) + "..."
      : offer.description;
  }, [offer.description]);

  return (
    <ListItem onClick={onActiveNote} disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot color='info' />
        </ListItemIcon>
        <Grid container display={"flex"} flexDirection={"column"}>
          <ListItemText primary={fixTitle} />
          <ListItemText secondary={fixDescription} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
