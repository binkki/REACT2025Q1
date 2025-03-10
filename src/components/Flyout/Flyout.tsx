'use client';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllBookmarks } from '../../store/slices/appSlice';
import { useEffect, useRef, useState } from 'react';
import { RootState } from '../../store/store';
import { generateCSVfromArray } from '../../utils/utils';
import { LinkAtributes } from '../../types';

export const Flyout = () => {
  const dispatch = useDispatch();
  const bookmarkedCards = useSelector(
    (state: RootState) => state.app.bookmarks
  );
  const [flyoutText, setFlyoutText] = useState('');
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [link, setLink] = useState<LinkAtributes>({
    download: '',
    href: '',
  });

  useEffect(() => {
    const sEnding = bookmarkedCards.length > 1 ? 's' : '';
    setLink({
      ...link,
      download: `${bookmarkedCards.length}_character${sEnding}.csv`,
    });
    setFlyoutText(`Selected ${bookmarkedCards.length} character${sEnding}`);
  }, [bookmarkedCards.length]);

  const unselectAll = () => {
    dispatch(removeAllBookmarks());
  };

  const download = async () => {
    const csvContent = generateCSVfromArray(bookmarkedCards);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' });
    await setLink({
      ...link,
      href: URL.createObjectURL(blob),
    });
    linkRef.current?.click();
  };

  return (
    bookmarkedCards.length > 0 && (
      <div data-testid={'flyout'}>
        <a
          ref={linkRef}
          href={link.href}
          download={link.download}
          data-testid={'flyout-link'}
        />
        <div className="flex-column flyout">
          <span>{flyoutText}</span>
          <button onClick={() => unselectAll()} data-testid={'flyout-unselect'}>
            Unselect all
          </button>
          <button onClick={() => download()} data-testid={'flyout-download'}>
            Download
          </button>
        </div>
      </div>
    )
  );
};
