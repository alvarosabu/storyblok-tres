import { useStorage } from '@vueuse/core'

export interface Material {
  color: string
  roughness: number
  metalness: number
}

export const useProductConfigurator = () =>
  useStorage('product', {
    selectedBaseMaterial: {
      color: '#ffffff',
    },
    selectedAccentMaterial: {
      color: '#E73740',
    },
    selectedDetailMaterial: {
      color: '#563EE7',
    },
  })
