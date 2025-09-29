import {useNavigate} from "react-router-dom";
import type {
  BackPageBadgeProps
} from "@/shared/components/backPageBadge/BackPageBadgeProps.ts";

const BackPageBadge = ({size = 'sm', label}: BackPageBadgeProps) => {
  const navigate = useNavigate()

  const widthClasses = {
    sm: "hover:w-20",
    md: "hover:w-28",
    lg: "hover:w-32"
  };

  return (
    <button
      className={`group relative h-6 w-6 rounded-full bg-blue-500 center cursor-pointer transition-all duration-300 ${widthClasses[size]} overflow-hidden`}
      onClick={() => navigate(-1)}
    >
      <span
        style={{fontSize: '20px'}}
        className="material-symbols-outlined text-white absolute transition-opacity duration-300 group-hover:opacity-0 "
      >
        arrow_back
      </span>

      <span
        className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        {label}
      </span>
    </button>
  );
};

export default BackPageBadge;