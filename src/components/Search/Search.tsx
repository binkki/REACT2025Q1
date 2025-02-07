import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type SearchFormFields = {
  search: string;
};

type SearchProps = {
  update: (newSearch: string | undefined, newPage: number) => void;
};

const Search = (props: SearchProps) => {
  const { register, handleSubmit } = useForm<SearchFormFields>();
  const { update } = props;
  const { getSearchValue } = useLocalStorage();

  const submitSearch: SubmitHandler<SearchFormFields> = (data) => {
    update(data.search, 1);
  };

  return (
    <>
      <form className="search-wrapper" onSubmit={handleSubmit(submitSearch)}>
        <input
          id="search-input"
          type="input"
          defaultValue={getSearchValue()}
          {...register('search')}
        />
        <input className="search-submit" type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
