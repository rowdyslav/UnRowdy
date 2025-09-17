import {footerCol1Data} from "@/shared/const/footerData.ts";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className='max-w-[var(--max-width-container-big)] mx-auto px-[15px] py-[65px] flex justify-around'
    >
      <div>
        <h2 className='text-[27px] font-bold color-font mb-4'>
          unRowdy
        </h2>
        <p className="color-font-light">Минималистичная фриланс платформа <br/>для талантливых людей и больших проектов </p>
      </div>

      <div>
        <p>Для клиентов</p>
        <ul className='font-semibold color-font'>
          {footerCol1Data.map((item, index) =>(
            <li key={index} className='color-font-light duration-200 font-normal hover:text-blue-500'><Link to={item.href}>{item.label}</Link></li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;