import AuthorInfo from "@/share/components/AuthorInfo.tsx";
import type {ServiceCardProps} from "@/entities/service/types/serviceCardProps.ts";
import OpenChatButton from "@/share/components/OpenChatButton.tsx";

const Service = ({card}: { card: ServiceCardProps }) => (
  <div className="flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 h-[100vh]">
    <div
      className="bg-white shadow-xl rounded-2xl w-full max-w-xl p-6 flex flex-col gap-y-8"
    >
      <div className="overflow-hidden rounded-xl shadow-sm">
        <img
          src={`data:${card.image_b64}`}
          alt="Изображение услуги"
          className=" h-64 object-cover"
        />
      </div>

      <div className="text-center flex flex-col items-center gap-y-3 px-2">
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full shadow-sm">
          {card.category}
        </span>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900">{card.name}</h2>

        <p className="text-lg text-slate-600 max-w-md">{card.description}</p>

        <AuthorInfo author={card.author_name}/>

        <div className="text-3xl font-extrabold text-blue-600 mt-2">{card.price}</div>
      </div>

        <OpenChatButton username={card.author_name}/>
    </div>
  </div>
);

export default Service;