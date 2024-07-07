import { client } from '../../api/client'
import { createAppSlice } from '../../app/createAppSlice'

const initialState = []

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
        fulfilled: (_slice, action) => action.payload.data,
      },
    ),
  }),
  selectors: {
    selectAllUsers: (users) => users,
    selectUserById: (users, id) => users.find((user) => user.id === id),
  },
})

export const usersActions = usersSlice.actions
export const usersReducer = usersSlice.reducer
export const usersSelctors = usersSlice.selectors
