import {Link} from "react-router-dom";
import {ROUTES} from "@/shared/const/routes.ts";

const ToCreate = () => {
  return (
    <div className='card-element w-1/3 center mx-auto flex-col gap-3 h-40 '>
      <h3
        className="color-font text-2xl font-semibold center-inline"
      >Добавьте новую услугу
      </h3>
      <Link
        rel="stylesheet" className='button w-fit' to={ROUTES.ADD_SERVICE}
      >Создать</Link>
    </div>
  );
};

export default ToCreate;