import { FormData } from '../types';

type FormListInputProps = {
  formData: FormData;
  isNew: boolean;
};

function FormListInput(props: FormListInputProps) {
  return (
    <div
      className={'flex flex-column form-preview'.concat(
        props.isNew ? ' new-form' : ''
      )}
    >
      <span>Name: {props.formData.name}</span>
      <span>Email: {props.formData.email}</span>
      <span>Age: {props.formData.age}</span>
      <span>Gender: {props.formData.gender}</span>
      <span>Country: {props.formData.country}</span>
      <div>
        {props.formData.image && <img src={props.formData.image} alt="image" />}
      </div>
    </div>
  );
}

export default FormListInput;
