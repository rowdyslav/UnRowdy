import type {ServiceProps} from '@/features/service/types/serviceProps.ts'

const Service = ({name, image_b64, description}: ServiceProps) => {
  return (
    <article className='w-full card-element'>
      <img src={`data:${image_b64}`} alt='/' className='rounded-t-lg w-full'/>

      <div className='px-6 py-3 flex justify-between flex-col'>
        <h3 className='text-2xl font-bold color-font mb-4'>{name}</h3>

        <h3 className='text-2xl font-bold color-font'>Описание услуги</h3>

        {description
          ? <p className='color-font-light text-xl mt-1'>{description}</p>
          : <p className='color-font-light text-xl mt-1 italic'>На данный момент описание отсутствует</p>
        }
      </div>
    </article>
  )
}

export default Service
