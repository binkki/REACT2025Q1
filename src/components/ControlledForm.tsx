import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Inputs } from '../types';
import { RootState } from '../store';
import { convertImageToBase64, getFormErrorStatus } from '../utils/utils';
import { addControlledResult } from '../store/slices/appSlice';
import PasswordStrength from './PasswordStrength';
import { schema } from '../utils/validation';

const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    reValidateMode: 'onChange',
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const countries = useSelector((state: RootState) => state.app.countries);

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const passwordField = register('password');
  const passwordConfirmField = register('password_confirm');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const image64 = await convertImageToBase64(data.image);
    dispatch(
      addControlledResult({
        name: data.name,
        age: data.age,
        email: data.email,
        password: data.password,
        password_confirm: data.password_confirm,
        terms: data.terms,
        gender: data.gender,
        country: data.country,
        image: image64,
      })
    );
    navigate('/', { state: { lastSubmited: 'controlled' } });
  };

  return (
    <div className="flex flex-column">
      <div>React Hook Form</div>
      <form className="flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <input id="rhf-name" placeholder="Name" {...register('name')} />
        {errors.name && <span className="error">{errors.name.message}</span>}
        <input id="rhf-age" placeholder="Age" {...register('age')} />
        {errors.age && <span className="error">{errors.age.message}</span>}
        <input id="rhf-email" placeholder="Email" {...register('email')} />
        {errors.email && <span className="error">{errors.email.message}</span>}
        <input
          id="rhf-password"
          type="password"
          placeholder="Password"
          {...passwordField}
          onChange={(e) => {
            passwordField.onChange(e);
            setPassword((e.target as HTMLInputElement).value);
          }}
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
        <PasswordStrength password={password} />
        <input
          id="rhf-password_confirm"
          type="password"
          placeholder="Confirm password"
          {...passwordConfirmField}
          onChange={(e) => {
            passwordConfirmField.onChange(e);
            setPasswordConfirm((e.target as HTMLInputElement).value);
          }}
        />
        {errors.password_confirm && (
          <span className="error">{errors.password_confirm.message}</span>
        )}
        <PasswordStrength password={passwordConfirm} />
        <select id="rhf-gender" {...register('gender')}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <span className="error">{errors.gender.message}</span>
        )}
        <input
          id="country"
          list="countryList"
          placeholder="Select your country"
          {...register('country')}
        />
        <datalist id="countryList">
          {countries.map((optionCountry: string, _) => (
            <option key={_} value={optionCountry}>
              {optionCountry}
            </option>
          ))}
        </datalist>
        {errors.country && (
          <span className="error">{errors.country.message}</span>
        )}
        <input id="rhf-image" type="file" {...register('image')} />
        {errors.image && <span className="error">{errors.image.message}</span>}
        <div className="flex">
          <span>Accept terms and conditions</span>
          <input id="rhf-terms" type="checkbox" {...register('terms')} />
        </div>
        {errors.terms && <span className="error">{errors.terms.message}</span>}
        <button disabled={getFormErrorStatus(errors)}>Submit</button>
      </form>
      <NavLink to="/">Home</NavLink>
    </div>
  );
};

export default ReactHookForm;
