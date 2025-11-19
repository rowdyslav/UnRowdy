import Flicking from '@egjs/react-flicking';
import "@egjs/react-flicking/dist/flicking.css";
import {useCategories} from "@/entities/category/api/useCategories.ts";
import Category from "@/entities/category/ui/category.tsx";

interface CategoriesPageProps {
  _id: string,
  setIdSubCategory: (_id: string) => void
  goNext: () => void
  setNameCategory: (label: string) => void
}

const CategoriesPage = ({_id, setIdSubCategory, goNext, setNameCategory}: CategoriesPageProps) => {
  const {data: categoriesData} = useCategories({_id})

  const HandleSetId = (id: string) => {
    if (!_id) setIdSubCategory(id)
    goNext()
  }

  return (
    <div className="w-full h-[90vh] overflow-hidden select-none">
      <Flicking
        align="prev"
        circular={true}
        horizontal={false}
        renderOnlyVisible={false}
        defaultIndex={0}
        duration={100}
        inputType={['touch', 'mouse']}
        threshold={70}
        bounce={10}
        preventClickOnDrag={true}
        disableOnInit={false}
        panelsPerView={10}
        className="h-full w-full"
        preventDefaultOnDrag={false}
        interruptable={true}
        moveType={["snap"]}
      >
        {categoriesData && categoriesData.map((category) => (
          <div
            key={category._id} className='w-full h-full px-4 py-2'
          >
            <Category label={category.name} _id={category._id} setId={HandleSetId} setNameCategory={setNameCategory}/>
          </div>
        ))}

        {categoriesData && categoriesData.map((category) => (
          <div key={category._id} className='w-full h-full px-4 py-2'>
            <Category label={category.name} _id={category._id} setId={HandleSetId} setNameCategory={setNameCategory}/>
          </div>
        ))}

        {categoriesData && categoriesData.map((category) => (
          <div key={category._id} className='w-full h-full px-4 py-2'>
            <Category label={category.name} _id={category._id} setId={HandleSetId} setNameCategory={setNameCategory}/>
          </div>
        ))}

        {categoriesData && categoriesData.map((category) => (
          <div key={category._id} className='w-full h-full px-4 py-2'>
            <Category label={category.name} _id={category._id} setId={HandleSetId} setNameCategory={setNameCategory}/>
          </div>
        ))}

        {categoriesData && categoriesData.map((category) => (
          <div key={category._id} className='w-full h-full px-4 py-2'>
            <Category label={category.name} _id={category._id} setId={HandleSetId} setNameCategory={setNameCategory}/>
          </div>
        ))}

        {categoriesData && categoriesData.map((category) => (
          <div key={category._id} className='w-full h-full px-4 py-2'>
            <Category label={category.name} _id={category._id} setId={HandleSetId} setNameCategory={setNameCategory}/>
          </div>
        ))}
      </Flicking>
    </div>
  );
};

export default CategoriesPage;