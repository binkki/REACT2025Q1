import { NavLink } from 'react-router';
import { useEffect, useState } from 'react';
import { FormData } from '../types';
import FormListInput from './FormListInput';

type FormListProps = {
  data: FormData[];
  title: string;
  isNew: boolean;
};

function FormList(props: FormListProps) {
  const { title, isNew } = props;
  const [data, setData] = useState<FormData[]>([]);

  useEffect(() => {
    const result = [...props.data];
    setData(result.reverse());
  }, []);

  return (
    <div className="flex flex-column form-list">
      {data.length > 0 && (
        <div className="flex form-data">
          {data.map((x: FormData, index) => (
            <FormListInput
              key={`${title}-${index}`}
              formData={x}
              isNew={isNew && index === 0}
            />
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
