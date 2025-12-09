import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar, User, ArrowRight, Search } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "10 Lead Generation Strategies for Real Estate Agents in 2025",
      excerpt: "Learn proven tactics to generate more qualified leads for your real estate business. From digital marketing to strategic partnerships, discover how top agents are staying ahead.",
      author: "John Smith",
      date: "Dec 1, 2024",
      category: "Tips",
      readTime: "8 min read",
      image: "💡"
    },
    {
      id: 2,
      title: "How AI-Powered Lead Scoring Can Transform Your Conversion Rates",
      excerpt: "Discover how AI-powered lead scoring can help you prioritize high-value prospects. Real data from our customers shows 45% improvement in conversion rates.",
      author: "Sarah Johnson",
      date: "Nov 28, 2024",
      category: "AI",
      readTime: "6 min read",
      image: "🤖"
    },
    {
      id: 3,
      title: "The Future of Real Estate Technology: What's Coming in 2025",
      excerpt: "Explore emerging technologies transforming the real estate industry. From blockchain to metaverse real estate, learn what will shape the future.",
      author: "Michael Davis",
      date: "Nov 25, 2024",
      category: "Trends",
      readTime: "10 min read",
      image: "🚀"
    },
    {
      id: 4,
      title: "Building a High-Performing Real Estate Team: Best Practices",
      excerpt: "Team management insights from successful brokers. Learn how to hire, train, and scale your real estate team effectively without burning out.",
      author: "Emily Chen",
      date: "Nov 20, 2024",
      category: "Leadership",
      readTime: "7 min read",
      image: "👥"
    },
    {
      id: 5,
      title: "Understanding Real Estate Market Cycles: A Beginner's Guide",
      excerpt: "Master the ups and downs of real estate markets. This guide explains market cycles and how to use them to your advantage in your business strategy.",
      author: "John Smith",
      date: "Nov 15, 2024",
      category: "Market",
      readTime: "9 min read",
      image: "📈"
    },
    {
      id: 6,
      title: "Technology Stack for Modern Real Estate Professionals",
      excerpt: "A comprehensive guide to the essential tools and platforms every real estate agent should be using in 2025. From CRM to marketing automation.",
      author: "Sarah Johnson",
      date: "Nov 10, 2024",
      category: "Tools",
      readTime: "12 min read",
      image: "🛠️"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/landing">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-white font-bold">
                  HC
                </div>
                <span className="text-xl font-bold text-white">HobbyConnect</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/features"><span className="text-gray-300 hover:text-white cursor-pointer transition">Features</span></Link>
              <Link href="/pricing"><span className="text-gray-300 hover:text-white cursor-pointer transition">Pricing</span></Link>
              <Link href="/security"><span className="text-gray-300 hover:text-white cursor-pointer transition">Security</span></Link>
              <Link href="/about"><span className="text-gray-300 hover:text-white cursor-pointer transition">About</span></Link>
              <Link href="/docs"><span className="text-gray-300 hover:text-white cursor-pointer transition">Docs</span></Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold">
            Insights & Resources
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Blog</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Tips, trends, and insights for real estate professionals looking to grow their business</p>
        </div>

        {/* Featured Post */}
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/20 rounded-2xl overflow-hidden mb-16">
          <div className="grid md:grid-cols-2 gap-8 p-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">💡</span>
                <span className="text-xs font-semibold text-purple-300 bg-purple-600/20 px-2 py-1 rounded">Featured</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">10 Lead Generation Strategies for Real Estate Agents in 2025</h2>
              <p className="text-gray-300 mb-6">
                Learn proven tactics to generate more qualified leads for your real estate business. From digital marketing to strategic partnerships, discover how top agents are staying ahead in a competitive market.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  John Smith
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Dec 1, 2024
                </span>
                <span>8 min read</span>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Read Full Article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="hidden md:flex h-80 bg-gradient-to-br from-purple-600/20 to-purple-600/5 rounded-lg items-center justify-center">
              <span className="text-6xl">💡</span>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <div key={post.id} className="rounded-xl border border-purple-500/20 bg-slate-900/50 overflow-hidden hover:border-purple-500/40 hover:bg-slate-900/70 transition group cursor-pointer">
                <div className="h-40 bg-gradient-to-br from-purple-600/20 to-purple-600/5 flex items-center justify-center">
                  <span className="text-5xl">{post.image}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-purple-300 bg-purple-600/20 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition">{post.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <section className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 rounded-2xl p-12 text-center mb-20">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our weekly newsletter to get the latest insights, tips, and industry trends delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg bg-slate-900 border border-purple-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <Button className="bg-purple-600 hover:bg-purple-700">Subscribe</Button>
          </div>
        </section>

        {/* Categories */}
        <section className="border-t border-slate-800 pt-20">
          <h2 className="text-2xl font-bold text-white mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['All', 'Tips', 'AI', 'Trends', 'Leadership', 'Market'].map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-lg border border-purple-500/20 bg-slate-900/50 text-gray-300 hover:border-purple-500/40 hover:bg-slate-900/70 hover:text-white transition text-sm font-medium"
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/features"><span className="hover:text-white transition cursor-pointer">Features</span></Link></li>
                <li><Link href="/pricing"><span className="hover:text-white transition cursor-pointer">Pricing</span></Link></li>
                <li><Link href="/security"><span className="hover:text-white transition cursor-pointer">Security</span></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/docs"><span className="hover:text-white transition cursor-pointer">Docs</span></Link></li>
                <li><Link href="/api"><span className="hover:text-white transition cursor-pointer">API</span></Link></li>
                <li><Link href="/support"><span className="hover:text-white transition cursor-pointer">Support</span></Link></li>
                <li><Link href="/blog"><span className="hover:text-white transition cursor-pointer">Blog</span></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/about"><span className="hover:text-white transition cursor-pointer">About</span></Link></li>
                <li><Link href="/careers"><span className="hover:text-white transition cursor-pointer">Careers</span></Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; 2024 HobbyConnect. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
