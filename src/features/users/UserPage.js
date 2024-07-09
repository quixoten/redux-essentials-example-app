import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { usersSelctors } from '../users/usersSlice'
import { postsSelectors } from '../posts/postsSlice'

export const UserPage = ({ match }) => {
  const { userId } = match.params

  const user = useSelector((state) => usersSelctors.selectUserById(state, userId))

  const postsForUser = useSelector((state) => postsSelectors.selectPostsByUserId(state, userId))
  console.dir(postsForUser)

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  )
}
