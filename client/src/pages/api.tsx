import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Code, GitBranch, Zap, ArrowRight } from "lucide-react";

export default function APIPage() {
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
          <h1 className="text-5xl font-bold text-white mb-6">Developer API</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Build powerful integrations with HobbyConnect</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 rounded-lg border border-purple-500/20 bg-slate-900/50 text-center hover:border-purple-500/40 transition">
              <Code className="h-8 w-8 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">RESTful API</h3>
              <p className="text-gray-300 text-sm">Simple and intuitive REST endpoints.</p>
            </div>
            <div className="p-6 rounded-lg border border-purple-500/20 bg-slate-900/50 text-center hover:border-purple-500/40 transition">
              <GitBranch className="h-8 w-8 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Webhooks</h3>
              <p className="text-gray-300 text-sm">Real-time event notifications.</p>
            </div>
            <div className="p-6 rounded-lg border border-purple-500/20 bg-slate-900/50 text-center hover:border-purple-500/40 transition">
              <Zap className="h-8 w-8 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">SDKs</h3>
              <p className="text-gray-300 text-sm">Multiple language support.</p>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-lg border border-purple-500/20 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">API Overview</h2>
            <p className="text-gray-300 mb-6">
              The HobbyConnect API allows you to programmatically access and manipulate your data. 
              All API endpoints use HTTPS and return JSON responses.
            </p>
            <div className="bg-slate-950 p-4 rounded font-mono text-sm overflow-x-auto text-gray-300">
              <pre>{`GET /api/leads
POST /api/leads
GET /api/properties
POST /api/properties
GET /api/agents
POST /api/activities`}</pre>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-lg border border-purple-500/20 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Authentication</h2>
            <p className="text-gray-300 mb-4">
              All API requests require authentication using an API key. You can generate API keys 
              in your account settings.
            </p>
            <div className="bg-slate-950 p-4 rounded font-mono text-sm text-gray-300">
              Authorization: Bearer YOUR_API_KEY
            </div>
          </div>

          <div className="text-center">
            <Link href="/docs">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                View Full Documentation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
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
