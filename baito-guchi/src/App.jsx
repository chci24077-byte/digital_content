import { useState } from 'react'
import './App.css'

const initialPosts = [
  {
    id: 1,
    title: '店長に理不尽なことで怒られた…',
    content: '忙しい時間帯に一生懸命働いていたのに、突然怒られた。もう少し優しく言ってほしい。',
    industry: '飲食',
    category: '人間関係',
    likes: 24,
    time: '2時間前',
  },
  {
    id: 2,
    title: '今日のお客さんが怖かった',
    content: 'レジで対応していたら、急に大きな声で怒られてしまった。接客って本当に難しい。',
    industry: '販売',
    category: 'お客さん対応',
    likes: 18,
    time: '5時間前',
  },
  {
    id: 3,
    title: 'バイトが忙しすぎる！',
    content: '人手が足りなくて、ずっと動きっぱなし。休憩する時間もほとんどなかった。',
    industry: '飲食',
    category: '業務量',
    likes: 32,
    time: '1日前',
  },
]

function App() {
  const [posts, setPosts] = useState(initialPosts)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [industry, setIndustry] = useState('飲食')
  const [category, setCategory] = useState('人間関係')

  const addPost = (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      alert('タイトルと本文を入力してください')
      return
    }

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      industry,
      category,
      likes: 0,
      time: 'たった今',
    }

    setPosts([newPost, ...posts])
    setTitle('')
    setContent('')
    setShowForm(false)
  }

  const addLike = (id) => {
    setPosts(posts.map(post =>
      post.id === id
        ? { ...post, likes: post.likes + 1 }
        : post
    ))
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <h1 className="logo">☁️ バイトの本音</h1>
          <button className="header-button" onClick={() => setShowForm(true)}>
            ＋ 投稿する
          </button>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <p className="hero-label">アルバイトを頑張るあなたへ</p>
          <h2>そのモヤモヤ、<br />ここで吐き出そう。</h2>
          <p>
            バイトで嫌なことがあった日も、疲れた日も。<br />
            ここでは匿名で、あなたの本音を話せます。
          </p>
          <button className="primary-button" onClick={() => setShowForm(true)}>
            ✏️ 愚痴を投稿する
          </button>
        </section>

        <section className="posts-section">
          <div className="section-heading">
            <h2>💬 みんなの本音</h2>
            <span>{posts.length}件の投稿</span>
          </div>

          <div className="post-list">
            {posts.map(post => (
              <article className="post-card" key={post.id}>
                <div className="post-top">
                  <span className="anonymous">👤 匿名さん</span>
                  <span className="post-time">{post.time}</span>
                </div>

                <h3>{post.title}</h3>
                <p className="post-content">{post.content}</p>

                <div className="tags">
                  <span className="tag industry-tag"># {post.industry}</span>
                  <span className="tag category-tag"># {post.category}</span>
                </div>

                <div className="post-footer">
                  <button className="like-button" onClick={() => addLike(post.id)}>
                    ♡ 共感 {post.likes}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✏️ 愚痴を投稿する</h2>
              <button className="close-button" onClick={() => setShowForm(false)}>
                ×
              </button>
            </div>

            <form onSubmit={addPost}>
              <label>タイトル</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="今日のバイトであったこと…"
                maxLength={100}
              />

              <label>本文</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="ここでは本音を話して大丈夫。"
                rows={5}
                maxLength={1000}
              />

              <label>アルバイトの業種</label>
              <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                <option>飲食</option>
                <option>販売</option>
                <option>塾</option>
                <option>その他</option>
              </select>

              <label>愚痴の種類</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>人間関係</option>
                <option>お客さん対応</option>
                <option>業務量</option>
                <option>その他</option>
              </select>

              <p className="warning">
                🔒 個人名や店舗名など、個人を特定できる情報は書かないでね。
              </p>

              <button type="submit" className="submit-button">
                匿名で投稿する
              </button>
            </form>
          </div>
        </div>
      )}

      <footer className="footer">
        © 2026 バイトの本音
      </footer>
    </div>
  )
}

export default App