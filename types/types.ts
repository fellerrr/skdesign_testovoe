export interface DataType {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  address?: {
    streetAddress: string
    city: string
    state: string
    zip: string
  }
  description?: string
}

export interface DataState {
  data: DataType[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

export function isDataType(value: any): value is DataType {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'firstName' in value &&
    'lastName' in value &&
    'email' in value &&
    'phone' in value
  );
}