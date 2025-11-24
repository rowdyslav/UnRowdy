import type {CategoryProps} from "@/entities/category/ui/CategoryProps.ts";
import {useAppContext} from "@/app/providers/AppContext.tsx";

const Category = ({label, _id, isSubCategory}: CategoryProps) => {
  const {setNameCategory, setIdSubCategory, goNext} = useAppContext()

  const handleClick = () => {
    if (!isSubCategory) {
      setIdSubCategory(_id)
      setNameCategory(label)
    }
    goNext()
  }

  return (
    <div
      className="h-full w-full rounded-xl shadow-md p-6 flex
      items-center justify-center text-lg font-medium text-gray-800"
      onClick={handleClick}
    >
      {label}
    </div>
  );
};

export default Category;
