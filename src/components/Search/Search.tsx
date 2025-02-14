import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setPage, setSearchTerm } from '../../store/slices/appSlice';

type SearchFormFields = {
  search: string;
};

type SearchProps = {
  update: () => void;
};

const Search = (props: SearchProps) => {
  const { register, handleSubmit } = useForm<SearchFormFields>();
  const { update } = props;
  const { getSearchValue } = useLocalStorage();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitSearch: SubmitHandler<SearchFormFields> = (data) => {
    dispatch(setPage(1));
    dispatch(setSearchTerm(data.search));
    update();
    navigate('/1');
  };

  return (
    <>
      <form className="search-wrapper" onSubmit={handleSubmit(submitSearch)}>
        <input
          id="search-input"
          data-testid="search-input"
          type="input"
          defaultValue={getSearchValue()}
          {...register('search')}
        />
        <input
          data-testid="search-submit"
          className="search-submit"
          type="submit"
          value="Search"
        />
      </form>
    </>
  );
};

export default Search;
