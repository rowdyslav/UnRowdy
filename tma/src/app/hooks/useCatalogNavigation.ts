import {useCallback, useRef, useState} from "react";
import type Flicking from "@egjs/react-flicking";

interface FlickingChangeEvent {
  index: number;
}

export const useCatalogNavigation = () => {
  const flickingRef = useRef<Flicking | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const goToNextPage = useCallback(() => {
    void flickingRef.current?.next();
  }, []);

  const goToPreviousPage = useCallback(() => {
    void flickingRef.current?.prev();
  }, []);

  const handlePageChanged = useCallback(({index}: FlickingChangeEvent) => {
    setCurrentPage(index ?? 0);
  }, []);

  return {
    currentPage,
    flickingRef,
    goToNextPage,
    goToPreviousPage,
    handlePageChanged,
  };
};
