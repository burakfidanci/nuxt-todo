import { useNuxtApp } from '#app'

export const useAxios = () => {
  const { $axios } = useNuxtApp()
  return $axios
}