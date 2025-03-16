import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Inputs } from '../types';
import { RootState } from '../store';

const ReactHookForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const countries = useSelector((state: RootState) => state.app.countries);

  const onSubmit: SubmitHandler<Inputs> = async (data) => console.log(data);

  return (
    <>
      <div>React Hook Form</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          id="rhf-name"
          type="text"
          placeholder="Name"
          {...register('name')}
        />
        <input
          id="rhf-age"
          type="number"
          placeholder="Age"
          {...register('age')}
        />
        <input
          id="rhf-email"
          type="email"
          placeholder="Email"
          {...register('email')}
        />
        <input
          id="rhf-password"
          type="password"
          placeholder="Password"
          {...register('password')}
        />
        <input
          id="rhf-password_confirm"
          type="password"
          placeholder="Confirm password"
          {...register('password_confirm')}
        />
        <select id="rhf-gender" {...register('gender')}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="text"
          id="country"
          list="countryList"
          {...register('country')}
        />
        <datalist id="countryList">
          {countries.map((optionCountry: string, _) => (
            <option key={_} value={optionCountry}>
              {optionCountry}
            </option>
          ))}
        </datalist>
        <div>
          <span>Accept terms and conditions</span>
          <input id="rhf-terms" type="checkbox" {...register('terms')} />
        </div>
        <button>Submit</button>
      </form>
    </>
  );
};

export default ReactHookForm;
