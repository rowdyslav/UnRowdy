import type { OrderCardProps } from '@/features/service/types/orderCardProps.ts'

const OrderCard = ({ price }: OrderCardProps) => {
  return (
    <div className='card-element p-6 flex flex-col gap-y-3 h-fit'>
      <h4 className='text-blue-500 text-3xl font-medium text-center'>{price}₽</h4>

      <button className='button-blue py-2'>Заказать</button>
      <button className='button py-2'>Написать продавцу</button>
    </div>
  )
}

export default OrderCard
