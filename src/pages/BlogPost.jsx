import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { sanityClient } from '../lib/sanity'
import { BLOG_POST_QUERY } from '../lib/queries'
import { urlFor } from '../lib/imageUrl'
import { STATIC_POSTS } from '../data/staticBlog'
import LoadingSpinner from '../components/shared/LoadingSpinner'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
    const useFallback = !projectId || projectId === 'placeholder'

    if (useFallback) {
      const found = STATIC_POSTS.find((p) => p.slug.current === slug) || null
      setPost(found)
      setLoading(false)
      return
    }

    sanityClient
      .fetch(BLOG_POST_QUERY, { slug })
      .then((data) => {
        if (data) {
          setPost(data)
        } else {
          const found = STATIC_POSTS.find((p) => p.slug.current === slug) || null
          setPost(found)
        }
      })
      .catch(() => {
        const found = STATIC_POSTS.find((p) => p.slug.current === slug) || null
        setPost(found)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <LoadingSpinner size={32} />
      </main>
    )
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-cream flex flex-col items-center justify-center gap-4">
        <p className="font-body text-base text-mid">Post not found.</p>
        <Link to="/blog" className="font-body text-xs text-tan hover:text-mid transition-colors">
          ← Back to Journal
        </Link>
      </main>
    )
  }

  const imageUrl = post._featuredImageStatic || (post.featuredImage ? urlFor(post.featuredImage).width(1200).height(675).url() : null)

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <main className="bg-cream min-h-screen">
      {/* Header */}
      <header className="max-w-2xl mx-auto px-8 pt-24 pb-8 text-center">
        {post.categories && post.categories.length > 0 && (
          <p className="font-body text-xs text-tan tracking-widest uppercase mb-3">
            {post.categories.join(' · ')}
          </p>
        )}
        <h1 className="font-display text-4xl md:text-5xl text-brown leading-tight mb-4">
          {post.title}
        </h1>
        <p className="font-body text-xs text-tan">
          {post.author} &middot; {formattedDate}
        </p>
        <span className="block w-8 h-px bg-beige2 mx-auto mt-6" />
      </header>

      {/* Featured image */}
      {imageUrl && (
        <div className="max-w-4xl mx-auto px-8 mb-12">
          <div className="aspect-[16/9] overflow-hidden rounded-sm">
            <img
              src={imageUrl}
              alt={post.title}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Body */}
      <div className="max-w-2xl mx-auto px-8 pb-16">
        {Array.isArray(post.body) &&
          post.body
            .filter((block) => block._type === 'block')
            .map((block) => (
              <p key={block._key} className="font-body text-base text-mid leading-loose mb-5">
                {block.children.map((child) => child.text).join('')}
              </p>
            ))}

        <Link
          to="/blog"
          className="font-body text-xs text-tan hover:text-mid transition-colors"
        >
          ← Back to Journal
        </Link>
      </div>
    </main>
  )
}
