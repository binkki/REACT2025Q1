export type Inputs = {
  name: string;
  age: number;
  email: string;
  password: string;
  password_confirm: string;
  gender: string;
  terms: boolean | undefined;
  country: string;
  image: FileList;
};

export type AppSliceType = {
  countries: string[];
  uncontrolledResults: Inputs[];
  controlledResults: Inputs[];
};
