import Flicking from '@egjs/react-flicking';
import "@egjs/react-flicking/dist/flicking.css";
import {useCategories} from "@/entities/category/api/useCategories.ts";
import Category from "@/entities/category/ui/category.tsx";
import {useAppContext} from "@/app/providers/AppContext.tsx";

const CategoriesPage = ({isSubCategories}: { isSubCategories: boolean}) => {
  const {idSubCategory} = useAppContext()
  const {data: categoriesData} = useCategories({_id: isSubCategories ? idSubCategory : ''})

  return (
    <div className="w-full h-[100vh] overflow-hidden select-none">
      <Flicking
        align="prev"
        circular={true}
        horizontal={false}
        renderOnlyVisible={true}
        defaultIndex={0}
        duration={100}
        inputType={['touch', 'mouse']}
        threshold={70}
        bounce={10}
        preventClickOnDrag={true}
        disableOnInit={false}
        panelsPerView={1}
        className="h-full w-full"
        preventDefaultOnDrag={false}
        interruptable={true}
        moveType={["snap"]}
      >
        {categoriesData && categoriesData.map((category) => (
          <div key={category._id} className='w-full h-[100vh] px-4 py-2'>
            <Category label={category.name} _id={category._id} isSubCategory={isSubCategories}/>
          </div>
        ))}

        {categoriesData && categoriesData.map((category) => (
          <div key={category._id} className='w-full h-[100vh] px-4 py-2'>
            <Category label={category.name} _id={category._id} isSubCategory={isSubCategories}/>
          </div>
        ))}

        {categoriesData && categoriesData.map((category) => (
          <div key={category._id} className='w-full h-[100vh] px-4 py-2'>
            <Category label={category.name} _id={category._id} isSubCategory={isSubCategories}/>
          </div>
        ))}
      </Flicking>
    </div>
  );
};

export default CategoriesPage;