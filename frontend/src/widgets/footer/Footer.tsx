import {
  footerData, type footerDataType
} from "@/widgets/footer/footerData.ts";
import {Link} from "react-router-dom";
import {ROUTES} from "@/shared/const/routes.ts";

const Footer = () => {
  return (
    <footer
      className='max-w-[var(--max-width-container-big)] mx-auto px-[15px] py-[65px]'
    >
      <div className='flex justify-around border-b-gray-100 border-b pb-8'>
        <div>
          <Link className='text-[27px] font-bold color-font mb-4' to={ROUTES.HOME}>
            UnRowdy
          </Link>
          <p
            className="color-font-light"
          >Минималистичная фриланс платформа <br/>для талантливых людей и больших проектов
          </p>
        </div>

        {footerData.map((col: footerDataType, index: number) => (
          <div key={index}>
            <p className='mb-4 font-medium color-font'>{col.label}</p>
            <ul>
              {col.hrefs.map((item, index: number) => (
                <li
                  key={index}
                  className='color-font-light duration-200 font-normal hover:text-blue-500'
                ><Link to={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className='pt-8 flex justify-between '>
        <p
          className='color-font-light '
        >© 2025 unRowdy. All rights reserved.
        </p>
        <Link
          to={'/'}
          className='color-font-light duration-200 hover:text-blue-500'
        >Политика обслуживания
        </Link>
      </div>
    </footer>
  );
};

export default Footer;