import React from "react";
import InputWithLabel from "./InputWithLabel";
import "./SearchForm.css";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

type SearchFormProps = {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const SearchForm = ({
  onSearchInput,
  onSearchSubmit,
  searchTerm,
}: SearchFormProps) => (
  <Box
    component="form"
    onSubmit={onSearchSubmit}
    sx={{ display: "flex", flexDirection: "column" }}
  >
    <TextField label="search" onChange={onSearchInput} />
    <Button
      sx={{ marginTop: "2rem" }}
      variant="contained"
      type="submit"
      disabled={!searchTerm}
    >
      Submit
    </Button>
  </Box>
);

export default SearchForm;
