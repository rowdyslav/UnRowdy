import type { ImageInputProps } from '@/shared/components/imageInput/ImageInputProps.ts'
import Cropper from 'react-easy-crop'
import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { getCroppedImg } from '@/shared/utils/getCroppedImg.ts'

const ImageInput = ({ register, error }: ImageInputProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    height: number
    width: number
    x: number
    y: number
  } | null>(null)

  const methods = useFormContext()
  const setValue = methods?.setValue

  const onCropComplete = useCallback((_: unknown, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  // Автоматически сохраняем когда есть и изображение и область обрезки
  useEffect(() => {
    const autoSave = async () => {
      if (imageSrc && croppedAreaPixels && setValue) {
        try {
          const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
          setValue('image', croppedImage, {
            shouldValidate: true,
            shouldDirty: true,
          })
        } catch (error) {
          console.error('Error auto-saving cropped image:', error)
        }
      }
    }

    autoSave()
  }, [imageSrc, croppedAreaPixels, setValue])

  const { ref, onChange, ...rest } = register('image')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Вызываем оригинальный onChange
    try {
      onChange(e)
    } catch {
      /* empty */
    }

    // Создаем превью
    const reader = new FileReader()
    reader.onload = () => setImageSrc(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <>
      {imageSrc && (
        <div className='mx-auto relative w-4/5 h-[400px] bg-gray-200 mt-4'>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={16 / 9}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}

      {!imageSrc && (
        <label className='add-img-input cursor-pointer'>
          <img src='/icons/fileSave.svg' alt='' width={70} />
          <div className='px-4 py-2 color-font-light text-xl font-medium'>
            <span className='text-blue-500'>Загрузите файл</span> или перетащите его сюда
          </div>
          <input type='file' accept='image/*' className='hidden' ref={ref} {...rest} onChange={handleFileChange} />
        </label>
      )}

      {imageSrc && (
        <div className='flex justify-center mt-2 gap-3'>
          <label className='button-blue py-2 px-4 cursor-pointer'>
            Изменить изображение
            <input type='file' accept='image/*' className='hidden' onChange={handleFileChange} />
          </label>
        </div>
      )}

      <p className='text-center text-red-400'>{error?.message}</p>
    </>
  )
}

export default ImageInput
