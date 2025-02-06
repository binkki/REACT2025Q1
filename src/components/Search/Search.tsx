import { SubmitHandler, useForm } from 'react-hook-form';
import { SEARCH_KEY } from '../../utils/constants';
import { getLsValue, setLsValue } from '../../utils/utils';

type SearchFormFields = {
  search: string;
};

const Search = (props: { search: () => Promise<void> }) => {
  const { register, handleSubmit, reset } = useForm<SearchFormFields>();
  const { search } = props;

  const submitSearch: SubmitHandler<SearchFormFields> = (data) => {
    reset();
    setLsValue(SEARCH_KEY, data.search);
    search();
  };

  return (
    <>
      <form className="search-wrapper" onSubmit={handleSubmit(submitSearch)}>
        <input
          id="search-input"
          type="input"
          defaultValue={getLsValue(SEARCH_KEY)}
          {...register('search')}
        />
        <input className="search-submit" type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
