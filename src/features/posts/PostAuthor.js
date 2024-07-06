import React from 'react'
import { useSelector } from 'react-redux'

import { usersSelctors } from '../users/usersSlice'

export const PostAuthor = ({ userId }) => {
  const author = useSelector((state) => usersSelctors.selectUserById(state, userId))

  return <span>by {author ? author.name : 'Unknown author'}</span>
}
