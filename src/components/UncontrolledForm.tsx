import { FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { RootState } from '../store';
import { convertImageToBase64 } from '../utils/utils';
import { addUncontrolledResult } from '../store/slices/appSlice';
import PasswordStrength from './PasswordStrength';

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

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const image64 = await convertImageToBase64(imageRef?.current?.files);
    dispatch(
      addUncontrolledResult({
        name: nameRef?.current?.value ?? '',
        age: Number(ageRef?.current?.value),
        email: emailRef?.current?.value ?? '',
        password: passwordRef?.current?.value ?? '',
        password_confirm: passwordConfirmRef?.current?.value ?? '',
        terms: termsRef?.current?.checked ?? false,
        gender: genderRef?.current?.value ?? '',
        country: countryRef?.current?.value ?? '',
        image: image64,
      })
    );
    navigate('/', { state: { lastSubmited: 'uncontrolled' } });
  };

  return (
    <div className="flex flex-column">
      <div>Uncontrolled Form</div>
      <form className="flex flex-column" onSubmit={(e: FormEvent) => submit(e)}>
        <input id="name" type="text" placeholder="Name" ref={nameRef} />
        <input id="age" type="number" placeholder="Age" ref={ageRef} />
        <input id="email" type="text" placeholder="Email" ref={emailRef} />
        <input
          id="password"
          type="password"
          placeholder="Password"
          ref={passwordRef}
          onChange={() => setPassword(passwordRef?.current?.value ?? '')}
        />
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
        <PasswordStrength password={passwordConfirm} />
        <select id="gender" ref={genderRef}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="text"
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
        <input id="image" type="file" ref={imageRef} />
        <div>
          <span>Accept terms and conditions</span>
          <input id="terms" type="checkbox" ref={termsRef} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <NavLink to="/">Home</NavLink>
    </div>
  );
}

export default UncontrolledForm;
