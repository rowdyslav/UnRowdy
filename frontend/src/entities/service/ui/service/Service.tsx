import type {ServiceProps} from '@/entities/service/ui/service/serviceProps.ts'

const Service = ({name, image_b64, description, category}: ServiceProps) => {
  return (
    <article className='w-full card-element'>
      <img src={`data:${image_b64}`} alt='/' className='rounded-t-lg w-full'/>

      <div className='px-6 py-3 flex justify-between flex-col'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-4xl font-bold color-font'>{name}</h3>

          <p className='text-sm border border-gray-200 w-fit mt-2 py-0.5 px-1.5 rounded-lg font-medium '>
            {category.name}
          </p>
        </div>
        <h3 className='text-3xl font-bold color-font'>Описание услуги</h3>

        <p className={`color-font-light text-xl ${description ? '' : 'italic'}`}>
          {description ? description : 'На данный момент описание отсутствует'}
        </p>
      </div>
    </article>
  )
}

export default Service
