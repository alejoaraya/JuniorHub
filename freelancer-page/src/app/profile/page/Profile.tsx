import { EditSharp, GitHub, LinkedIn } from "@mui/icons-material";
import {
  Avatar,
  Chip,
  Divider,
  Grid2 as Grid,
  IconButton,
  Link,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

import { Link as LinkRouter } from "react-router-dom";
import { ProfileLayout } from "../layout/ProfileLayout";

export const Profile = () => {
  const navigate = useNavigate();
  const onEdit = () => {
    navigate("edit");
  };

  return (
    <ProfileLayout>
      <Grid container flexDirection={"column"} gap={3}>
        <Grid container justifyContent={"space-between"}>
          <Grid container alignItems={"center"} gap={5}>
            <Grid>
              <Avatar alt='Alejo Araya' sx={{ width: 180, height: 180 }} />
            </Grid>
            <Grid container gap={1} flexDirection={"column"}>
              <Grid>
                <Typography variant='h4' fontWeight={"bold"}>
                  Alejo Araya
                </Typography>
              </Grid>
              <Grid>
                <Typography variant='subtitle1'>Front-end developer</Typography>
                <Rating name='read-only' value={2} readOnly />
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Tooltip onClick={onEdit} color='secondary' title='Edit'>
              <IconButton>
                <EditSharp />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Divider />
        <Grid container gap={2}>
          <Chip color='primary' label='React' />
          <Chip color='primary' label='Next' />
          <Chip color='primary' label='TypeScript' />
          <Chip color='primary' label='Redux' />
          <Chip color='primary' label='Tailwind' />
        </Grid>
        <Grid container gap={1} flexDirection={"column"}>
          <Grid container gap={1} alignItems={"center"}>
            <GitHub />
            <Link color='secondary' to={"#"} component={LinkRouter}>
              GitHub
            </Link>
          </Grid>
          <Grid container gap={1} alignItems={"center"}>
            <LinkedIn />
            <Link color='secondary' to={"#"} component={LinkRouter}>
              LinkedIn
            </Link>
          </Grid>
        </Grid>
        <Typography variant='subtitle1'>
          Laboris nostrud laboris tempor incididunt officia Lorem ex dolore
          exercitation deserunt velit consequat. Labore aliqua sunt
          reprehenderit voluptate tempor enim culpa Lorem dolore consequat sit
          cupidatat dolor laborum. Et do et veniam qui magna non consectetur
          laborum exercitation exercitation duis. Consequat amet aliqua
          reprehenderit aute. Qui anim elit incididunt do Lorem laborum aliqua
          ut et commodo minim cupidatat commodo. Dolore sit reprehenderit
          eiusmod laborum. Irure veniam Lorem ex cupidatat ut ex esse culpa eu
          commodo magna incididunt enim velit. Veniam sit in velit consequat
          laborum aliquip laboris. Aliqua consequat consequat do adipisicing
          mollit voluptate excepteur qui velit ad. Voluptate veniam adipisicing
          Lorem in in est quis ex exercitation excepteur dolore. Non nulla do
          veniam elit dolore. Ullamco magna adipisicing excepteur nostrud sint
          sint consectetur ullamco id nulla id consequat anim. Occaecat sint
          culpa fugiat veniam commodo in officia esse dolore. Commodo Lorem
          aliqua ullamco ad elit adipisicing fugiat nisi ipsum nostrud in
          laboris. Sunt fugiat voluptate duis cillum. Sit in excepteur eiusmod
          consequat incididunt duis. Sunt aliqua do elit veniam cupidatat dolor
          sit aute consectetur ipsum. Labore incididunt esse incididunt esse
          proident commodo aliquip culpa Lorem est exercitation.
        </Typography>
      </Grid>
    </ProfileLayout>
  );
};
