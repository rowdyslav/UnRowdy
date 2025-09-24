import type {ServiceType} from "@/shared/types/serviceType.ts";

const ServiceCard = ({name, price}: ServiceType) => {
  return (
    <article className="max-w-xl w-full p-6 card-element">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-semibold color-font">
            {name}
          </h3>
          <p className="text-sm color-font-light mt-1">
            Создание серверов для майнкрафта
          </p>
        </div>
        {/*<span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">*/}
        {/*  Development*/}
        {/*</span>*/}
      </div>

      {/*/!* Rating *!/*/}
      {/*<div className="flex items-center gap-1 mt-4">*/}
      {/*  <span className="text-yellow-400 text-lg">★</span>*/}
      {/*  <span className="text-sm font-medium text-gray-800">4.9</span>*/}
      {/*  <span className="text-sm text-gray-500">· 47 projects completed</span>*/}
      {/*</div>*/}

      {/* Price & Delivery */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold color-font">₽{price}</span>
        {/*<span className="text-sm text-gray-500">Delivery: 2-4 weeks</span>*/}
      </div>

      {/*/!* What's Included *!/*/}
      {/*<div className="mt-6">*/}
      {/*  <h3 className="text-sm font-semibold text-gray-700 mb-2">What's included:</h3>*/}
      {/*  <div className="flex flex-wrap gap-2">*/}
      {/*    {["React & TypeScript", "Node.js Backend", "Database Design", "API Integration", "Responsive Design"].map((item) => (*/}
      {/*      <span*/}
      {/*        key={item}*/}
      {/*        className="px-3 py-1 text-xs bg-blue-50 text-blue-600 font-medium rounded-full"*/}
      {/*      >*/}
      {/*        {item}*/}
      {/*      </span>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/* Buttons */}
      <div className="flex justify-end mt-6">
        <button className="w-1/2 px-4 py-2 color-font-light rounded-lg border border-primary hover:bg-gray-50 transition">
          Редактировать сервис
        </button>
        {/*<button className="w-1/2 ml-2 px-4 py-2 text-sm bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition">*/}
        {/*  View Analytics*/}
        {/*</button>*/}
      </div>
    </article>
  )
};

export default ServiceCard;