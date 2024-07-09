import React from 'react'
import { useSelector } from 'react-redux'
import { postsSelectors } from './postsSlice'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { useGetPostQuery } from '../api/apiSlice'
import { Spinner } from '../../components/Spinner'

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  // const post = useSelector((state) => postsSelectors.selectPostById(state, postId))
  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId)

  if (isFetching) {
    return (
      <section>
        <Spinner text="Loading..." />
      </section>
    )
  }

  if (isSuccess) {
    return (
      <section>
        <article className="post">
          <h2>{post.title}</h2>
          <div>
            <PostAuthor userId={post.user} />
            <TimeAgo timestamp={post.date} />
          </div>
          <p className="post-content">{post.content}</p>
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        </article>
      </section>
    )
  }

  return (
    <section>
      <h2>Post not found!</h2>
    </section>
  )
}
