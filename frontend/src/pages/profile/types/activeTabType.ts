export type TabNames = 'Friends' | 'Services' |  'Other'

export interface ActiveTabType  {
  id: number;
  isActive: TabNames
}