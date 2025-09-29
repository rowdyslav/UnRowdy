import {useForm} from "react-hook-form";
import {
  ServiceFormSchema,
  type ServiceFormType
} from "@/features/service/types/ServiceForm.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAdd} from "@/features/service/lib/useAdd.ts";
import {fileToBase64} from "@/shared/utils/fileToBase64.ts";
import type {ServiceType} from "@/shared/types/serviceType.ts";

const AddForm = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<ServiceFormType>({
    resolver: zodResolver(ServiceFormSchema),
  });

  const file = watch("image");

  const {mutateAsync: addService} = useAdd()

  const onSubmit = async (data: ServiceFormType) => {
    try {
      let imageBase64 = "";
      if (data.image?.length) {
        imageBase64 = await fileToBase64(data.image[0]);
      }

      const payload: ServiceType = {
        name: data.name,
        price: data.price,
        image_b64: imageBase64,
      };

      console.log(imageBase64)

      await addService(payload)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='card-element hover:shadow-sm w-[45%] p-5'>
      <form className='grid gap-y-5 ' onSubmit={handleSubmit(onSubmit)}>

        <div className='add-service-grid'>
          <h3 className='text-xl font-bold color-font'>Название</h3>
          <div className='w-full'>
            <input {...register('name')} placeholder='Создание сайта'
                   className='input py-2'
            />
            {errors.name &&
              <p className='text-center text-red-400'>{errors.name.message}</p>}
          </div>
        </div>

        <div className='add-service-grid'>
          <h3 className='text-xl font-bold color-font w-1/2'>Стоимость</h3>
          <div>
            <input {...register('price', {valueAsNumber: true})}
                   placeholder='10000'
                   className='input py-2'
                   type="number"
                   min={0}
            />
            {errors.price && <p
              className='text-center text-red-400'
            >{errors.price.message}</p>}
          </div>
        </div>


        <div className='add-service-grid'>
          <h3 className='text-xl font-bold color-font w-1/2'>Картинка</h3>
          <div className='w-full center flex flex-col gap-y-1'>
            <label className="cursor-pointer">
              <span className="px-4 py-2 button">
               {file?.length ? file[0].name : "Загрузите изображение"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image")}
              />
            </label>
            {errors.image && <p
              className='text-center text-red-400'
            >{errors.image.message}</p>}
          </div>
        </div>

        <button
          type='submit' className='mt-5 button w-1/2 justify-self-center'
        >Создать услугу
        </button>
      </form>
    </div>
  );
};

export default AddForm;