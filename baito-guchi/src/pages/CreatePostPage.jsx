
import { useState } from 'react'
import { INDUSTRY_TAGS, CATEGORY_TAGS } from '../data/mockPosts'

export default function CreatePostPage({ onSubmitPost, onCancel }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedIndustries, setSelectedIndustries] = useState(['飲食'])
  const [selectedCategories, setSelectedCategories] = useState(['人間関係'])

  // 新しく追加した状態
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // タグの選択・解除
  const toggleTag = (tag, list, setList) => {
    if (list.includes(tag)) {
      setList(list.filter((t) => t !== tag))
    } else {
      setList([...list, tag])
    }
  }

  // 投稿内容の入力チェック
  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!title.trim() || !content.trim()) {
      setError('タイトルと本文を入力してください')
      return
    }

    if (selectedIndustries.length === 0 ||
        selectedCategories.length === 0) {
      setError('タグをそれぞれ1つ以上選択してください')
      return
    }

    // すぐには投稿せず、確認画面を表示
    setShowConfirm(true)
  }

  // 投稿確定
  const confirmSubmit = async () => {
    if (isSubmitting) return

    setIsSubmitting(true)
    setError('')

    try {
      await onSubmitPost({
        title: title.trim(),
        content: content.trim(),
        industries: selectedIndustries,
        categories: selectedCategories,
        likes: 0,
      })

      setShowConfirm(false)
    } catch (err) {
      setError('投稿に失敗しました。もう一度お試しください。')
      setShowConfirm(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="create-page">
      <div className="sub-header">
        <button
          type="button"
          className="back-button"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          ＜ もどる
        </button>
        <span className="sub-header-title">愚痴を投稿する</span>
        <span style={{ width: 60 }} />
      </div>

      <div className="detail-card">
        <form onSubmit={handleSubmit}>

          <label htmlFor="post-title">タイトル</label>
          <input
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="例）閉店間際に団体のお客さん…"
            maxLength={40}
          />
          <p className="char-count">{title.length} / 40文字</p>

          <label htmlFor="post-content">本文</label>
          <textarea
            id="post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="今日あった出来事を書いてみよう…"
            rows={5}
            maxLength={200}
          />
          <p className="char-count">{content.length} / 200文字</p>

          <label>業種タグ（複数選択可）</label>
          <div className="chip-group">
            {INDUSTRY_TAGS.map((tag) => (
              <button
                type="button"
                key={tag}
                aria-pressed={selectedIndustries.includes(tag)}
                className={`chip ${
                  selectedIndustries.includes(tag)
                    ? 'chip-blue-active'
                    : ''
                }`}
                onClick={() =>
                  toggleTag(tag, selectedIndustries, setSelectedIndustries)
                }
              >
                {selectedIndustries.includes(tag) ? '✓ ' : ''}
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
                aria-pressed={selectedCategories.includes(tag)}
                className={`chip ${
                  selectedCategories.includes(tag)
                    ? 'chip-pink-active'
                    : ''
                }`}
                onClick={() =>
                  toggleTag(tag, selectedCategories, setSelectedCategories)
                }
              >
                {selectedCategories.includes(tag) ? '✓ ' : ''}
                {tag}
              </button>
            ))}
          </div>

          <p className="warning">
            🔒 店舗名・氏名・連絡先など、
            個人を特定できる情報は書かないでください。
          </p>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            投稿内容を確認する
          </button>
        </form>
      </div>

      {/* 投稿前の確認画面 */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div
            className="confirm-box"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
          >
            <h3 id="confirm-title">この内容で投稿しますか？</h3>

            <p><strong>タイトル：</strong>{title.trim()}</p>
            <p><strong>本文：</strong>{content.trim()}</p>
            <p>
              <strong>業種：</strong>
              {selectedIndustries.join('、')}
            </p>
            <p>
              <strong>種類：</strong>
              {selectedCategories.join('、')}
            </p>

            <div className="confirm-actions">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                disabled={isSubmitting}
              >
                修正する
              </button>
              <button
                type="button"
                className="submit-button"
                onClick={confirmSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? '投稿中...' : '投稿する'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
