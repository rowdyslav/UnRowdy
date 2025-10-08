const SellerCard = () => {
  return (
    <article className='card-element p-6 flex gap-x-4'>
      <img src='/public/icons/accCircle2.svg' alt='' height={60} width={60} />

      <div className='flex flex-col'>
        <p className='text-2xl font-bold color-font'>Roman</p>
        <p className='color-font-light text-lg'>Очень крутой разработчик</p>
      </div>
    </article>
  )
}

export default SellerCard
