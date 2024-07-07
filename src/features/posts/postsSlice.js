import { nanoid } from '@reduxjs/toolkit'
import { createAppSlice } from '../../app/createAppSlice'
import { client } from '../../api/client'

const emptyReactions = { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

const postsSlice = createAppSlice({
  name: 'posts',
  initialState,

  reducers: (create) => ({
    postUpdated: create.reducer((slice, action) => {
      const { id, title, content } = action.payload
      const post = slice.posts.find((post) => post.id === id)

      if (!post) return

      post.title = title
      post.content = content
    }),

    reactionAdded: create.reducer((slice, action) => {
      const { postId, reaction } = action.payload
      const post = slice.posts.find((post) => post.id === postId)
      if (post) {
        post.reactions[reaction]++
      }
    }),

    addNewPost: create.asyncThunk(
      async (initialPost) => {
        const response = await client.post('/fakeApi/posts', initialPost)
        return response.data
      },
      {
        fulfilled: (slice, action) => {
          slice.posts.push(action.payload)
        },
      },
    ),

    fetchPosts: create.asyncThunk(
      async () => {
        const response = await client.get('/fakeApi/posts')
        return response
      },
      {
        pending: (slice) => {
          slice.status = 'loading'
        },
        fulfilled: (slice, action) => {
          slice.status = 'succeeded'
          slice.posts = action.payload.data
        },
        rejected: (slice) => {
          slice.status = 'failed'
          slice.error = action.error.message
        },
      },
    ),
  }),

  selectors: {
    selectAllPosts: (slice) => slice.posts,
    selectPostById: (slice, id) => slice.posts.find((post) => post.id === id),
    selectStatus: (slice) => slice.status,
    selectError: (slice) => slice.error,
  },
})

export const postsActions = postsSlice.actions
export const postsReducer = postsSlice.reducer
export const postsSelectors = postsSlice.selectors
