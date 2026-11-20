//共有パーツ（ことの）

export default function Header({ onLogoClick, onOpenCreate }) {
  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="logo" onClick={onLogoClick}>
          💧 ぐっちング
        </h1>
        <button className="header-button" onClick={onOpenCreate}>
          ✏️ 投稿する
        </button>
      </div>
    </header>
  )
}