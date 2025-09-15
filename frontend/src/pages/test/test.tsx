import {Link} from "react-router-dom";
import {ROUTES} from "@/app/router/routes.ts";

const test = () => {
  return (
    <div>
      <Link to={ROUTES.HOME} className='bg-blue-900 text-white p-5' >To home page </Link>
    </div>
  )
}

export default test