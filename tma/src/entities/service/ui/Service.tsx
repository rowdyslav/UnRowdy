import OpenChatButton from "@/share/components/OpenChatButton.tsx";
import type {ServiceType} from "@/share/api/service/serviceType.ts";

const Service = ({ name, description, price, category, user}: ServiceType) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex justify-center">
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-8 mx-auto">

      {/* ИЗОБРАЖЕНИЕ */}
      <div className="w-full overflow-hidden rounded-2xl shadow-md">
        <img
          // src={`data:${image_b64}`}
          src='/src/share/assets/coding.webp'
          alt="Изображение услуги"
          className="w-full max-h-72 object-cover"
        />
      </div>

      {/* ТЕКСТОВЫЙ КОНТЕНТ */}
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

        {/* БЛОК С ВЛАДЕЛЬЦЕМ */}
        <div className="flex items-center gap-4 mt-2">
          <div className="w-20 h-20 rounded-full border-2 border-blue-200 shadow-md overflow-hidden bg-white">
            {user.image_b64 ? (
              <img
                src={`data:${user.image_b64}`}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl text-blue-600">
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
