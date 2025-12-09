import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { FileText, MessageSquare, ArrowRight, Phone, Mail, Search, Clock, Users, Zap } from "lucide-react";

export default function SupportPage() {
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
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold">
            We're Here to Help
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Support Center</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Multiple ways to get the help you need, when you need it</p>
        </div>

        {/* Support Options */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          <div className="p-8 rounded-xl border border-purple-500/20 bg-slate-900/50 hover:border-purple-500/40 transition text-center">
            <div className="flex justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Live Chat</h3>
            <p className="text-gray-300 text-sm mb-4">Chat with our support team in real-time during business hours.</p>
            <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:text-white w-full">Start Chat</Button>
          </div>
          <div className="p-8 rounded-xl border border-purple-500/20 bg-slate-900/50 hover:border-purple-500/40 transition text-center">
            <div className="flex justify-center mb-4">
              <Mail className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Email Support</h3>
            <p className="text-gray-300 text-sm mb-4">Get detailed responses within 24 hours for any questions.</p>
            <a href="mailto:support@hobbyconnect.com" className="text-purple-400 text-sm hover:text-purple-300">support@hobbyconnect.com</a>
          </div>
          <div className="p-8 rounded-xl border border-purple-500/20 bg-slate-900/50 hover:border-purple-500/40 transition text-center">
            <div className="flex justify-center mb-4">
              <Phone className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Phone Support</h3>
            <p className="text-gray-300 text-sm mb-4">Call our support team for urgent issues (Pro & Enterprise only)</p>
            <a href="tel:+1-888-555-0123" className="text-purple-400 text-sm hover:text-purple-300">+1 (888) 555-0123</a>
          </div>
          <div className="p-8 rounded-xl border border-purple-500/20 bg-slate-900/50 hover:border-purple-500/40 transition text-center">
            <div className="flex justify-center mb-4">
              <FileText className="h-8 w-8 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Documentation</h3>
            <p className="text-gray-300 text-sm mb-4">Browse our comprehensive guides and API documentation.</p>
            <Link href="/docs">
              <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:text-white w-full">View Docs</Button>
            </Link>
          </div>
        </div>

        {/* Response Time */}
        <section className="bg-slate-800/50 rounded-2xl border border-purple-500/20 p-8 mb-20">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Support Response Times</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Clock className="h-8 w-8 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Starter Plan</h3>
              <p className="text-gray-400 text-sm">Email responses within 48 hours. Community forum access.</p>
            </div>
            <div className="text-center">
              <Zap className="h-8 w-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Professional Plan</h3>
              <p className="text-gray-400 text-sm">Priority support with responses within 24 hours. Live chat included.</p>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Enterprise Plan</h3>
              <p className="text-gray-400 text-sm">24/7 dedicated support, phone, and email. Dedicated account manager.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-slate-800 pt-20 mb-20">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Frequently Asked Questions</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Find quick answers to common questions about HobbyConnect
          </p>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { q: "What is HobbyConnect?", a: "HobbyConnect is a comprehensive AI-powered lead management and real estate CRM designed to help agents hunt, enrich, and score leads automatically." },
              { q: "How do I get started?", a: "Sign up for a free 30-day trial. Add your information, customize your criteria, and start hunting for leads immediately." },
              { q: "Is there a learning curve?", a: "No! Our platform is intuitive and designed for real estate professionals. Most users get up to speed within 1 hour." },
              { q: "Can I import my existing leads?", a: "Yes! We support CSV imports and direct integrations with popular CRM platforms." },
              { q: "How is data security handled?", a: "We use enterprise-grade AES-256 encryption, ISO 27001 certification, and SOC 2 Type II compliance." },
              { q: "What's your refund policy?", a: "Cancel anytime with no penalties. We offer a 14-day money-back guarantee if you're not satisfied." },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-6">
                <h3 className="text-white font-semibold mb-3">{item.q}</h3>
                <p className="text-gray-400 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Community & Resources */}
        <section className="border-t border-slate-800 pt-20 mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Community & Resources</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Search className="h-8 w-8 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Knowledge Base</h3>
              <p className="text-gray-400 text-sm mb-4">100+ articles covering every feature of HobbyConnect</p>
              <Link href="/docs">
                <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:text-white">Browse Articles</Button>
              </Link>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">User Community</h3>
              <p className="text-gray-400 text-sm mb-4">Connect with other real estate professionals and share tips</p>
              <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:text-white">Join Community</Button>
            </div>
            <div className="text-center">
              <FileText className="h-8 w-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Webinars</h3>
              <p className="text-gray-400 text-sm mb-4">Weekly training sessions and product demonstrations</p>
              <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:text-white">Schedule Demo</Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our support team is always ready to help. Reach out via chat, email, or phone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Start Chat
              <MessageSquare className="ml-2 h-4 w-4" />
            </Button>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="border-purple-500/30 text-gray-300 hover:text-white">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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
