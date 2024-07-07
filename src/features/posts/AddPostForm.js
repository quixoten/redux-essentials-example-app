import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { postsActions } from './postsSlice'
import { usersSelctors } from '../users/usersSlice'

export const AddPostForm = () => {
  const titleRef = React.useRef(null)
  const contentRef = React.useRef(null)
  const authorRef = React.useRef(null)
  const [requestStatus, setRequestStatus] = React.useState('idle')

  const dispatch = useDispatch()

  const users = useSelector(usersSelctors.selectAllUsers)

  const onSavePostsClicked = async () => {
    if (!titleRef.current.value) return
    if (!contentRef.current.value) return
    if (!authorRef.current.value) return
    if (requestStatus !== 'idle') return

    setRequestStatus('pending')

    await dispatch(
      postsActions.addNewPost({
        title: `${titleRef.current.value}`,
        content: `${contentRef.current.value}`,
        user: `${authorRef.current.value}`,
      }),
    )
      .then(
        () => {
          // titleRef.current.value = ''
          // contentRef.current.value = ''
          // authorRef.current.value = ''
        },
        (err) => {
          console.error('Failed to save the post: ', err)
        },
      )
      .finally(() => {
        setRequestStatus('idle')
      })
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input ref={titleRef} type="text" id="postTitle" name="postTitle" />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" ref={authorRef}>
          <option value=""></option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea ref={contentRef} id="postContent" name="postContent" />
        <button type="button" onClick={onSavePostsClicked}>
          Save Post
        </button>
      </form>
    </section>
  )
}
