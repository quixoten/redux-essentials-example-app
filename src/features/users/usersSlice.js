import { createEntityAdapter } from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { createAppSlice } from '../../app/createAppSlice'

const usersAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})
const initialState = usersAdapter.getInitialState()
const basicSelectors = usersAdapter.getSelectors()

const usersSlice = createAppSlice({
  name: 'users',
  initialState,
  reducers: (create) => ({
    fetchUsers: create.asyncThunk(
      async () => {
        const response = await client.get('/fakeApi/users')
        return response
      },
      {
        fulfilled: (slice, action) => usersAdapter.setAll(slice, action.payload.data),
      },
    ),
  }),
  selectors: {
    selectAllUsers: basicSelectors.selectAll,
    selectUserById: basicSelectors.selectById,
  },
})

export const usersActions = usersSlice.actions
export const usersReducer = usersSlice.reducer
export const usersSelctors = usersSlice.selectors
