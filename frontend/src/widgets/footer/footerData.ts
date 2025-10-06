type colDataType = {
  label: string
  href: string
}

export type footerDataType = {
  label: string
  hrefs: colDataType[]
}

export const footerCol1Data: colDataType[] = [
  {
    label: 'Как нанять',
    href: '/',
  },
  {
    label: 'Рынок талантов',
    href: '/',
  },
  {
    label: 'Ссылка',
    href: '/',
  },
  {
    label: 'Ссылка',
    href: '/',
  },
]

export const footerCol2Data: colDataType[] = [
  {
    label: 'Как найти работу',
    href: '/',
  },
  {
    label: 'Создать профиль',
    href: '/',
  },
  {
    label: 'ссылка',
    href: '/',
  },
  {
    label: 'ссылка',
    href: '/',
  },
]

export const footerCol3Data: colDataType[] = [
  {
    label: 'Как найти работу',
    href: '/',
  },
  {
    label: 'Создать профиль',
    href: '/',
  },
  {
    label: 'ссылка',
    href: '/',
  },
  {
    label: 'ссылка',
    href: '/',
  },
]

export const footerData: footerDataType[] = [
  {
    label: 'Для клиентов',
    hrefs: footerCol1Data,
  },
  {
    label: 'Для фрилансеров',
    hrefs: footerCol2Data,
  },
  {
    label: 'Компания',
    hrefs: footerCol3Data,
  },
]
