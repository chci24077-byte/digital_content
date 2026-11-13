import { useState, useEffect } from 'react'
import './App.css'
import { fetchPosts, createPost, incrementLike } from './services/postService'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import CreatePostPage from './pages/CreatePostPage'
import PostDetailPage from './pages/PostDetailPage'
import RelatedListPage from './pages/RelatedListPage'
import GardenPage from './pages/GardenPage'

function App() {
  const [posts, setPosts] = useState([])
  // 'home' | 'search' | 'create' | 'garden' | 'detail' | 'related'
  const [currentView, setCurrentView] = useState('home')
  const [selectedPostId, setSelectedPostId] = useState(null)

  useEffect(() => {
    fetchPosts().then((data) => setPosts(data))
  }, [])

  const handleAddPost = async (newPostData) => {
    const created = await createPost(newPostData)
    setPosts([created, ...posts])
    setCurrentView('home')
  }

  const handleLike = async (id) => {
    const target = posts.find((p) => p.id === id)
    if (!target) return
    const nextLikes = await incrementLike(id, target.likes)
    setPosts(posts.map((p) => (p.id === id ? { ...p, likes: nextLikes } : p)))
  }

  const openDetail = (id) => {
    setSelectedPostId(id)
    setCurrentView('detail')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const totalWaterPt = posts.reduce((sum, p) => sum + p.likes * 10 + 50, 0)
  const selectedPost = posts.find((p) => p.id === selectedPostId)

  return (
    <div className="app">
      <Header
        onLogoClick={() => setCurrentView('home')}
        onOpenCreate={() => setCurrentView('create')}
      />

      <main className="container">
        {currentView === 'home' && (
          <HomePage
            posts={posts}
            totalWaterPt={totalWaterPt}
            onOpenCreate={() => setCurrentView('create')}
            onSelectPost={openDetail}
            onLike={handleLike}
          />
        )}

        {currentView === 'search' && (
          <SearchPage
            posts={posts}
            onSelectPost={openDetail}
            onLike={handleLike}
          />
        )}

        {currentView === 'create' && (
          <CreatePostPage
            onSubmitPost={handleAddPost}
            onCancel={() => setCurrentView('home')}
          />
        )}

        {currentView === 'garden' && (
          <GardenPage totalWaterPt={totalWaterPt} />
        )}

        {currentView === 'detail' && selectedPost && (
          <PostDetailPage
            post={selectedPost}
            allPosts={posts}
            onBack={() => setCurrentView('home')}
            onLike={handleLike}
            onSelectPost={openDetail}
            onOpenAllRelated={() => setCurrentView('related')}
          />
        )}

        {currentView === 'related' && selectedPost && (
          <RelatedListPage
            basePost={selectedPost}
            allPosts={posts}
            onBack={() => setCurrentView('detail')}
            onSelectPost={openDetail}
          />
        )}
      </main>

      <BottomNav
        activeTab={currentView}
        onChangeTab={(tab) => setCurrentView(tab)}
      />
    </div>
  )
}

export default App