import {
  EditSharp,
  GitHub,
  LanguageOutlined,
  LinkedIn,
  MailOutline,
} from "@mui/icons-material";
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
import { useAppSelector } from "../../../hooks/hooks";
import { ProfileLayout } from "../layout/ProfileLayout";

export const Profile = () => {
  const {
    description,
    email,
    lastName,
    links,
    mediaUrl,
    name,
    technologies,
    valorationEnum,
  } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const onEdit = () => {
    navigate("/profile/edit");
  };

  return (
    <ProfileLayout>
      <Grid container width={"100%"} flexDirection={"column"} gap={3}>
        <Grid container justifyContent={"space-between"}>
          <Grid container alignItems={"center"} gap={5}>
            <Grid>
              <Avatar
                alt={`${name} ${lastName}`}
                sx={{ width: 180, height: 180 }}
                src={mediaUrl || ""}
              />
            </Grid>
            <Grid container gap={1} flexDirection={"column"}>
              <Grid>
                <Typography variant='h4' fontWeight={"bold"}>
                  {`${name} ${lastName}`}
                </Typography>
              </Grid>
              <Grid>
                {/* <Typography variant='subtitle1'>Front-end developer</Typography> */}
                <Rating name='read-only' value={valorationEnum} readOnly />
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
          {technologies.map((tech) => (
            <Chip key={tech.id} color='primary' label={tech.name} />
          ))}
        </Grid>
        <Grid container gap={1} flexDirection={"column"}>
          {links.map((link) => (
            <Grid
              key={link.id}
              container
              // display={`${!links[0] && "none"}`}
              gap={1}
              alignItems={"center"}
            >
              {link.id === 1 && <GitHub />}
              {link.id === 2 && <LinkedIn />}
              {link.id === 3 && <LanguageOutlined />}
              <Link color='secondary' to={`${link.url}`} component={LinkRouter}>
                {link.name}
              </Link>
            </Grid>
          ))}

          <Grid container gap={1} alignItems={"center"}>
            <MailOutline />
            <Typography>{email}</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Typography display={"inline"} variant='subtitle1'>
            {description}
          </Typography>
        </Grid>
      </Grid>
    </ProfileLayout>
  );
};
