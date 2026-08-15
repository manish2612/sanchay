import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from '@/features/posts/api';

export const Route = createFileRoute('/dev/test-api')({
  component: TestApiPage,
});

function TestApiPage() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // ── Queries ─────────────────────────────────────────────────────────────
  // RTK Query auto-fetches on mount, caches, and deduplicates these calls.
  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
    refetch: refetchPosts,
  } = useGetPostsQuery();

  const {
    data: singlePost,
    isLoading: singleLoading,
    isFetching: singleFetching,
  } = useGetPostQuery(selectedPostId!, { skip: selectedPostId === null });

  // ── Mutations ────────────────────────────────────────────────────────────
  const [createPost, { isLoading: creating }] = useCreatePostMutation();
  const [updatePost, { isLoading: updating }] = useUpdatePostMutation();
  const [deletePost, { isLoading: deleting }] = useDeletePostMutation();

  const handleCreate = async () => {
    await createPost({ userId: 1, title: 'New Post via RTK', body: 'RTK Query + Phase 1 Engine' });
  };

  const handleUpdate = async () => {
    if (!selectedPostId) return;
    await updatePost({ id: selectedPostId, title: 'Updated via RTK Mutation' });
  };

  const handleDelete = async () => {
    if (!selectedPostId) return;
    await deletePost(selectedPostId);
    setSelectedPostId(null);
  };

  const isMutating = creating || updating || deleting;

  return (
    <div className="p-8 font-sans max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">RTK Query API Demo</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Powered by Phase 1 (Axios Engine) + Phase 2 (RTK Query). Open Redux DevTools to inspect the
        cache.
      </p>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={handleCreate}
          disabled={isMutating}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {creating ? 'Creating…' : 'POST Create'}
        </button>
        <button
          onClick={handleUpdate}
          disabled={isMutating || !selectedPostId}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          {updating
            ? 'Updating…'
            : `PUT Update${selectedPostId ? ` #${selectedPostId}` : ' (select a post)'}`}
        </button>
        <button
          onClick={handleDelete}
          disabled={isMutating || !selectedPostId}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
        >
          {deleting
            ? 'Deleting…'
            : `DELETE${selectedPostId ? ` #${selectedPostId}` : ' (select a post)'}`}
        </button>
        <button
          onClick={() => refetchPosts()}
          disabled={postsLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Force Refetch List
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Post List */}
        <div>
          <h2 className="font-semibold mb-2">
            Posts {postsLoading && <span className="text-gray-400 text-sm">(loading…)</span>}
          </h2>
          {postsError && <p className="text-red-500 text-sm">Failed to load posts.</p>}
          <ul className="space-y-1 max-h-[500px] overflow-y-auto text-sm">
            {posts?.slice(0, 20).map((post) => (
              <li
                key={post.id}
                onClick={() => setSelectedPostId(post.id)}
                className={`p-2 rounded cursor-pointer border transition-colors ${
                  selectedPostId === post.id
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-transparent hover:bg-gray-100'
                }`}
              >
                <span className="text-gray-400 mr-2">#{post.id}</span>
                {post.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Single Post Detail */}
        <div>
          <h2 className="font-semibold mb-2">
            Selected Post{' '}
            {singleFetching && <span className="text-gray-400 text-sm">(fetching…)</span>}
          </h2>
          {!selectedPostId && (
            <p className="text-muted-foreground text-sm">Click a post to see details.</p>
          )}
          {singleLoading && <p className="text-sm text-gray-400">Loading…</p>}
          {singlePost && !singleLoading && (
            <div className="border rounded p-4 text-sm space-y-2 bg-background">
              <p>
                <span className="font-medium">ID:</span> {singlePost.id}
              </p>
              <p>
                <span className="font-medium">User ID:</span> {singlePost.userId}
              </p>
              <p>
                <span className="font-medium">Title:</span> {singlePost.title}
              </p>
              <p>
                <span className="font-medium">Body:</span> {singlePost.body}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
