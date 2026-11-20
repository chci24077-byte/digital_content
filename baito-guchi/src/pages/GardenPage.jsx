// 「みんなの庭」育成画面（余裕があれば追加）

export default function GardenPage({ totalWaterPt }) {
  const plants = [
    { name: '人間関係', lv: 'Lv.2', icon: '🌱' },
    { name: 'お客さん対応', lv: 'Lv.1', icon: '🌷' },
    { name: '業務量', lv: 'Lv.1', icon: '🍀' },
    { name: 'その他', lv: 'Lv.1', icon: '🌿' },
  ]

  return (
    <div className="garden-page">
      <h2 className="page-title">🌱 みんなの庭</h2>

      <div className="detail-card" style={{ textAlign: 'center' }}>
        <p style={{ color: '#4A90E2', fontWeight: 'bold', margin: 0 }}>
          みんなの水で植物が育っています
        </p>
        <div style={{ fontSize: 64, margin: '20px 0' }}>🪴💧</div>
        <div style={{ fontSize: 22, fontWeight: 'bold' }}>
          みんなの水：{totalWaterPt} pt
        </div>
        <p className="garden-sub">
          愚痴を投稿したり「共感」を押すと水がたまります
        </p>
      </div>

      <h3 style={{ fontSize: 16, marginBottom: 12 }}>🪴 成長中の植物</h3>
      <div className="plant-grid">
        {plants.map((p) => (
          <div key={p.name} className="plant-card">
            <div style={{ fontSize: 32 }}>{p.icon}</div>
            <div style={{ fontWeight: 'bold', fontSize: 13, marginTop: 6 }}>{p.name}</div>
            <div style={{ color: '#4A90E2', fontSize: 12 }}>{p.lv}</div>
          </div>
        ))}
      </div>
    </div>
  )
}