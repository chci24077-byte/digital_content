//共通タグ別の関連投稿一覧（楓咲）

import { getRelatedPosts } from '../utils/matchPosts'

export default function RelatedListPage({ basePost, allPosts, onBack, onSelectPost }) {
  const relatedPosts = getRelatedPosts(basePost, allPosts)
  const baseTags = [...basePost.industries, ...basePost.categories]

  return (
    <div className="related-list-page">
      <div className="sub-header">
        <button className="back-button" onClick={onBack}>
          ＜ 詳細へもどる
        </button>
        <span className="sub-header-title">関連投稿</span>
        <span style={{ width: 80 }} />
      </div>

      <div className="detail-card" style={{ padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 'bold', marginBottom: 8 }}>
          基準のタグ（{baseTags.length}件）
        </div>
        <div className="tags" style={{ marginTop: 0 }}>
          {baseTags.map((tag) => (
            <span key={tag} className="tag industry-tag"># {tag}</span>
          ))}
        </div>
      </div>

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
    </div>
  )
}