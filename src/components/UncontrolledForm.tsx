import { FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { RootState } from '../store';
import { convertImageToBase64 } from '../utils/utils';
import { addUncontrolledResult } from '../store/slices/appSlice';
import PasswordStrength from './PasswordStrength';
import { FormErrors } from '../types';
import { getYupErrors, schema } from '../utils/validation';
import { ValidationError } from 'yup';

function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const countries = useSelector((state: RootState) => state.app.countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const result = {
      name: nameRef?.current?.value ?? '',
      age: Number(ageRef?.current?.value),
      email: emailRef?.current?.value ?? '',
      password: passwordRef?.current?.value ?? '',
      password_confirm: passwordConfirmRef?.current?.value ?? '',
      terms: termsRef?.current?.checked ?? false,
      gender: genderRef?.current?.value ?? '',
      country: countryRef?.current?.value ?? '',
      image: imageRef?.current?.files,
    };

    try {
      await schema.validate(result, { abortEarly: false });
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = getYupErrors(error);
        setErrors(errors);
        return;
      }
    }

    const image64 = await convertImageToBase64(imageRef?.current?.files);
    dispatch(
      addUncontrolledResult({
        ...result,
        image: image64,
      })
    );

    navigate('/', { state: { lastSubmited: 'uncontrolled' } });
  };

  return (
    <div className="flex flex-column">
      <div>Uncontrolled Form</div>
      <form className="flex flex-column" onSubmit={(e: FormEvent) => submit(e)}>
        <input id="name" placeholder="Name" ref={nameRef} />
        {errors.name && <span className="error">{errors.name}</span>}
        <input id="age" placeholder="Age" ref={ageRef} />
        {errors.age && <span className="error">{errors.age}</span>}
        <input id="email" placeholder="Email" ref={emailRef} />
        {errors.email && <span className="error">{errors.email}</span>}
        <input
          id="password"
          type="password"
          placeholder="Password"
          ref={passwordRef}
          onChange={() => setPassword(passwordRef?.current?.value ?? '')}
        />
        {errors.password && <span className="error">{errors.password}</span>}
        <PasswordStrength password={password} />
        <input
          id="password_confirm"
          type="password"
          placeholder="Confirm password"
          ref={passwordConfirmRef}
          onChange={() =>
            setPasswordConfirm(passwordConfirmRef?.current?.value ?? '')
          }
        />
        {errors.password_confirm && (
          <span className="error">{errors.password_confirm}</span>
        )}
        <PasswordStrength password={passwordConfirm} />
        <select id="gender" ref={genderRef}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <span className="error">{errors.gender}</span>}
        <input
          id="country"
          list="countryList"
          placeholder="Select your country"
          ref={countryRef}
        />
        <datalist id="countryList">
          {countries.map((optionCountry: string, _) => (
            <option key={_} value={optionCountry}>
              {optionCountry}
            </option>
          ))}
        </datalist>
        {errors.country && <span className="error">{errors.country}</span>}
        <input id="image" type="file" ref={imageRef} />
        {errors.image && <span className="error">{errors.image}</span>}
        <div className="flex">
          <span>Accept terms and conditions</span>
          <input id="terms" type="checkbox" ref={termsRef} />
        </div>
        {errors.terms && <span className="error">{errors.terms}</span>}
        <button type="submit">Submit</button>
      </form>
      <NavLink to="/">Home</NavLink>
    </div>
  );
}

export default UncontrolledForm;
