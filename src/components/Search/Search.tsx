'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setParams } from '../../store/slices/appSlice';
import { useRouter } from 'next/navigation';

type SearchFormFields = {
  search: string;
};

export const Search = () => {
  const { register, handleSubmit } = useForm<SearchFormFields>();
  const dispatch = useDispatch();
  const router = useRouter();

  const submitSearch: SubmitHandler<SearchFormFields> = (data) => {
    dispatch(
      setParams({
        page: 1,
        searchTerm: data.search,
        details: undefined,
      })
    );
    const searchParam = data.search.length ? `&search=${data.search}` : '';
    router.push(`/?page=1${searchParam}`);
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
          {...register('search')}
        />
        <button data-testid="search-submit">Search</button>
      </form>
    </>
  );
};
