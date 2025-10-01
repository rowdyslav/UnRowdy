import {useNavigate} from "react-router-dom";
import type {
  BadgeButtonProps
} from "@/shared/components/badgeButton/badgeButtonProps.ts";

const CreateServiceBadge = ({size = 'sm', label, to}: BadgeButtonProps) => {
  const navigate = useNavigate()

  const widthClasses = {
    sm: "hover:w-18",
    md: "hover:w-24",
    lg: "hover:w-28"
  };

  const handleClick = () => {
    if (typeof to === 'string') {
      navigate(to)
    } else if (to === -1) {
      navigate(-1)
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`group relative h-6 w-6 mb-[1px] rounded-full bg-blue-500 center cursor-pointer transition-all duration-300 ${widthClasses[size]} overflow-hidden`}
    >
      <span
        style={{fontSize: '20px'}}
        className="material-symbols-outlined text-white absolute transition-opacity duration-300 group-hover:opacity-0 "
      >
        {typeof to === 'number' ? 'arrow_back' : 'add'}
      </span>

      <span
        className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        {label}
      </span>
    </button>
  );
};

export default CreateServiceBadge;