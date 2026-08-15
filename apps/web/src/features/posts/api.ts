import { apiSlice } from '@/store/apiSlice';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type CreatePostRequest = Omit<Post, 'id'>;
export type UpdatePostRequest = Partial<Omit<Post, 'id'>> & { id: number };

// ---------------------------------------------------------------------------
// Endpoints
// Keep endpoints co-located with the feature — never in the root apiSlice.
// ---------------------------------------------------------------------------

export const postsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    /**
     * GET /posts
     * Fetches a paginated list of posts.
     * Results are cached and tagged so mutations can invalidate them.
     */
    getPosts: build.query<Post[], { userId?: number } | void>({
      query: (filters) => ({
        url: '/posts',
        method: 'GET',
        params: filters ? { userId: filters.userId } : undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post', id: 'LIST' },
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),

    /**
     * GET /posts/:id
     * Fetches a single post by ID.
     */
    getPost: build.query<Post, number>({
      query: (id) => ({ url: `/posts/${id}`, method: 'GET' }),
      providesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),

    /**
     * POST /posts
     * Creates a new post. Invalidates the list cache so it refetches.
     */
    createPost: build.mutation<Post, CreatePostRequest>({
      query: (body) => ({ url: '/posts', method: 'POST', body }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    /**
     * PUT /posts/:id
     * Full replacement update. Invalidates the specific post and the list.
     */
    updatePost: build.mutation<Post, UpdatePostRequest>({
      query: ({ id, ...body }) => ({ url: `/posts/${id}`, method: 'PUT', body }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Post', id },
        { type: 'Post', id: 'LIST' },
      ],
    }),

    /**
     * PATCH /posts/:id
     * Partial update. Use when only updating a subset of fields.
     */
    patchPost: build.mutation<Post, UpdatePostRequest>({
      query: ({ id, ...body }) => ({ url: `/posts/${id}`, method: 'PATCH', body }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Post', id }],
    }),

    /**
     * DELETE /posts/:id
     * Deletes a post. Invalidates the list cache.
     */
    deletePost: build.mutation<void, number>({
      query: (id) => ({ url: `/posts/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Post', id },
        { type: 'Post', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  usePatchPostMutation,
  useDeletePostMutation,
} = postsApi;
