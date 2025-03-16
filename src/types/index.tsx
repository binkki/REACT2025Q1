export type Inputs = {
  name: string;
  age: number;
  email: string;
  password: string;
  password_confirm: string;
  gender: string;
  terms: boolean;
  country: string;
  image: FileList;
};

export type FormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  password_confirm: string;
  gender: string;
  terms: boolean;
  country: string;
  image: string;
};

export type AppSliceType = {
  countries: string[];
  uncontrolledResults: FormData[];
  controlledResults: FormData[];
};

export type FormErrors = {
  [field: string]: string;
};
