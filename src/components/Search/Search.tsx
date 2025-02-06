import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type SearchFormFields = {
  search: string;
};

const Search = (props: { search: (searchTerm?: string) => Promise<void> }) => {
  const { register, handleSubmit } = useForm<SearchFormFields>();
  const { search } = props;
  const { getSearchValue } = useLocalStorage();

  const submitSearch: SubmitHandler<SearchFormFields> = (data) => {
    search(data.search);
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
