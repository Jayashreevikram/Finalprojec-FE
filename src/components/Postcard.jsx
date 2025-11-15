import React, { useState } from "react";

const PostCard = ({ post, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(post);
  const [newComment, setNewComment] = useState("");

  
  const handleLike = () => {
    const updated = { ...post, likes: post.likes + 1 };
    onUpdate(updated);
  };

  
  const handleComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const updated = {
      ...post,
      comments: [...post.comments, newComment],
    };
    onUpdate(updated);
    setNewComment("");
  };

  
  const handleEdit = () => {
    setIsEditing(true);
  };

  
  const handleSave = () => {
    if (!editedPost.title || !editedPost.description) {
      alert("Please fill in title and description!");
      return;
    }
    onUpdate(editedPost);
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

       
        <div className="mb-3">
          {(isEditing ? editedPost.tags : post.tags).map((tag, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-600 px-2 py-1 text-sm rounded-full mr-2"
            >
              #{tag}
            </span>
          ))}
        </div>

       
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
                onClick={() => onDelete(post.id)}
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

        
        <div className="mt-3 border-t pt-3">
          <h3 className="text-md font-semibold mb-2 text-blue-700">
            💬 Comments
          </h3>
          {post.comments.length === 0 ? (
            <p className="text-sm text-gray-500 mb-2">No comments yet.</p>
          ) : (
            <ul className="mb-2">
              {post.comments.map((c, i) => (
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
