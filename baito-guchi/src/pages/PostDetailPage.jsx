//投稿詳細＋「似た投稿を見つける」（楓咲）

import { getRelatedPosts } from '../utils/matchPosts'

export default function PostDetailPage({ post, allPosts, onBack, onLike, onSelectPost }) {
  const relatedPosts = getRelatedPosts(post, allPosts)

  return (
    <div className="detail-page">
      <div className="sub-header">
        <button className="back-button" onClick={onBack}>
          ＜ もどる
        </button>
        <span className="sub-header-title">投稿の詳細</span>
        <span style={{ width: 60 }} />
      </div>

      {/* メインの投稿カード */}
      <article className="detail-card">
        <div className="post-top">
          <div className="user-badge">
            <span className="avatar-circle">💧</span>
            <div>
              <div className="anonymous-name">匿名さん</div>
              <div className="post-sub-meta">
                {[...post.industries, ...post.categories].join(' ・ ')} {post.time}
              </div>
            </div>
          </div>
        </div>

        <h2 className="detail-title">{post.title}</h2>
        <p className="detail-content">{post.content}</p>

        <div className="tags">
          {post.industries.map((tag) => (
            <span key={tag} className="tag industry-tag"># {tag}</span>
          ))}
          {post.categories.map((tag) => (
            <span key={tag} className="tag category-tag"># {tag}</span>
          ))}
        </div>

        <div className="detail-illust-box">
          <div className="water-character">🌱💧</div>
          <span className="speech-bubble">わかる…！</span>
        </div>

        <button className="empathy-big-button" onClick={() => onLike(post.id)}>
          🩷 共感する（{post.likes}）
        </button>
      </article>

      {/* 関連投稿マッチングセクション（あなたのメイン機能！） */}
      <section className="related-section">
        <div className="related-header">
          <h3>🪴 似た投稿を見つける</h3>
          <span className="match-badge">一致投稿 {relatedPosts.length}件</span>
        </div>

        {relatedPosts.length === 0 ? (
          <p className="empty-text">共通するタグの投稿はまだありません。</p>
        ) : (
          <div className="related-list">
            {relatedPosts.map((rel) => (
              <div
                key={rel.id}
                className="related-card"
                onClick={() => onSelectPost(rel.id)}
              >
                <div className="related-card-top">
                  <span className="match-count-pill">
                    共通タグ {rel.matchCount}件（{rel.matchedTags.map(t => `#${t}`).join(' ')}）
                  </span>
                  <span className="post-time">{rel.time}</span>
                </div>
                <h4>{rel.title}</h4>
                <p className="related-excerpt">{rel.content}</p>
                <div className="related-footer">
                  <span className="related-tags-text">
                    {[...rel.industries, ...rel.categories].map(t => `#${t}`).join(' ')}
                  </span>
                  <span className="mini-like">🩷 {rel.likes}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}