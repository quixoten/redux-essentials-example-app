import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { postsActions, postsSelectors } from './postsSlice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButton'
import { Spinner } from '../../components/Spinner'
import { useGetPostsQuery } from '../api/apiSlice'

const Wrapper = ({ children }) => {
  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {children}
    </section>
  )
}

const PostExcerpt = React.memo(({ post }) => {
  return (
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
  )
})

export const PostsList = () => {
  const { data: posts = [], isSuccess, isError, error } = useGetPostsQuery()
  const sortedPosts = React.useMemo(() => {
    const sortedPosts = posts.slice()
    // Sort posts in descending chronological order
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
    return sortedPosts
  }, [posts])

  if (isError) {
    return (
      <Wrapper>
        <div>{error}</div>
      </Wrapper>
    )
  }

  if (!isSuccess) {
    return (
      <Wrapper>
        <Spinner text="Loading..." />
      </Wrapper>
    )
  }

  const renderedPosts = sortedPosts.map((post) => <PostExcerpt key={post.id} post={post} />)

  return <Wrapper>{renderedPosts}</Wrapper>
}
