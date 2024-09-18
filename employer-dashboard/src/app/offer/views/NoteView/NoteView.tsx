import { DeleteOutlined, SaveOutlined } from "@mui/icons-material";
import {
  Button,
  Grid2 as Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Offer, Technology } from "../../../../@types/types";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import {
  startChangeValoration,
  startDeleteNote,
  startUpdateOffer,
} from "../../../../store";
import {
  DifficultSelectNoteView,
  MultipleSelectChipNoteView,
  SelectRateForHourNoteView,
  StatusSelectNoteView,
  TableNoteView,
  TimeSelectorNoteView,
} from "./components";

export const NoteView = () => {
  const { offerActive } = useAppSelector((state) => state.offer);
  const dispatch = useAppDispatch();
  // console.log(offerActive?.applied);

  if (
    offerActive?.applied &&
    offerActive?.applied.length > 0 &&
    offerActive?.applied[0].selected
  ) {
    console.table(offerActive?.applied[0].selected);
  }
  // const fileInputRef = useRef<HTMLInputElement>(null);

  const initialValues: Offer = {
    id: offerActive?.id || 0,
    title: offerActive?.title || "",
    description: offerActive?.description || "",
    price: offerActive?.price || 0,
    estimatedTime: offerActive?.estimatedTime || 0,
    state: offerActive?.state || 0,
    difficult: offerActive?.difficult || 0,
    technologies: offerActive?.technologies || [],
    applied: offerActive?.applied || [],
  };

  const [valoration, setValoration] = useState<number>(0);

  const { handleChange, values, setValues } = useFormik({
    initialValues,
    onSubmit: () => {},
  });

  const handleValoration = (newValoration: number) => {
    dispatch(startChangeValoration(newValoration));
    setValoration(newValoration || 0);
  };

  const onSaveOffer = () => {
    values.price = Number(values.price);
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

        dispatch(startUpdateOffer(values));
      }
    });
  };

  const { technologies: technologiesList } = useAppSelector(
    (state) => state.offer
  );

  const onChangeTechnologies = (technologies: string[]): void => {
    const result: Technology[] = [];

    technologiesList.map((tech) => {
      for (const aux of technologies) {
        if (tech.name === aux) {
          result.push(tech);
        }
      }
    });

    // console.log(result);

    values.technologies = result;
  };

  const onDeleteNote = () => {
    Swal.fire({
      title: "¿Seguro que quieres eliminarlo?",

      icon: "error",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancel",
    }).then((value) => {
      if (value.value) {
        dispatch(startDeleteNote());
      }
    });
  };

  useEffect(() => {
    setValues(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerActive]);

  // const dateString = useMemo(
  //   () => (date: number | undefined) => {
  //     if (!date) throw new Error("Date is empty");
  //     return new Date(date).toUTCString();
  //   },
  //   [noteActive?.date]
  // );

  // const onFileInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
  //   if (!target.files) throw new Error("$Files is empty");
  //   dispatch(startUploadImages(target.files));
  // };

  // console.log(offerActive);

  return (
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
          Oferta de trabajo / proyecto
          {/* {dateString(noteActive?.date)} */}
        </Typography>
      </Grid>
      <Grid>
        {/* <input
          type='file'
          multiple
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={onFileInputChange}
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          color='inherit'
          sx={{ p: 2 }}
        >
          <UploadFileOutlined sx={{ fontSize: 30, mr: 1 }} />
          Upload
        </Button> */}
        <Button onClick={onSaveOffer} color={"info"} sx={{ p: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
        <Button onClick={onDeleteNote} color='secondary' sx={{ p: 2 }}>
          <DeleteOutlined sx={{ fontSize: 30, mr: 1 }} />
          Delete
        </Button>
      </Grid>
      <Grid container gap={2}>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Enter a title'
          label='Title'
          onChange={handleChange}
          name='title'
          value={values.title}
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
        <TimeSelectorNoteView
          handleChange={handleChange}
          name='estimatedTime'
          estimatedTime={values.estimatedTime}
        />
        <StatusSelectNoteView
          handleChange={handleChange}
          name='state'
          state={values.state}
        />
        <DifficultSelectNoteView
          handleChange={handleChange}
          name='difficult'
          difficult={values.difficult}
        />
        <SelectRateForHourNoteView
          handleChange={handleChange}
          name='price'
          price={values.price}
        />
        <MultipleSelectChipNoteView
          onChangeTechnologies={onChangeTechnologies}
          technologiesSelected={
            offerActive?.technologies.map((tech) => tech.name) || []
          }
        />
      </Grid>
      {/* <StandardImageList /> */}

      {offerActive?.applied &&
      offerActive?.applied.length > 0 &&
      offerActive?.applied[0].selected ? (
        <Grid
          bgcolor={"secondary.main"}
          padding={5}
          color={"white"}
          marginBottom={10}
          width={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
          container
        >
          <Typography variant='h5' fontWeight={"bold"}>
            Freelancer seleccionado: {offerActive?.applied[0].freelancerName}
          </Typography>

          <Rating
            name='simple-controlled'
            value={valoration}
            onChange={(_event, newValoration) => {
              handleValoration(newValoration || 0);
            }}
          />
        </Grid>
      ) : (
        <Grid container width={"100%"} mb={10}>
          <TableNoteView />
        </Grid>
      )}
    </Grid>
  );
};
