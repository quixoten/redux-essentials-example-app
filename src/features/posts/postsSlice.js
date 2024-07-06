import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub as dateSub } from 'date-fns'

const emptyReactions = { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }

const initialState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    date: dateSub(new Date(), { minutes: 10 }).toISOString(),
    reactions: { ...emptyReactions },
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    date: dateSub(new Date(), { minutes: 5 }).toISOString(),
    reactions: { ...emptyReactions },
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,

  reducers: {
    postsAdded: {
      reducer: (posts, action) => {
        posts.push(action.payload)
      },
      prepare: (title, content, userId) => ({
        payload: {
          id: nanoid(),
          title,
          date: new Date().toISOString(),
          content,
          userId,
          reactions: { ...emptyReactions },
        },
      }),
    },

    postUpdated: (posts, action) => {
      const { id, title, content } = action.payload
      const post = posts.find((post) => post.id === id)

      if (!post) return

      post.title = title
      post.content = content
    },

    reactionAdded: (posts, action) => {
      const { postId, reaction } = action.payload
      const post = posts.find((post) => post.id === postId)
      if (post) {
        post.reactions[reaction]++
      }
    },
  },

  selectors: {
    selectAllPosts: (posts) => posts,
    selectPostById: (posts, id) => posts.find((post) => post.id === id),
  },
})

export const postsActions = postsSlice.actions
export const postsReducer = postsSlice.reducer
export const postsSelectors = postsSlice.selectors
