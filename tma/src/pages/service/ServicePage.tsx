import Flicking from "@egjs/react-flicking";
import {useService} from "@/entities/service/api/useServices.ts";
import Service from "@/entities/service/ui/Service.tsx";
import {useAppContext} from "@/app/providers/useAppContext.ts";
import StateMessage from "@/shared/components/StateMessage.tsx";

const ServicePage = () => {
  const {selectedCategoryName, searchQuery} = useAppContext();
  const {services, isLoading, error} = useService({
    categoryName: selectedCategoryName,
    keywords: searchQuery,
  });

  if (isLoading) {
    return (
      <StateMessage
        title="РџРѕРґР±РёСЂР°РµРј СЃРїРµС†РёР°Р»РёСЃС‚РѕРІ"
        description="РС‰РµРј РїРѕРґС…РѕРґСЏС‰РёРµ СѓСЃР»СѓРіРё РїРѕ РІС‹Р±СЂР°РЅРЅРѕР№ РєР°С‚РµРіРѕСЂРёРё."
      />
    );
  }

  if (error) {
    return (
      <StateMessage
        title="РќРµ СѓРґР°Р»РѕСЃСЊ Р·Р°РіСЂСѓР·РёС‚СЊ СѓСЃР»СѓРіРё"
        description="РџРѕРїСЂРѕР±СѓР№С‚Рµ РёР·РјРµРЅРёС‚СЊ Р·Р°РїСЂРѕСЃ РёР»Рё РїРѕРІС‚РѕСЂРЅРѕ РѕС‚РєСЂС‹С‚СЊ СЌРєСЂР°РЅ."
      />
    );
  }

  if (services.length === 0) {
    return (
      <StateMessage
        title="РќРёС‡РµРіРѕ РЅРµ РЅР°Р№РґРµРЅРѕ"
        description="РР·РјРµРЅРёС‚Рµ РїРѕРёСЃРєРѕРІС‹Р№ Р·Р°РїСЂРѕСЃ РёР»Рё РІС‹Р±РµСЂРёС‚Рµ РґСЂСѓРіСѓСЋ РїРѕРґРєР°С‚РµРіРѕСЂРёСЋ."
      />
    );
  }

  return (
    <div className="w-full h-[100vh] overflow-hidden select-none">
      <Flicking
        align="center"
        circular={true}
        horizontal={false}
        renderOnlyVisible={true}
        defaultIndex={0}
        duration={300}
        inputType={["touch", "mouse"]}
        threshold={70}
        bounce={10}
        bound={true}
        preventClickOnDrag={true}
        disableOnInit={false}
        className="h-full w-full"
        panelsPerView={1}
        preventDefaultOnDrag={false}
        interruptable={true}
        moveType={["strict", {count: 1}]}
      >
        {services.map((card) => (
          <div key={card.id} className="w-full h-full">
            <Service {...card}/>
          </div>
        ))}
      </Flicking>
    </div>
  );
};

export default ServicePage;

