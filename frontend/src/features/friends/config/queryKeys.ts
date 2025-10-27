export const queryKeys = {
  active: (id: string = '') => ['friends', 'active', id],
  myActive: ['friends', 'active'],
  sent: ['friends', 'sent'],
  received: ['friends', 'request'],
} as const
