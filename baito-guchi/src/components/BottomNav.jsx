//共有パーツ（ことの）

export default function BottomNav({ activeTab, onChangeTab }) {
  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => onChangeTab('home')}
      >
        <span className="nav-icon">🏠</span>
        <span>ホーム</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'search' ? 'active' : ''}`}
        onClick={() => onChangeTab('search')}
      >
        <span className="nav-icon">🔍</span>
        <span>探す</span>
      </button>

      <button
        className="nav-post-button"
        onClick={() => onChangeTab('create')}
      >
        <span>＋</span>
      </button>

      <button
        className={`nav-item ${activeTab === 'garden' ? 'active' : ''}`}
        onClick={() => onChangeTab('garden')}
      >
        <span className="nav-icon">🌱</span>
        <span>みんなの庭</span>
      </button>
    </nav>
  )
}