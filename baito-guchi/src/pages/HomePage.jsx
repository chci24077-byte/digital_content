//ホーム一覧（長田さん・柳田さん）雛形作っておきました

import PostCard from '../components/PostCard'

export default function HomePage({ posts, totalWaterPt, onOpenCreate, onSelectPost, onLike }) {
  return (
    <div>
      {/* みんなの庭ステータスバナー */}
      <section className="garden-banner">
        <div className="garden-icon">🌱💧</div>
        <div className="garden-info">
          <div className="garden-title">みんなの庭 <span>Lv.2 / 4</span></div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '65%' }} />
          </div>
          <p className="garden-sub">みんなの水: {totalWaterPt} pt（共感で植物が育ちます）</p>
        </div>
      </section>

      {/* ヒーローエリア */}
      <section className="hero">
        <p className="hero-label">今日もバイトおつかれさま！</p>
        <h2>モヤモヤを、<br />みんなの庭に。</h2>
        <p>
          ちょっとした愚痴もここで吐き出してね。<br />
          同じ経験をした仲間とつながれます。
        </p>
        <button className="primary-button" onClick={onOpenCreate}>
          ✏️ 愚痴を投稿する
        </button>
      </section>

      {/* 投稿一覧 */}
      <section className="posts-section">
        <div className="section-heading">
          <h2>💬 みんなの本音</h2>
          <span>{posts.length}件の投稿</span>
        </div>

        <div className="post-list">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onSelect={onSelectPost}
              onLike={onLike}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

