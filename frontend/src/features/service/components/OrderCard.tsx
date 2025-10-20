const OrderCard = ({price}: { price: number }) => {
  return (
    <div className='card-element p-6 flex flex-col gap-y-3 h-fit'>
      <h4
        className='text-blue-500 text-3xl font-medium text-center'
      >{new Intl.NumberFormat('ru-RU').format(price)}₽
      </h4>

      <button className='button-blue py-2'>Заказать</button>
      <button className='button py-2'>Написать продавцу</button>
    </div>
  )
}

export default OrderCard
