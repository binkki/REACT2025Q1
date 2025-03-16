import { FormEvent, useRef } from 'react';

function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const result = {
      name: nameRef?.current?.value ?? '',
      age: Number(ageRef?.current?.value),
      email: emailRef?.current?.value ?? '',
      password: passwordRef?.current?.value ?? '',
      password_copy: passwordConfirmRef?.current?.value ?? '',
      terms: termsRef?.current?.checked ?? false,
      gender: genderRef?.current?.value ?? '',
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
