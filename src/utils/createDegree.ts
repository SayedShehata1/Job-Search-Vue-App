import type { Degree } from '@/api/types'
import { ref } from 'vue'

export const createDegree = (degree: Partial<Degree> = {}): Degree => ({
  id: 1,
  degree: 'BSc',
  ...degree
})
