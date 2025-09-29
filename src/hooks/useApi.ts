import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
})

// API Types
interface DateDetails {
  date: string
  dayOfWeek: string
}

interface TopGainerLoser {
  topGainers: { symbol: string; percentage: number }[];
  topLosers: { symbol: string; percentage: number }[];
}

interface VolumeRatio {
  symbol: string;
  difference: string;
}

// API Functions
const getCurrentDate = async (): Promise<DateDetails> => {
  const response = await api.get('/date/details')
  return response.data
}

const getLastDownloadDate = async (): Promise<string | null> => {
  const response = await api.get('/nse/last-date')
  return response.data
}

const downloadCSVs = async (dates: string[]): Promise<string[]> => {
  const response = await api.post('/nse/download', { dates })
  return response.data
}

const getTopGainerLoser = async (date?: string): Promise<TopGainerLoser> => {
  const response = await api.get(`/performance/top-gainers-losers${date ? `?date=${date}` : ''}`)
  return response.data
}

const getVolumeRatio = async (dates: string[]): Promise<VolumeRatio[]> => {
  const response = await api.post(`/volume/differences`, { dates })
  return response.data
}

// Custom Hooks
export const useCurrentDate = () => {
  return useQuery({
    queryKey: ['currentDate'],
    queryFn: getCurrentDate,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useLastDownloadDate = () => {
  return useQuery({
    queryKey: ['lastDownloadDate'],
    queryFn: getLastDownloadDate,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

export const useDownloadCSVs = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: downloadCSVs,
    onSuccess: () => {
      // Invalidate and refetch last download date
      queryClient.invalidateQueries({ queryKey: ['lastDownloadDate'] })
    },
  })
}

export const useTopGainerLoser = (date?: string) => {
  return useQuery({
    queryKey: ['topGainerLoser', date],
    queryFn: () => getTopGainerLoser(date),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useVolumeRatio = () => {
  return useMutation({
    mutationFn: getVolumeRatio,
  })
}