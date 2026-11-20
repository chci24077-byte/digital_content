//投稿詳細＋「似た投稿を見つける」（楓咲）
export default function PostCard({ post, onSelect, onLike }) {
  return (
    <article className="post-card" onClick={() => onSelect(post.id)}>
      <div className="post-top">
        <span className="anonymous">
          💧 匿名さん ・ <small>{[...post.industries, ...post.categories].join('・')}</small>
        </span>
        <span className="post-time">{post.time}</span>
      </div>

      <h3>{post.title}</h3>
      <p className="post-content">{post.content}</p>

      <div className="tags">
        {post.industries.map((tag) => (
          <span key={tag} className="tag industry-tag"># {tag}</span>
        ))}
        {post.categories.map((tag) => (
          <span key={tag} className="tag category-tag"># {tag}</span>
        ))}
      </div>

      <div className="post-footer">
        <button
          className="like-button"
          onClick={(e) => {
            e.stopPropagation()
            onLike(post.id)
          }}
        >
          🩷 共感 {post.likes}
        </button>
        <span className="detail-link">似た投稿を見る ＞</span>
      </div>
    </article>
  )
}