import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  selectors: {
    selectAllUsers: (users) => users,
    selectUserById: (users, id) => users.find((user) => user.id === id),
  },
})

export const usersReducer = usersSlice.reducer
export const usersSelctors = usersSlice.selectors
