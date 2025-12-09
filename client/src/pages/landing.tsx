import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Zap,
  Users,
  TrendingUp,
  MessageSquare,
  Target,
  ArrowRight,
  Check,
  Building2,
  Mail,
  Phone,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-white font-bold">
                HC
              </div>
              <span className="text-xl font-bold text-white">HobbyConnect</span>
            </div>
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

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="w-fit bg-purple-600/20 text-purple-300 border-purple-500/30">
              The Future of Real Estate CRM
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              AI-Powered Lead Generation & Management
            </h1>
            <p className="text-xl text-gray-300">
              Automatically hunt, enrich, and score leads with advanced AI. Convert more prospects into customers with our intelligent real estate CRM.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/signup">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500/30 text-gray-300 hover:text-white w-full sm:w-auto"
              >
                Watch Demo
              </Button>
            </div>
            <div className="flex gap-8 pt-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-purple-500" />
                <span>Free for 30 days</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-purple-500" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
          <div className="relative h-96 lg:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-900/20 rounded-2xl blur-3xl" />
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500/20 p-8 h-full flex flex-col justify-center">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-500/20" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-300">156 Leads Hunted</p>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                  <span className="text-lg font-bold text-green-400">↑ 23%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-500/20" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-300">89 Qualified Leads</p>
                    <p className="text-xs text-gray-500">High intent buyers</p>
                  </div>
                  <span className="text-lg font-bold text-blue-400">57%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-purple-500/20" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-300">$2.4M Pipeline Value</p>
                    <p className="text-xs text-gray-500">Enriched & scored</p>
                  </div>
                  <span className="text-lg font-bold text-purple-400">↑ 15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-white">Powerful AI Features</h2>
            <p className="text-xl text-gray-400">
              Everything you need to dominate your real estate market
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Lead Hunter */}
            <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600/20">
                    <Target className="h-5 w-5 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">Lead Hunter</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-400">
                  Automatically hunt and qualify leads from multiple sources
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-400" />
                    Multi-source scraping
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-400" />
                    Intelligent deduplication
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-400" />
                    Auto-qualification
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Lead Enrichment */}
            <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">Lead Enrichment</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-400">
                  Enrich leads with comprehensive data from third-party sources
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-400" />
                    Clearbit integration
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-400" />
                    Public records data
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-400" />
                    Intent extraction
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Predictive Scoring */}
            <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600/20">
                    <Zap className="h-5 w-5 text-green-400" />
                  </div>
                  <CardTitle className="text-white">Lead Scoring</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-400">
                  AI-powered conversion probability prediction
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    Conversion prediction
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    Risk factor analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    Action recommendations
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400">2,500+</div>
            <p className="text-gray-400 mt-2">Active Agents</p>
            <p className="text-xs text-gray-500 mt-1">Trusted by top professionals</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400">$1.2B+</div>
            <p className="text-gray-400 mt-2">Pipeline Value</p>
            <p className="text-xs text-gray-500 mt-1">Managed annually</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400">45%</div>
            <p className="text-gray-400 mt-2">Higher Conversion</p>
            <p className="text-xs text-gray-500 mt-1">Average improvement</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-400">24/7</div>
            <p className="text-gray-400 mt-2">AI Lead Generation</p>
            <p className="text-xs text-gray-500 mt-1">Always working for you</p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Trusted by Industry Leaders</h2>
          <p className="text-gray-400">Join thousands of real estate professionals who've transformed their business with HobbyConnect</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 border border-purple-500/20 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-semibold">Sarah Anderson</p>
                <p className="text-sm text-gray-400">Real Estate Broker</p>
              </div>
            </div>
            <p className="text-gray-300">"HobbyConnect helped us increase our lead pipeline by 3x in just 6 months. The AI scoring is incredibly accurate."</p>
          </div>
          <div className="bg-slate-800/50 border border-purple-500/20 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-semibold">Michael Chen</p>
                <p className="text-sm text-gray-400">Team Manager</p>
              </div>
            </div>
            <p className="text-gray-300">"Our team's productivity skyrocketed. We now focus on closing deals instead of hunting leads."</p>
          </div>
          <div className="bg-slate-800/50 border border-purple-500/20 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-white font-semibold">Jessica Williams</p>
                <p className="text-sm text-gray-400">Regional Director</p>
              </div>
            </div>
            <p className="text-gray-300">"The ROI has been phenomenal. We've closed 40% more deals and reduced our cost per acquisition significantly."</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Get started in minutes and see results immediately</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="relative">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold mb-4 relative z-10">
                1
              </div>
              <h3 className="text-white font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-400 text-sm">Create your account in seconds with no credit card required</p>
            </div>
            {typeof window !== 'undefined' && window.innerWidth >= 768 && (
              <div className="absolute top-6 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-600 to-transparent" style={{ marginLeft: '2rem' }} />
            )}
          </div>
          <div className="relative">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold mb-4 relative z-10">
                2
              </div>
              <h3 className="text-white font-semibold mb-2">Connect Data</h3>
              <p className="text-gray-400 text-sm">Link your data sources and customize your hunting criteria</p>
            </div>
          </div>
          <div className="relative">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold mb-4 relative z-10">
                3
              </div>
              <h3 className="text-white font-semibold mb-2">Hunt Leads</h3>
              <p className="text-gray-400 text-sm">Our AI automatically hunts and enriches leads 24/7</p>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold mb-4">
                4
              </div>
              <h3 className="text-white font-semibold mb-2">Close Deals</h3>
              <p className="text-gray-400 text-sm">Focus on selling with pre-qualified, ready-to-contact leads</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800">
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 rounded-2xl p-12 text-center space-y-6">
          <h2 className="text-4xl font-bold text-white">Ready to transform your business?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of real estate professionals using RealEstate Pro to close more deals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/signup">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
                Start Your Free Trial
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500/30 text-gray-300 hover:text-white w-full sm:w-auto"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
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
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:hello@hobbyconnect.com" className="hover:text-white transition">
                    hello@hobbyconnect.com
                  </a>
                </li>
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
