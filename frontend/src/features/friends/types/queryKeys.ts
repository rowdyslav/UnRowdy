export const queryKeys = {
  active: (id: string = '') => ['friends', 'active', id] as const,
  myActive: ['friends', 'active'] as const,
  sent: ['friends', 'sent'] as const,
  request: ['friends', 'request'] as const,
}
