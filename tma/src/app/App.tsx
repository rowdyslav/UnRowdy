import {useRef, useState} from "react";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import CategoriesPage from "@/pages/categories/CategoriesPage.tsx";
import ProfilePage from "@/pages/profile/ProfilePage.tsx";
import ServicePage from "@/pages/service/ServicePage.tsx";
import { AppContext } from "./providers/AppContext";

const App = () => {
  const [idSubCategory, setIdSubCategory] = useState<string>('')
  const [nameCategory, setNameCategory] = useState<string>('')

  const flickingRef = useRef<Flicking>(null);
  const goNext = () => flickingRef.current?.next();   // движение влево (вперёд)
  const goPrev = () => flickingRef.current?.prev();

  const idPage = flickingRef.current?.index
  const tg = window.Telegram?.WebApp

  if (idPage === 0) {
    tg?.BackButton?.show()
    tg?.BackButton?.onClick(goPrev)
  } else {
    tg?.BackButton?.offClick()
    console.log(idPage)
  }

  return (
    <AppContext.Provider
      value={{
        goNext,
        setIdSubCategory,
        idSubCategory,
        setNameCategory
      }}
    >
      <div className="w-full h-screen">
        <Flicking
          align="prev"
          ref={flickingRef}
          circular={false}
          renderOnlyVisible={true}
          duration={700}
          inputType={[]}
          horizontal={true}
        >
          <div className="w-full h-[90vh]">
            <ProfilePage/>
          </div>

          <div className="w-full h-[90vh] px-4 py-2">
            <CategoriesPage isSubCategories={false}/>
          </div>

          <div className="w-full h-[90vh] px-4 py-2">
            <CategoriesPage isSubCategories={true}/>
          </div>

          <div className="w-full h-[90vh] px-4 py-2">
            <ServicePage nameCategory={nameCategory}/>
          </div>
        </Flicking>

        <div className="absolute z-20 right-20 flex gap-3 mt-4 justify-center">
          <button onClick={goPrev} className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">
            Назад
          </button>

          <button onClick={goNext} className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">
            Вперёд
          </button>
        </div>
      </div>
    </AppContext.Provider>
    )
}

export default App;
