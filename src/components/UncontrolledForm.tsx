import { FormEvent, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

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
    console.log(result);
  };

  return (
    <>
      <div>Uncontrolled Form</div>
      <form onSubmit={(e: FormEvent) => submit(e)}>
        <input id="name" type="text" placeholder="Name" ref={nameRef} />
        <input id="age" type="number" placeholder="Age" ref={ageRef} />
        <input id="email" type="text" placeholder="Email" ref={emailRef} />
        <input
          id="password"
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
        <input
          id="password_confirm"
          type="password"
          placeholder="Confirm password"
          ref={passwordConfirmRef}
        />
        <select id="gender" ref={genderRef}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input type="text" id="country" list="countryList" ref={countryRef} />
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
    </>
  );
}

export default UncontrolledForm;
