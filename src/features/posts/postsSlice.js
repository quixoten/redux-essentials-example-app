import { createAppSlice } from '../../app/createAppSlice'
import { client } from '../../api/client'
import { createEntityAdapter } from '@reduxjs/toolkit'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const postsAdapterSelectors = postsAdapter.getSelectors()

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

const postsSlice = createAppSlice({
  name: 'posts',
  initialState,

  reducers: (create) => ({
    postUpdated: create.reducer((slice, action) => {
      const { id, title, content } = action.payload
      const post = slice.entities[id]

      if (!post) return

      post.title = title
      post.content = content
    }),

    reactionAdded: create.reducer((slice, action) => {
      const { postId, reaction } = action.payload
      const post = slice.entities[postId]
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
        fulfilled: postsAdapter.addOne,
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
          postsAdapter.setAll(slice, action.payload.data)
        },
        rejected: (slice) => {
          slice.status = 'failed'
          slice.error = action.error.message
        },
      },
    ),
  }),

  selectors: {
    selectAllPosts: postsAdapterSelectors.selectAll,
    selectError: (slice) => slice.error,
    selectPostById: postsAdapterSelectors.selectById,
    selectPostIds: (slice) => slice.ids,
    selectPostIds: postsAdapterSelectors.selectIds,
    selectPostsByUserId: (slice, userId) => slice.entities.filter((post) => post.user === userId),
    selectStatus: (slice) => slice.status,
  },
})

export const postsActions = postsSlice.actions
export const postsReducer = postsSlice.reducer
export const postsSelectors = postsSlice.selectors
