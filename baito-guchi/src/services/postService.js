//データベース連携
//ここを書き換えるだけで仮でーたからDBに切り替えられる

import { supabase } from '../lib/supabaseClient'
import { initialPosts } from '../data/mockPosts'

// 投稿一覧の取得
export async function fetchPosts() {
  // Supabase未設定時はダミーデータを返す
  if (!supabase) return initialPosts

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('投稿の取得に失敗:', error)
    return initialPosts
  }
  return data
}

// 新規投稿の作成
export async function createPost(newPost) {
  if (!supabase) return { ...newPost, id: Date.now(), time: 'たった今' }

  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        title: newPost.title,
        content: newPost.content,
        industries: newPost.industries,
        categories: newPost.categories,
        likes: 0,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('投稿の保存に失敗:', error)
    throw error
  }
  return { ...data, time: 'たった今' }
}

// 共感（いいね）のカウントアップ
export async function incrementLike(postId, currentLikes) {
  if (!supabase) return currentLikes + 1

  const { data, error } = await supabase
    .from('posts')
    .update({ likes: currentLikes + 1 })
    .eq('id', postId)
    .select()
    .single()

  if (error) {
    console.error('共感の更新に失敗:', error)
    return currentLikes + 1
  }
  return data.likes
}