import { NavLink } from 'react-router';
import { FormData } from '../types';
import FormListInput from './FormListInput';

type FormListProps = {
  data: FormData[];
  title: string;
};

function FormList(props: FormListProps) {
  const { data, title } = props;
  return (
    <div className="flex flex-column form-list">
      {data.length > 0 && (
        <div className="flex form-data">
          {data.map((x: FormData, index) => (
            <FormListInput key={`${title}-${index}`} formData={x} />
          ))}
        </div>
      )}
      <NavLink to={`/${title}-form`}>
        {data.length > 0
          ? `Fill out another ${title} form`
          : `There is nothing here. Fill out your first ${title} Form`}
      </NavLink>
    </div>
  );
}

export default FormList;
