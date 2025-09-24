import {Link} from "react-router-dom";
import {ROUTES} from "@/shared/const/routes.ts";

const ToCreateService = () => {
  return (
    <div className='bg-white rounded-lg flex flex-col gap-3 justify-center items-center transition duration-75 border-primary border-[3px] h-40 hover:border-gray-300'>
      <h3 className="color-font text-2xl font-semibold in-center">Добавьте новую услугу</h3>
      <Link rel="stylesheet" className='button w-fit' to={ROUTES.ADD_SERVICE}>Создать</Link>
    </div>
  );
};

export default ToCreateService;