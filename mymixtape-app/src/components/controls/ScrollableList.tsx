import { useEffect, useRef, useState } from "react";
import Loader from "../shared/Loader";

export default function ScrollableList(props: ScrollableListProps) {
  const { items, getMoreData, maxPlaylists, isLoading } = props;
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [previousPage, setPreviousPage] = useState<number>(0);
  const [wasLastList, setWasLastList] = useState<boolean>(false);

  const listInnerRef = useRef(null);

  useEffect(() => {
    setIsEmpty(items.length === 0);
  }, [items]);

  useEffect(() => {
    if (items.length >= maxPlaylists && maxPlaylists !== -1) {
      setWasLastList(true);
      return;
    }

    setPreviousPage(currentPage);
    if (!wasLastList && previousPage !== currentPage) {
      getMoreData(items.length, 20);
    }
  }, [currentPage, wasLastList, previousPage, items]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  return (
    <div
      className="overflow-auto px-3 playlist-container"
      ref={listInnerRef}
      onScroll={onScroll}
    >
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Loader />
        </div>
      )}
      {!isLoading && isEmpty && (
        <div>
          <p className="text-center">No Playlists</p>
        </div>
      )}
      {!isEmpty && !isLoading && items}
    </div>
  );
}

interface ScrollableListProps {
  items: JSX.Element[];
  getMoreData: (offset: number, limit: number) => void;
  maxPlaylists: number;
  isLoading: boolean;
}
