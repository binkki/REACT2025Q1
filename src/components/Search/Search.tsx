import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setParams } from '../../store/slices/appSlice';
import { useEffect, useState } from 'react';
import './Search.css';

type SearchFormFields = {
  search: string;
};

const Search = () => {
  const { register, handleSubmit } = useForm<SearchFormFields>();
  const { setSearchValue, getSearchValue } = useLocalStorage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(getSearchValue());
  }, []);

  const submitSearch: SubmitHandler<SearchFormFields> = (data) => {
    setSearchValue(data.search);
    dispatch(
      setParams({
        page: 1,
        searchTerm: data.search,
      })
    );
    navigate('/1');
  };

  return (
    <>
      <form
        className="flex-row search-wrapper"
        onSubmit={handleSubmit(submitSearch)}
      >
        <input
          id="search-input"
          data-testid="search-input"
          type="input"
          defaultValue={inputValue}
          {...register('search')}
        />
        <button data-testid="search-submit">Search</button>
      </form>
    </>
  );
};

export default Search;
