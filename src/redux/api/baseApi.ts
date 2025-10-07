import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { tagTypesList } from '../tag-types'




export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl:process.env.NEXT_PUBLIC_API_URL}),
  endpoints: () => ({}),
  tagTypes:tagTypesList
})
