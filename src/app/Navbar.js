import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  notificationsActions,
  notificationsSelectors,
} from '../features/notifications/notificationsSlice'

export const Navbar = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(notificationsSelectors.selectAllNotifications)
  const numUnreadNotifications = notifications.filter((n) => !n.read).length

  const unreadNotificationsBadge =
    numUnreadNotifications > 0 ? <span className="badge">{numUnreadNotifications}</span> : ''

  const fetchNewNotifications = () => {
    dispatch(notificationsActions.fetchNotifications())
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">Notifications {unreadNotificationsBadge}</Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
