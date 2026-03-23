import CategoriesPage from "@/pages/categories/CategoriesPage.tsx";
import ServicePage from "@/pages/service/ServicePage.tsx";
import AppProvider from "./providers/AppProvider";
import MainPage from "@/pages/main/MainPage.tsx";
import "@egjs/react-flicking/dist/flicking.css";
import Flicking from "@egjs/react-flicking";
import SearchInput from "@/features/SearchInput.tsx";
import {useCatalogNavigation} from "@/app/hooks/useCatalogNavigation.ts";
import {useTelegramMiniAppAuth} from "@/app/hooks/useTelegramMiniAppAuth.ts";
import {useTelegramBackButton} from "@/app/hooks/useTelegramBackButton.ts";

const App = () => {
  const {
    currentPage,
    flickingRef,
    goToNextPage,
    goToPreviousPage,
    handlePageChanged,
  } = useCatalogNavigation();

  useTelegramMiniAppAuth();
  useTelegramBackButton({
    currentPage,
    onBack: goToPreviousPage,
  });

  return (
    <AppProvider
      currentPage={currentPage}
      goToNextPage={goToNextPage}
      goToPreviousPage={goToPreviousPage}
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
          onChanged={handlePageChanged}
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
            <ServicePage />
          </div>
        </Flicking>

        <SearchInput />
      </div>
    </AppProvider>
  );
};

export default App;
