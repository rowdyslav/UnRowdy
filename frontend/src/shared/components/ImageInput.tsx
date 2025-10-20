import Cropper from 'react-easy-crop'
import * as React from 'react'
import { useCallback, useRef, useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { getCroppedImg } from '@/shared/utils/getCroppedImg.ts'
import { fileToBase64 } from '@/shared/utils/fileToBase64.ts'

const ImageInput = ({ name }: { name: string }) => {
  const { control } = useFormContext()
  const { field } = useController({ name, control })
  const inputRef = useRef<HTMLInputElement>(null)

  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    height: number
    width: number
    x: number
    y: number
  } | null>(null)

  const onCropComplete = useCallback(
    (_: unknown, area: { height: number; width: number; x: number; y: number } | null) => {
      setCroppedAreaPixels(area)
    },
    [],
  )

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const base64 = await fileToBase64(file)
      setImageSrc(base64)
      field.onChange(base64)
    } catch (error) {
      console.error('Error converting file:', error)
    }
  }

  const handleSaveCropped = async () => {
    if (imageSrc && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
      field.onChange(croppedImage)
    }
  }

  return (
    <>
      {imageSrc && (
        <>
          <div className='mx-auto relative w-4/5 h-96 bg-gray-200 mt-4'>
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

          <div className='flex justify-center mt-3 gap-3'>
            <label className='button'>
              Изменить
              <input type='file' accept='image/*' className='hidden' onChange={handleFileChange} />
            </label>

            <button type='button' className='button-blue' onClick={handleSaveCropped}>
              Сохранить обрезку
            </button>
          </div>
        </>
      )}

      {!imageSrc && (
        <label className='add-img-input cursor-pointer'>
          <img src='/icons/fileSave.svg' alt='' width={70} />
          <div className='px-4 py-2 color-font-light text-xl font-medium'>
            <span className='text-blue-500'>Загрузите файл</span> или перетащите его сюда
          </div>
          <input
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleFileChange}
            ref={inputRef}
          />
        </label>
      )}
    </>
  )
}

export default ImageInput
