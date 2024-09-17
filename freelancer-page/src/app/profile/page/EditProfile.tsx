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
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Technology, User } from "../../../@types/types";
import { loadTechnologies } from "../../../helpers";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { startUpdateProfile, startUploadImages } from "../../../store";
import { MultipleSelectChipNoteView } from "../components";
import { ProfileLayout } from "../layout/ProfileLayout";

export const EditProfile = () => {
  const {
    description,
    valorationEnum,
    lastName,
    links,
    mediaUrl,
    name,
    technologies,
    email,
  } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  interface InitialValues extends User {
    github?: string | null;
    linkedIn?: string | null;
    porfolio?: string | null;
  }

  const initialValues: InitialValues = {
    github: "",
    linkedIn: "",
    porfolio: "",
    description,
    valorationEnum,
    email,
    lastName,
    links,
    mediaUrl,
    name,
    technologies,
  };

  const { handleChange, values } = useFormik({
    initialValues,
    onSubmit: () => {},
  });

  const onSaveOffer = () => {
    // values.price = Number(values.price);
    // console.table(values);
    values.links = [
      {
        name: "GitHub",
        url: values.github || "",
      },
      {
        name: "LinkedIn",
        url: values.linkedIn || "",
      },
      {
        name: "Portafolio",
        url: values.porfolio || "",
      },
    ];

    delete values.github;
    delete values.linkedIn;
    delete values.porfolio;

    // console.table(values);
    Swal.fire({
      title: "¿Seguro que lo quieres guardar?",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancel",
    }).then((value) => {
      if (value.value) {
        dispatch(startUpdateProfile(values));
      }
    });
  };

  const [technologiesList, setTechnologiesList] = useState<Technology[]>([]);

  const getTechnologies = async () => {
    const technologies = await loadTechnologies();
    setTechnologiesList(technologies);
  };

  useEffect(() => {
    getTechnologies();
  }, []);

  const onChangeTechnologies = (technologies: string[]): void => {
    const result: Technology[] = [];

    technologiesList.map((tech: Technology) => {
      for (const aux of technologies) {
        if (tech.name === aux) {
          result.push(tech);
        }
      }
    });

    // console.log(result);

    values.technologies = result;
  };

  // const onDeleteNote = () => {
  //   Swal.fire({
  //     title: "Do you want to DELETE?",

  //     icon: "error",
  //     showConfirmButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: "Delete",
  //     cancelButtonText: "Cancel",
  //   }).then((value) => {
  //     if (value.value) {
  //       // dispatch(startDeleteNote());
  //     }
  //   });
  // };

  // useEffect(() => {
  //   setValues(initialValues);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [offerActive]);

  // const dateString = useMemo(
  //   () => (date: number | undefined) => {
  //     if (!date) throw new Error("Date is empty");
  //     return new Date(date).toUTCString();
  //   },
  //   [noteActive?.date]
  // );

  const onFileInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files) throw new Error("$Files is empty");
    dispatch(startUploadImages(target.files));
  };

  return (
    <>
      <ProfileLayout>
        <Grid
          className='animate__animated animate__fadeIn  animate__faster'
          container
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={1}
          gap={3}
        >
          <Grid>
            <Typography variant='h4'>
              Editar perfil
              {/* {dateString(noteActive?.date)} */}
            </Typography>
          </Grid>
          <Grid>
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

            <TextField
              type='text'
              variant='filled'
              fullWidth
              placeholder='Enter a title'
              label='Github'
              onChange={handleChange}
              name='github'
              value={values.github}
            />
            <TextField
              type='text'
              variant='filled'
              fullWidth
              placeholder='Enter a title'
              label='LinkedIn'
              onChange={handleChange}
              name='linkedIn'
              value={values.linkedIn}
            />
            <TextField
              type='text'
              variant='filled'
              fullWidth
              placeholder='Enter a title'
              label='Porfolio'
              onChange={handleChange}
              name='porfolio'
              value={values.porfolio}
            />

            <TextField
              type='text'
              variant='filled'
              fullWidth
              multiline
              placeholder='What do you need?'
              minRows={5}
              onChange={handleChange}
              name='description'
              value={values.description}
            />
            <MultipleSelectChipNoteView
              onChangeTechnologies={onChangeTechnologies}
              technologiesSelected={technologies.map((tech) => tech.name)}
            />
          </Grid>
        </Grid>
      </ProfileLayout>
    </>
  );
};
