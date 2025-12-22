import OpenChatButton from "@/share/components/OpenChatButton.tsx";
import type {ServiceType} from "@/share/api/service/serviceType.ts";

const Service = ({ name, description, price, category, user}: ServiceType) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex justify-center">
    <div className="w-full max-w-4xl rounded-2xl p-8 flex flex-col gap-6 mx-auto">

      {/* ИЗОБРАЖЕНИЕ */}
      <div className="w-full overflow-hidden rounded-2xl shadow-md max-h-1/3">
        <img
          // src={`data:${image_b64}`}
          src='/src/share/assets/coding.webp'
          alt="Изображение услуги"
          className="
          w-full h-full object-cover rounded-2xl shadow-xl
          transition-transform duration-300
          hover:scale-[1.005]"
        />
      </div>

      {/* ТЕКСТ */}
      <div className="flex flex-col items-center text-center gap-3">
        <span className="p-4 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
          {category.name}
        </span>

        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
          {name}
        </h1>

        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
          {description}
        </p>

        {/*ВЛАДЕЛЕЦ */}
        <div className="flex items-center gap-4 mt-2">
          <div className="w-18 h-18 rounded-full border-2 border-blue-200 shadow-md
          overflow-hidden bg-white ">
            {user.image_b64 ? (
              <img
                src={`data:${user.image_b64}`}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full text-4xl text-blue-600 flex items-center justify-center">
                {user.username[0]?.toUpperCase() || "👤"}
              </div>
            )}
          </div>

          <div className="text-left">
            <p className="font-bold text-lg text-slate-800">{user.username}</p>
            <p className="text-sm text-slate-500">Автор услуги</p>
          </div>
        </div>

        {/* ЦЕНА */}
        <div className="text-4xl font-extrabold text-blue-600 mt-2">
          {price}₽
        </div>
      </div>

      {/* КНОПКА */}
      <div className="flex justify-center">
        <OpenChatButton username={user.email} message={name}/>
      </div>
    </div>
  </div>
);

export default Service;
