import Flicking from '@egjs/react-flicking';
import {useService} from "@/entities/service/api/useServices.ts";
import Service from "@/entities/service/ui/Service.tsx";

interface TapeProps {
  idCategory: string
  nameCategory: string
}

const ServicePage = ({nameCategory}: TapeProps) => {
  const {data} = useService({category_name: nameCategory})

  return (
    <div className="w-full h-[100vh] overflow-hidden select-none">
      <Flicking
        align="center"
        circular={true}
        horizontal={false}
        renderOnlyVisible={true}
        defaultIndex={0}
        duration={300}
        inputType={['touch', 'mouse']}
        threshold={70}
        bounce={10}
        bound={true}
        preventClickOnDrag={true}
        disableOnInit={false}
        className="h-full"
        panelsPerView={1}
        preventDefaultOnDrag={false}
        interruptable={true}
        moveType={['strict', {count: 1}]}
      >
        {data && (
          data.map((card) => (
            <div key={card.id} className="w-full h-full">
              <Service {...card}/>
            </div>
          )))}
      </Flicking>
    </div>
  );
};

export default ServicePage;