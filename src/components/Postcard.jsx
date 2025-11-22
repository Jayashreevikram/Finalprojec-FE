import React, { useState } from "react";

const PostCard = ({ post, onDelete, onUpdate, onLike, onComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(post);
  const [newComment, setNewComment] = useState("");

  /* -------------------- LIKE -------------------- */
  const handleLike = () => {
    onLike(post._id);
  };

  /* -------------------- COMMENT -------------------- */
  const handleComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onComment(newComment); // Call backend
    setNewComment("");
  };

  /* -------------------- EDIT -------------------- */
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editedPost.title || !editedPost.description) {
      alert("Please fill in title and description!");
      return;
    }
    onUpdate(post._id, editedPost); // Send update to backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPost(post);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-xl overflow-hidden w-full max-w-3xl hover:shadow-lg transition">
      <div className="bg-blue-600 w-full md:w-1/3 flex justify-center items-center p-6 text-white font-bold text-lg">
        {isEditing ? (
          <input
            type="text"
            value={editedPost.title}
            onChange={(e) =>
              setEditedPost({ ...editedPost, title: e.target.value })
            }
            className="text-black p-1 rounded"
          />
        ) : (
          post.title
        )}
      </div>

      <div className="w-full md:w-2/3 p-6">
        {isEditing ? (
          <textarea
            value={editedPost.description}
            onChange={(e) =>
              setEditedPost({ ...editedPost, description: e.target.value })
            }
            className="w-full border p-2 rounded mb-2"
            rows="3"
          />
        ) : (
          <p className="text-gray-700 mb-3">{post.description}</p>
        )}

        {/* -------------------- TAGS -------------------- */}
        <div className="mb-3">
          {((isEditing ? editedPost.techStack : post.techStack) || []).map(
            (tag, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-600 px-2 py-1 text-sm rounded-full mr-2"
              >
                #{tag}
              </span>
            )
          )}
        </div>

        {/* -------------------- GITHUB LINK -------------------- */}
        {isEditing ? (
          <input
            type="text"
            value={editedPost.github}
            onChange={(e) =>
              setEditedPost({ ...editedPost, github: e.target.value })
            }
            className="w-full border p-2 rounded mb-3"
          />
        ) : (
          <a
            href={post.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline block mb-3"
          >
            🔗 GitHub Link
          </a>
        )}

        {/* -------------------- LIKE / EDIT / DELETE -------------------- */}
        <div className="flex gap-3 mb-3">
          {!isEditing ? (
            <>
              <button
                onClick={handleLike}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                ❤️ Like ({post.likes})
              </button>
              <button
                onClick={handleEdit}
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => onDelete(post._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                🗑️ Delete
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                💾 Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          )}
        </div>

        {/* -------------------- COMMENTS -------------------- */}
        <div className="mt-3 border-t pt-3">
          <h3 className="text-md font-semibold mb-2 text-blue-700">
            💬 Comments
          </h3>

          {(post.comments || []).length === 0 ? (
            <p className="text-sm text-gray-500 mb-2">No comments yet.</p>
          ) : (
            <ul className="mb-2">
              {(post.comments || []).map((c, i) => (
                <li
                  key={i}
                  className="bg-gray-100 p-2 mb-1 rounded text-sm text-left"
                >
                  {c}
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleComment} className="flex gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 border p-2 rounded text-sm"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
