import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatDistanceToNow, parseISO } from 'date-fns'

import { usersSelctors } from '../users/usersSlice'

import { notificationsActions, notificationsSelectors } from './notificationsSlice'
import classNames from 'classnames'

export const NotificationsList = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(notificationsSelectors.selectAllNotifications)
  const users = useSelector(usersSelctors.selectAllUsers)

  React.useLayoutEffect(() => {
    dispatch(notificationsActions.allNotificationsRead())
  })

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknown User',
    }

    const notificationClassName = classNames('notification', {
      new: notification.isNew,
    })

    return (
      <div key={notification.id} className={notificationClassName}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}
