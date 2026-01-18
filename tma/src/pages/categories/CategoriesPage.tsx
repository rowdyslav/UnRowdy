import {useCategories} from "@/entities/category/api/useCategories.ts";
import {useAppContext} from "@/app/providers/AppContext.tsx";
import Category from "@/entities/category/ui/category.tsx";
import "@egjs/react-flicking/dist/flicking.css";
import Flicking from '@egjs/react-flicking';

const CategoriesPage = ({isSubCategories}: { isSubCategories: boolean }) => {
  const {idSubCategory} = useAppContext();
  const {data: categoriesData} = useCategories({
    _id: isSubCategories ? idSubCategory : "",
  });

  return (
    <div
      className="w-full h-[100vh] overflow-hidden select-none bg-gradient-to-br from-blue-100 via-blue-50 to-blue-100"
    >
      <Flicking
        align="prev"
        circular={true}
        horizontal={false}
        renderOnlyVisible={true}
        defaultIndex={0}
        duration={150}
        inputType={["touch", "mouse"]}
        threshold={70}
        bounce={20}
        preventClickOnDrag={true}
        panelsPerView={1}
        className="h-full w-full"
        moveType={["snap"]}
      >
        {categoriesData?.map((category) => (
          <div
            key={category._id}
            className="w-full h-[100vh] flex items-center justify-center"
          >
            <Category
              label={category.name}
              _id={category._id}
              isSubCategory={isSubCategories}
            />
          </div>
        ))}
      </Flicking>
    </div>
  );
};

export default CategoriesPage;
