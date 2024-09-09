import { Box } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ProfileLayout = ({ children }: Props) => {
  return (
    <Box marginX={"200px"} marginY={10} display={"flex"}>
      {children}
    </Box>
  );
};
