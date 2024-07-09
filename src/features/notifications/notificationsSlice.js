import { createAppSlice } from '../../app/createAppSlice'
import { client } from '../../api/client'
import { createEntityAdapter } from '@reduxjs/toolkit'

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const basicSelectors = notificationsAdapter.getSelectors()

const initialState = notificationsAdapter.getInitialState()

const notificationsSlice = createAppSlice({
  name: 'notifications',
  initialState,

  reducers: (create) => ({
    fetchNotifications: create.asyncThunk(
      async (_, { getState }) => {
        const allNotifications = notificationsSelectors.selectAllNotifications(getState())
        const [latestNotification] = allNotifications
        const latestTimestamp = latestNotification ? latestNotification.date : ''
        const response = await client.get(`/fakeApi/notifications?since=${latestTimestamp}`)
        return response.data
      },
      {
        fulfilled: (slice, action) => {
          notificationsAdapter.upsertMany(slice, action.payload)
          for (const notification of Object.values(slice.entities)) {
            // Any notifications we've read are no longer new
            notification.isNew = !notification.read
          }
        },
      },
    ),

    allNotificationsRead: create.reducer((slice) => {
      for (const notification of Object.values(slice.entities)) {
        notification.read = true
      }
    }),
  }),

  selectors: {
    selectAllNotifications: basicSelectors.selectAll,
  },
})

export const notificationsActions = notificationsSlice.actions
export const notificationsReducer = notificationsSlice.reducer
export const notificationsSelectors = notificationsSlice.selectors
