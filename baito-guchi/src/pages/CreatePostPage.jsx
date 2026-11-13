//投稿作成(ちよ)　雛形作っておきました

import { useState } from 'react'
import { INDUSTRY_TAGS, CATEGORY_TAGS } from '../data/mockPosts'

export default function CreatePostPage({ onSubmitPost, onCancel }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedIndustries, setSelectedIndustries] = useState(['飲食'])
  const [selectedCategories, setSelectedCategories] = useState(['人間関係'])

  const toggleTag = (tag, list, setList) => {
    if (list.includes(tag)) {
      if (list.length > 1) setList(list.filter((t) => t !== tag))
    } else {
      setList([...list, tag])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      alert('タイトルと本文を入力してください')
      return
    }
    await onSubmitPost({
      title: title.trim(),
      content: content.trim(),
      industries: selectedIndustries,
      categories: selectedCategories,
      likes: 0,
    })
  }

  return (
    <div className="create-page">
      <div className="sub-header">
        <button className="back-button" onClick={onCancel}>
          ＜ もどる
        </button>
        <span className="sub-header-title">愚痴を投稿する</span>
        <span style={{ width: 60 }} />
      </div>

      <div className="detail-card">
        <form onSubmit={handleSubmit}>
          <label>タイトル（20文字以内目安）</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="例）閉店間際に団体のお客さん…"
            maxLength={40}
          />

          <label>本文（200文字以内）</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="例）もう片付け始めてたのに、急に大人数で来店。今日も本当疲れた…"
            rows={5}
            maxLength={200}
          />

          <label>業種タグ（複数選択可）</label>
          <div className="chip-group">
            {INDUSTRY_TAGS.map((tag) => (
              <button
                type="button"
                key={tag}
                className={`chip ${selectedIndustries.includes(tag) ? 'chip-blue-active' : ''}`}
                onClick={() => toggleTag(tag, selectedIndustries, setSelectedIndustries)}
              >
                {tag}
              </button>
            ))}
          </div>

          <label>愚痴の種類（複数選択可）</label>
          <div className="chip-group">
            {CATEGORY_TAGS.map((tag) => (
              <button
                type="button"
                key={tag}
                className={`chip ${selectedCategories.includes(tag) ? 'chip-pink-active' : ''}`}
                onClick={() => toggleTag(tag, selectedCategories, setSelectedCategories)}
              >
                {tag}
              </button>
            ))}
          </div>

          <p className="warning">
            🔒 個人を特定できる情報（店舗名・氏名・連絡先など）は書かないようにご注意ください。
          </p>

          <button type="submit" className="submit-button">
            投稿する
          </button>
        </form>
      </div>
    </div>
  )
}