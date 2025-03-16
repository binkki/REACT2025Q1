import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { Inputs } from '../types';
import { RootState } from '../store';
import { convertImageToBase64 } from '../utils/utils';
import { addControlledResult } from '../store/slices/appSlice';

const ReactHookForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const countries = useSelector((state: RootState) => state.app.countries);

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
        <input id="rhf-image" type="file" {...register('image')} />
        <div>
          <span>Accept terms and conditions</span>
          <input id="rhf-terms" type="checkbox" {...register('terms')} />
        </div>
        <button>Submit</button>
      </form>
      <NavLink to="/">Home</NavLink>
    </div>
  );
};

export default ReactHookForm;
