import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { postsActions, postsSelectors } from './postsSlice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButton'
import { Spinner } from '../../components/Spinner'

const Wrapper = ({ children }) => {
  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {children}
    </section>
  )
}

export const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(postsSelectors.selectAllPosts)
  const postsStatus = useSelector(postsSelectors.selectStatus)
  const postsError = useSelector(postsSelectors.selectError)
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  React.useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(postsActions.fetchPosts())
    }
  }, [postsStatus, dispatch])

  if (postsStatus === 'loading') {
    return (
      <Wrapper>
        <Spinner text="Loading..." />
      </Wrapper>
    )
  }

  if (postsStatus === 'failed') {
    return (
      <Wrapper>
        <div>{postsError}</div>
      </Wrapper>
    )
  }

  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ))

  return <Wrapper>{renderedPosts}</Wrapper>
}
