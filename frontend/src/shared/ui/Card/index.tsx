import * as React from "react";

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> =  ({children}) => {
  return (
    <div className='shadow-md flex flex-col p-4 items-stretch rounded-xl text-center'>
      {children}
    </div>
  );
};

export default Card;