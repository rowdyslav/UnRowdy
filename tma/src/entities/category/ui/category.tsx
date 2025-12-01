import type { CategoryProps } from "@/entities/category/ui/CategoryProps.ts";
import { useAppContext } from "@/app/providers/AppContext.tsx";

const Category = ({ label, _id, isSubCategory }: CategoryProps) => {
  const { setNameCategory, setIdSubCategory, goNext } = useAppContext();

  const handleClick = () => {
    if (!isSubCategory) setIdSubCategory(_id);
    else setNameCategory(label);

    goNext();
  };

  return (
    <div
      onClick={handleClick}
      className="
        w-full h-screen relative overflow-hidden
        flex flex-col items-center
        cursor-pointer select-none
        bg-gradient-to-b from-blue-100 via-blue-50 to-blue-100"
    >
      <div className="w-full h-[60vh] flex items-center justify-center p-6">
        <img
          src='/src/share/assets/coding.webp'
          alt={label}
          className="
            w-full h-full object-cover rounded-2xl shadow-xl
            transition-transform duration-300
            hover:scale-[1.005]"
        />
      </div>


      <div className="w-full flex flex-col items-center text-gray-900 mt-4">
        <p className="text-3xl font-extrabold mb-1 text-center">{label}</p>

        {isSubCategory && (
          <p className="text-sm text-gray-600 mb-2 text-center">
            Подкатегория
          </p>
        )}
      </div>



      <p
        className=" absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-600 opacity-80"
      >
        Свайпните вверх или нажмите для продолжения
      </p>
    </div>
  );
};

export default Category;
