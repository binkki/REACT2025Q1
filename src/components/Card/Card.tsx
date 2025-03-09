import { useEffect, useRef, useState } from 'react';
import { CardInfo } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBookmark,
  removeBookmark,
  setParams,
} from '../../store/slices/appSlice';
import { RootState } from '../../store/store';
import { useRouter } from 'next/navigation';
import { EMPTY_SEARCH } from '../../utils/constants';

const Card = (props: { cardInfo: CardInfo }) => {
  const { cardInfo } = props;
  const bookmarkRef = useRef(null);
  const [bookmarked, setBookmarked] = useState(false);
  const dispatch = useDispatch();
  const bookmarkedCards = useSelector(
    (state: RootState) => state.app.bookmarks
  );
  const params = useSelector((state: RootState) => state.app.params);
  const router = useRouter();

  useEffect(() => {
    setBookmarked(
      bookmarkedCards.filter((x: CardInfo) => x.id === cardInfo.id).length === 1
    );
  }, [bookmarkedCards.length]);

  const cardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === bookmarkRef.current) updateBookmarks();
    else openDetails();
  };

  const updateBookmarks = () => {
    setBookmarked(!bookmarked);
    dispatch(bookmarked ? removeBookmark(cardInfo.id) : addBookmark(cardInfo));
  };

  const openDetails = () => {
    dispatch(
      setParams({
        details: cardInfo.id,
      })
    );
    const currentPage = params.page;
    const currentSearch = params.searchTerm.length
      ? `&search=${params.searchTerm}`
      : EMPTY_SEARCH;
    router.push(`/?page=${currentPage}${currentSearch}&details=${cardInfo.id}`);
  };

  return (
    <div onClick={(e) => cardClick(e)}>
      <div className="item-wrapper">
        <img
          src={cardInfo.image}
          className="item-image"
          data-testid={`item-image-${cardInfo.id}`}
        />
        <div className="item-title" data-testid={`item-name-${cardInfo.id}`}>
          {cardInfo.name}
        </div>
      </div>
      <button
        ref={bookmarkRef}
        className={`bookmark-button ${bookmarked ? 'bookmarked' : ''}`}
        data-testid="bookmark"
      />
    </div>
  );
};

export default Card;
