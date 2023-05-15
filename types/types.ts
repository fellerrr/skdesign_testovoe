export interface DataType {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  address: {
    streetAddress: string
    city: string
    state: string
    zip: string
  }
  description: string
}

export interface DataState {
  data: DataType[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}