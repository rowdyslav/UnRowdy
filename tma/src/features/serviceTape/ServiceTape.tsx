import SwipeHint from '@/share/components/SwipeHint.tsx';
import SERVICE_DATA from '@/share/testServiceData.ts';
import Flicking from '@egjs/react-flicking';
import {useState} from 'react';
import Service from "@/entities/service/ui/Service.tsx";

const ServiceTape = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const handleChange = () => setCurrentIndex(e => e + 1);

  return (
    <div className="w-full h-[100vh] overflow-hidden select-none">
      <Flicking
        align="center"
        circular={true}
        horizontal={false}
        onChanged={handleChange}
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
        {SERVICE_DATA.map((card) => (
          <div key={card.id} className="w-full h-full">
            <Service card={card}/>
          </div>
        ))}
      </Flicking>

      <SwipeHint show={currentIndex === 0}/>
    </div>
  );
};

export default ServiceTape;