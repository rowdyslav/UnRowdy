import {Link} from "react-router-dom";
import type {
  BadgeButtonProps
} from "@/shared/components/badgeButton/badgeButtonProps.ts";

const CreateServiceBadge = ({size = 'sm', label, to}: BadgeButtonProps) => {
  const widthClasses = {
    sm: "hover:w-24",
    md: "hover:w-32",
    lg: "hover:w-42"
  };

  return (
    <Link
      to={to}
      className={`group relative h-6 w-6 rounded-full bg-blue-500 center cursor-pointer transition-all duration-300 ${widthClasses[size]} overflow-hidden`}
    >
      <span
        style={{fontSize: '20px'}}
        className="material-symbols-outlined text-white absolute transition-opacity duration-300 group-hover:opacity-0 "
      >
        add
      </span>

      <span
        className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        {label}
      </span>
    </Link>
  );
};

export default CreateServiceBadge;