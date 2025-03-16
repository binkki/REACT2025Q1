import * as yup from 'yup';
import { FormErrors } from '../types';
import * as consts from './constants';

export const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      consts.textFirstUpperPattern.regex,
      consts.textFirstUpperPattern.error
    )
    .required(consts.fieldRequiredError),
  age: yup
    .number()
    .typeError(consts.numberError)
    .positive(consts.ageMinError)
    .max(120, consts.ageMaxError)
    .required(consts.fieldRequiredError),
  email: yup
    .string()
    .required(consts.fieldRequiredError)
    .email(consts.emailPattern.error)
    .matches(consts.emailPattern.regex, consts.emailPattern.error),
  password: yup
    .string()
    .required(consts.fieldRequiredError)
    .matches(consts.spacesPattern.regex, consts.spacesPattern.error)
    .matches(consts.textNumberPattern.regex, consts.textNumberPattern.error)
    .matches(consts.textUpperPattern.regex, consts.textUpperPattern.error)
    .matches(consts.textLowerPattern.regex, consts.textLowerPattern.error)
    .matches(consts.textSymbolPattern.regex, consts.textSymbolPattern.error),
  password_confirm: yup
    .string()
    .required(consts.fieldRequiredError)
    .oneOf([yup.ref('password')], consts.passwordMatchError),
  country: yup
    .string()
    .required(consts.fieldRequiredError)
    .oneOf(consts.contriesList, consts.countriesError),
  gender: yup.string().required(consts.fieldRequiredError),
  terms: yup
    .boolean()
    .required(consts.termsError)
    .oneOf([true], consts.termsError),
  image: yup
    .mixed<FileList>()
    .test('fileFormat', consts.imageExtError, (value) => {
      return (
        value instanceof FileList &&
        value[0] &&
        ['image/png', 'image/jpeg', 'image/jpg'].includes(value[0].type)
      );
    })
    .test(
      'fileSize',
      consts.imageSizeError,
      (value) =>
        value instanceof FileList && value[0] && value[0].size <= 5242880
    )
    .required(consts.fieldRequiredError),
});

export const getYupErrors = (errors: yup.ValidationError): FormErrors => {
  const yupErrors: FormErrors = {};

  errors.inner.forEach((error) => {
    if (error.path !== undefined) {
      yupErrors[error.path] = error.errors[0];
    }
  });

  return yupErrors;
};
