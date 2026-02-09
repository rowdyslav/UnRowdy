import CategoriesPage from "@/pages/categories/CategoriesPage.tsx";
import ServicePage from "@/pages/service/ServicePage.tsx";
import { useRef, useState } from "react";
import { AppContext } from "./providers/AppContext";
import MainPage from "@/pages/main/MainPage.tsx";
import "@egjs/react-flicking/dist/flicking.css";
import Flicking from "@egjs/react-flicking";
import SearchInput from "@/features/SearchInput.tsx";
import {authApi} from "@/share/api/auth/authApi.ts";

const App = () => {
  const [idSubCategory, setIdSubCategory] = useState<string>("");
  const [nameCategory, setNameCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [keywords, setKeywords] = useState<string>("");

  const flickingRef = useRef<Flicking>(null);
  const goNext = () => flickingRef.current?.next();
  const goPrev = () => flickingRef.current?.prev();

  const tg = window.Telegram?.WebApp;
  void authApi.auth( tg?.initDataUnsafe?.user?.id || 0, tg?.initDataUnsafe?.user?.username || "")

  const handleChanged = (e: any) => {
    const page = e.index ?? 0;
    setCurrentPage(page);

    if (!tg) return;
    tg.BackButton.offClick(goPrev);

    if (page > 0) {
      tg.BackButton.show();
      tg.BackButton.onClick(goPrev);
    } else {
      tg.BackButton.hide();
    }
  };

  return (
    <AppContext.Provider
      value={{
        goNext,
        setIdSubCategory,
        idSubCategory,
        setNameCategory
      }}
    >
      <div className="w-full h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 relative overflow-hidden">
        <Flicking
          align="prev"
          ref={flickingRef}
          circular={false}
          renderOnlyVisible={true}
          duration={700}
          inputType={[]}
          horizontal={true}
          onChanged={handleChanged}
        >
          <div className="w-full h-[100vh]">
            <MainPage />
          </div>

          <div className="w-full h-[100vh]">
            <CategoriesPage isSubCategories={false} />
          </div>

          <div className="w-full h-[100vh]">
            <CategoriesPage isSubCategories={true} />
          </div>

          <div className="w-full h-[100vh]">
            <ServicePage
              nameCategory={nameCategory}
              keywords={keywords}
            />
          </div>
        </Flicking>

        <SearchInput
          currPage={currentPage}
          setKeywords={setKeywords}
          keywords={keywords}
        />
      </div>
    </AppContext.Provider>
  );
};

export default App;
