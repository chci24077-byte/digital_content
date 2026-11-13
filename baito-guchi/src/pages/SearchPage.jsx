//検索・タグ絞り込み（りな）雛形作っておきました

import { useState } from 'react'
import { INDUSTRY_TAGS, CATEGORY_TAGS } from '../data/mockPosts'
import PostCard from '../components/PostCard'

export default function SearchPage({ posts, onSelectPost, onLike }) {
  const [keyword, setKeyword] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const filteredPosts = posts.filter((post) => {
    const matchKeyword =
      !keyword.trim() ||
      post.title.includes(keyword) ||
      post.content.includes(keyword)
    const matchIndustry =
      !selectedIndustry || post.industries.includes(selectedIndustry)
    const matchCategory =
      !selectedCategory || post.categories.includes(selectedCategory)

    return matchKeyword && matchIndustry && matchCategory
  })

  return (
    <div className="search-page">
      <h2 className="page-title">🔍 探す</h2>

      <input
        className="search-input"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="キーワードで検索（例：店長、ワンオペ）"
      />

      <div className="filter-group">
        <p className="filter-label">業種から探す</p>
        <div className="chip-group">
          {INDUSTRY_TAGS.map((tag) => (
            <button
              key={tag}
              className={`chip ${selectedIndustry === tag ? 'chip-blue-active' : ''}`}
              onClick={() => setSelectedIndustry(selectedIndustry === tag ? '' : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <p className="filter-label">愚痴の種類から探す</p>
        <div className="chip-group">
          {CATEGORY_TAGS.map((tag) => (
            <button
              key={tag}
              className={`chip ${selectedCategory === tag ? 'chip-pink-active' : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === tag ? '' : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="section-heading" style={{ marginTop: 24 }}>
        <h2>検索結果</h2>
        <span>{filteredPosts.length}件</span>
      </div>

      <div className="post-list">
        {filteredPosts.length === 0 ? (
          <p className="empty-text">条件に合う投稿が見つかりませんでした。</p>
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onSelect={onSelectPost}
              onLike={onLike}
            />
          ))
        )}
      </div>
    </div>
  )
}