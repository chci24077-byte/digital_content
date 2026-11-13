/**
 * 閲覧中の投稿（targetPost）とタグが共通する投稿を抽出し、一致数が多い順に並べる
 */
export function getRelatedPosts(targetPost, allPosts) {
  if (!targetPost) return []

  const targetTags = [
    ...(targetPost.industries || []),
    ...(targetPost.categories || []),
  ]

  return allPosts
    // 自分自身の投稿は除外
    .filter((post) => post.id !== targetPost.id)
    .map((post) => {
      const postTags = [
        ...(post.industries || []),
        ...(post.categories || []),
      ]
      // 共通しているタグを抽出
      const matchedTags = targetTags.filter((tag) => postTags.includes(tag))

      return {
        ...post,
        matchedTags,
        matchCount: matchedTags.length,
      }
    })
    // 1つ以上タグが一致するものだけ残す
    .filter((post) => post.matchCount > 0)
    // 一致数が多い順（同じなら共感数が多い順）にソート
    .sort((a, b) => b.matchCount - a.matchCount || b.likes - a.likes)
}