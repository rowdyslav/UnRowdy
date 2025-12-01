import CategoriesPage from "@/pages/categories/CategoriesPage.tsx";
import ServicePage from "@/pages/service/ServicePage.tsx";
import MainPage from "@/pages/main/MainPage.tsx";
import { AppContext } from "./providers/AppContext";
import "@egjs/react-flicking/dist/flicking.css";
import Flicking from "@egjs/react-flicking";
import { useEffect, useRef, useState } from "react";

const App = () => {
  const [idSubCategory, setIdSubCategory] = useState<string>('');
  const [nameCategory, setNameCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);

  const flickingRef = useRef<Flicking>(null);
  const goNext = () => flickingRef.current?.next();
  const goPrev = () => flickingRef.current?.prev();

  const tg = window.Telegram?.WebApp;

  useEffect(() => {
    const handleMove = () => {
      const newIndex = flickingRef.current?.index || 0;
      setCurrentPage(newIndex);
    };

    flickingRef.current?.on("changed", handleMove);

    return () => {
      flickingRef.current?.off("changed", handleMove);
    };
  }, []);

  useEffect(() => {
    if (!tg) return;

    if (currentPage > 0) {
      tg.BackButton.show();
      tg.BackButton.onClick(goPrev);
    } else {
      tg.BackButton.hide();
      tg.BackButton.offClick(goPrev);
    }

    return () => tg.BackButton.offClick(goPrev);
  }, [currentPage, tg, goPrev]);

  return (
    <AppContext.Provider
      value={{
        goNext,
        setIdSubCategory,
        idSubCategory,
        setNameCategory
      }}
    >
      <div className="w-full h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
        <Flicking
          align="prev"
          ref={flickingRef}
          circular={false}
          renderOnlyVisible={true}
          duration={700}
          inputType={[]}
          horizontal={true}
        >
          <div className="w-full h-[100vh]">
            <MainPage/>
          </div>

          <div className="w-full h-[100vh]">
            <CategoriesPage isSubCategories={false}/>
          </div>

          <div className="w-full h-[100vh]">
            <CategoriesPage isSubCategories={true}/>
          </div>

          <div className="w-full h-[100vh] px-4 py-2">
            <ServicePage nameCategory={nameCategory}/>
          </div>
        </Flicking>
      </div>
    </AppContext.Provider>
  );
};

export default App;
