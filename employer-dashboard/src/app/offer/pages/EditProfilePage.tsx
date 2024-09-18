import { SaveOutlined, UploadFileOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Grid2 as Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { ChangeEvent, useRef } from "react";
import Swal from "sweetalert2";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { NavBar } from "../components";
import { ProfileLayout } from "../layout/ProfileLayout";
import { startUpdateProfile, startUploadImages } from "../../../store";
import { User } from "../../../@types/types";

export const EditProfilePage = () => {
  const { lastName, mediaUrl, name, email } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // interface InitialValues exte {
  //   lastName: string | null | undefined;
  //   name: string | null | undefined;
  //   mediaUrl: string | null | undefined;
  //   email: string | null | undefined;
  // }

  const initialValues: User = {
    lastName,
    mediaUrl,
    name,
    email,
  };
  const { handleChange, values } = useFormik({
    initialValues,
    onSubmit: () => {},
  });

  const onSaveOffer = () => {
    // values.price = Number(values.price);
    // console.table(values);
    // values.links = [
    //   {
    //     id: 1,
    //     name: "Github",
    //     url: values.github || "",
    //   },
    //   {
    //     id: 2,
    //     name: "LinkedIn",
    //     url: values.linkedIn || "",
    //   },
    //   {
    //     id: 3,
    //     name: "Porfolio",
    //     url: values.porfolio || "",
    //   },
    // ];

    // delete values.github;
    // delete values.linkedIn;
    // delete values.porfolio;

    // console.table(values);
    Swal.fire({
      title: "¿Seguro que quieres guardarlo?",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancel",
    }).then((value) => {
      if (value.value) {
        // console.log(values);

        dispatch(startUpdateProfile(values));
      }
    });
  };

  const onFileInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files) throw new Error("$Files is empty");
    dispatch(startUploadImages(target.files));
  };

  return (
    <>
      <NavBar drawerWidth={0} />
      <ProfileLayout>
        <Grid
          className='animate__animated animate__fadeIn  animate__faster'
          container
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={1}
          gap={3}
        >
          <Grid size={{ sm: 4 }}>
            <Typography variant='h4'>
              Editar perfil
              {/* {dateString(noteActive?.date)} */}
            </Typography>
          </Grid>
          <Grid size={{ sm: 2 }}>
            <input
              type='file'
              multiple
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={onFileInputChange}
            />
            {/*
        <Button
          onClick={() => fileInputRef.current?.click()}
          color='inherit'
          sx={{ p: 2 }}
        >
          <UploadFileOutlined sx={{ fontSize: 30, mr: 1 }} />
          Upload
        </Button> */}
            <Button onClick={onSaveOffer} color={"secondary"} sx={{ p: 2 }}>
              <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
              Save
            </Button>
            {/* <Button onClick={onDeleteNote} color='secondary' sx={{ p: 2 }}>
            <DeleteOutlined sx={{ fontSize: 30, mr: 1 }} />
            Delete
          </Button> */}
          </Grid>
          <Grid container gap={4}>
            <Grid container alignItems={"end"}>
              <Avatar
                src={mediaUrl || ""}
                alt='Alejo Araya'
                sx={{ width: 180, height: 180 }}
              />
              <Tooltip
                onClick={() => fileInputRef.current?.click()}
                title='Change image'
              >
                <IconButton size='large'>
                  <UploadFileOutlined sx={{ fontSize: 30 }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid container width={"100%"} gap={3}>
              <TextField
                sx={{ width: "48.8%" }}
                type='text'
                variant='filled'
                placeholder='Enter a title'
                label='First Name'
                onChange={handleChange}
                name='name'
                value={values.name}
              />
              <TextField
                sx={{ width: "48.8%" }}
                type='text'
                variant='filled'
                placeholder='Enter a title'
                label='Last name'
                onChange={handleChange}
                name='lastName'
                value={values.lastName}
              />
            </Grid>
          </Grid>
        </Grid>
      </ProfileLayout>
    </>
  );
};
