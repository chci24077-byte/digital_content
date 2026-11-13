//開発用の初期ダミーデータ

export const INDUSTRY_TAGS = ['飲食', '販売', '塾', 'その他']
export const CATEGORY_TAGS = ['人間関係', 'お客さん対応', '業務量', '給料・待遇', 'その他']

export const initialPosts = [
  {
    id: 1,
    title: '閉店間際に団体のお客さん…',
    content: 'もう片付け始めてたのに、急に大人数で来店。今日も本当疲れた。',
    industries: ['飲食'],
    categories: ['お客さん対応', '業務量'],
    likes: 24,
    time: '12分前',
  },
  {
    id: 2,
    title: 'なんで私ばっかり注意されるの？',
    content: '同じことをしても私だけ怒られるの、納得できない…。',
    industries: ['販売'],
    categories: ['人間関係', 'その他'],
    likes: 16,
    time: '25分前',
  },
  {
    id: 3,
    title: '団体予約がギリギリで入ってきて…',
    content: 'シフト削られててワンオペ状態なのに予約が重なってパニックになった。',
    industries: ['飲食'],
    categories: ['お客さん対応', '業務量'],
    likes: 18,
    time: '18分前',
  },
  {
    id: 4,
    title: 'ランチピークで休憩なし…',
    content: '5時間立ちっぱなしで水も飲めなかった。時給に見合ってなさすぎる。',
    industries: ['飲食'],
    categories: ['業務量', '給料・待遇'],
    likes: 12,
    time: '32分前',
  },
  {
    id: 5,
    title: 'テスト前で休みがとれない…',
    content: '自分の大学のテスト期間なのに代わりの先生がいなくてシフトを入れられた。',
    industries: ['塾'],
    categories: ['業務量', '人間関係'],
    likes: 15,
    time: '1時間前',
  },
]