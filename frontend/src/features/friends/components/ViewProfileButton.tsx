import {Link} from "react-router-dom";
import {ROUTES} from "@/shared/const/routes.ts";

const ViewProfileButton = ({id}: { id: string }) => {

  return (
    <Link
      className='button h-10 flex items-center'
      to={ROUTES.PROFILE.replace(':id', id)}
    >
      Просмотреть профиль
    </Link>
  );
};

export default ViewProfileButton;