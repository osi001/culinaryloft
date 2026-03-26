import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { sanityClient } from '../lib/sanity'
import { BLOG_LIST_QUERY } from '../lib/queries'
import { urlFor } from '../lib/imageUrl'
import { STATIC_POSTS } from '../data/staticBlog'
import LoadingSpinner from '../components/shared/LoadingSpinner'

function PostCard({ post }) {
  const imageUrl = post._featuredImageStatic || (post.featuredImage ? urlFor(post.featuredImage).width(600).height(450).url() : null)
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <Link to={`/blog/${post.slug.current}`} className="group block">
      <div className="aspect-[4/3] overflow-hidden rounded-sm mb-4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-tan" />
        )}
      </div>

      {post.categories && post.categories.length > 0 && (
        <p className="font-body text-xs text-tan tracking-widest uppercase mb-2">
          {post.categories.join(' · ')}
        </p>
      )}

      <h2 className="font-display text-xl text-brown group-hover:text-mid transition-colors mb-2">
        {post.title}
      </h2>

      {post.excerpt && (
        <p className="font-body text-sm text-mid leading-relaxed line-clamp-3 mb-3">
          {post.excerpt}
        </p>
      )}

      <p className="font-body text-xs text-tan">{formattedDate}</p>
    </Link>
  )
}

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
    const useFallback = !projectId || projectId === 'placeholder'

    if (useFallback) {
      setPosts(STATIC_POSTS)
      setLoading(false)
      return
    }

    sanityClient
      .fetch(BLOG_LIST_QUERY)
      .then((data) => {
        setPosts(data && data.length > 0 ? data : STATIC_POSTS)
      })
      .catch(() => {
        setPosts(STATIC_POSTS)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <main>
      {/* Hero */}
      <section className="bg-cream pt-24 pb-8 text-center">
        <h1 className="font-display text-5xl md:text-6xl text-brown">From the kitchen.</h1>
        <p className="font-body text-sm text-mid mt-3 italic">
          Thoughts, craft, and the occasional recipe.
        </p>
      </section>

      {/* Posts grid */}
      {loading ? (
        <div className="pt-16">
          <LoadingSpinner size={32} />
        </div>
      ) : (
        <section className="max-w-6xl mx-auto px-8 md:px-16 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
