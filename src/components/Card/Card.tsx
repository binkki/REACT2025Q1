import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CardInfo } from '../../types';
import './Card.css';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../../store/slices/appSlice';
import { RootState } from '../../store/store';

const Card = (props: { cardInfo: CardInfo }) => {
  const { cardInfo } = props;
  const { pageId, detailsId } = useParams();
  const navigate = useNavigate();
  const bookmarkRef = useRef(null);
  const [bookmarked, setBookmarked] = useState(false);
  const dispatch = useDispatch();
  const bookmarkedCards = useSelector(
    (state: RootState) => state.app.bookmarks
  );

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
    const characterId = cardInfo.id;
    if (detailsId) navigate(`/${pageId}`);
    else navigate(`/${pageId}/${characterId}`);
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
