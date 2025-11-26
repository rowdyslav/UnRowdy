import AuthorInfo from "@/share/components/AuthorInfo.tsx";
import OpenChatButton from "@/share/components/OpenChatButton.tsx";
import type {ServiceType} from "@/share/api/service/serviceType.ts";

const Service = ({image_b64, name, description, price, category, user}: ServiceType) => (

  <div className="flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 h-[100vh]">
    <div
      className="bg-white shadow-xl rounded-2xl w-full max-w-xl p-6 flex flex-col gap-y-8"
    >
      <div className="overflow-hidden rounded-xl shadow-sm">
        <img
          src={`data:${image_b64}`}
          alt="Изображение услуги"
          className=" h-64 object-cover"
        />
      </div>

      <div className="text-center flex flex-col items-center gap-y-3 px-2">
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full shadow-sm">
          {category.name}
        </span>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900">{name}</h2>

        <p className="text-lg text-slate-600 max-w-md">{description}</p>

        <AuthorInfo author={user.username}/>

        <div className="text-3xl font-extrabold text-blue-600 mt-2">{price}₽</div>
      </div>

      <OpenChatButton username={user.email}/>
    </div>
  </div>
);

export default Service;