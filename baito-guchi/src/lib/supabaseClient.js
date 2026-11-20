import { createClient } from '@supabase/supabase-js'

// 後ほどSupabaseの管理画面から取得した値を .env に設定します
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// URLが設定されている場合のみクライアントを作成
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null