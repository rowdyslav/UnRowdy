import AuthorInfo from "@/share/components/AuthorInfo.tsx";
import OpenChatButton from "@/share/components/OpenChatButton.tsx";
import type {ServiceType} from "@/share/api/service/serviceType.ts";

const Service = ({image_b64, name, description, price, category, user}: ServiceType) => (

  <div className="flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 h-full">
    <div
      className="bg-white items-center justify-center w-full p-6 flex flex-col gap-y-8 h-full"
    >
      <div className="overflow-hidden">
        <img
          src={`data:${image_b64}`}
          alt="Изображение услуги"
          className="h-64 w-80 rounded-xl"
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

      <OpenChatButton username={user.username} message={name}/>
    </div>
  </div>
);

export default Service;