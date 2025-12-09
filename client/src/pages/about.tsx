import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Heart, Users, Zap, ArrowRight, Award, Target, Lightbulb } from "lucide-react";

export default function AboutPage() {
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
            Our Story
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">About HobbyConnect</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Building the future of real estate management, one deal at a time</p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-500/20 p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                We're on a mission to revolutionize how real estate professionals manage leads and properties. 
                By combining cutting-edge AI technology with intuitive design, we empower agents to focus on 
                what they do best: building relationships and closing deals. We believe that technology should 
                amplify human potential, not replace it.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl border border-purple-500/20 bg-slate-900/50 hover:border-purple-500/40 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600/20">
                  <Heart className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Quality First</h3>
              </div>
              <p className="text-gray-300 mb-4">
                We obsess over details to deliver an exceptional experience. Every feature, every interaction, 
                every pixel is crafted with care and purpose.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Rigorous testing standards</li>
                <li>• User-centric design</li>
                <li>• Continuous improvement</li>
              </ul>
            </div>
            <div className="p-8 rounded-xl border border-purple-500/20 bg-slate-900/50 hover:border-purple-500/40 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/20">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Customer Obsessed</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Your success is our success. We listen to feedback, adapt quickly, and build what our customers 
                actually need, not what we think they should want.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Active feedback loops</li>
                <li>• Responsive support</li>
                <li>• Data-driven decisions</li>
              </ul>
            </div>
            <div className="p-8 rounded-xl border border-purple-500/20 bg-slate-900/50 hover:border-purple-500/40 transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600/20">
                  <Lightbulb className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Innovation</h3>
              </div>
              <p className="text-gray-300 mb-4">
                We stay ahead of the curve by embracing new technologies and challenging the status quo. 
                AI isn't just a buzzword for us—it's our competitive advantage.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Cutting-edge technology</li>
                <li>• Research-backed features</li>
                <li>• Future-focused vision</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Company Story Section */}
        <section className="border-t border-slate-800 pt-20 mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Journey</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">The Beginning (2023)</h3>
                <p className="text-gray-300 mb-4">
                  HobbyConnect was born from personal frustration. Our founders—all experienced real estate professionals—
                  spent hours hunting leads manually, managing spreadsheets, and duplicating effort across their teams. 
                  We asked ourselves: "Why isn't there a smarter way to do this?"
                </p>
                <p className="text-gray-300">
                  So we decided to build it ourselves. What started as a side project quickly became our passion.
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-8 border border-purple-500/20">
                <div className="text-4xl font-bold text-purple-400 mb-2">2023</div>
                <p className="text-gray-400">First lines of code written</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-slate-800/50 rounded-xl p-8 border border-purple-500/20 md:order-2">
                <div className="text-4xl font-bold text-purple-400 mb-2">2024</div>
                <p className="text-gray-400">Launch & rapid growth to 100+ users</p>
              </div>
              <div className="md:order-1">
                <h3 className="text-2xl font-bold text-white mb-4">Going Live (2024)</h3>
                <p className="text-gray-300 mb-4">
                  After months of development and beta testing with real estate professionals, we launched HobbyConnect publicly. 
                  The response was overwhelming. Within weeks, hundreds of agents signed up. Within months, we had managed $1B+ in pipeline value.
                </p>
                <p className="text-gray-300">
                  The validation confirmed our vision: the market desperately needed this solution.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Today & Tomorrow</h3>
                <p className="text-gray-300 mb-4">
                  Today, HobbyConnect serves hundreds of real estate professionals across North America. Our AI-powered 
                  platform has become the go-to solution for teams serious about scaling their business.
                </p>
                <p className="text-gray-300">
                  But we're just getting started. We have an ambitious roadmap of new features and international expansion plans.
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-8 border border-purple-500/20">
                <div className="text-4xl font-bold text-purple-400 mb-2">2025+</div>
                <p className="text-gray-400">Scaling globally, advancing AI capabilities</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="border-t border-slate-800 pt-20 mb-20">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Built by Experts</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Our team combines deep real estate industry experience with cutting-edge technology expertise.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                role: "Founder & CEO",
                background: "10+ years in real estate, led 50+ agent teams"
              },
              {
                role: "VP Engineering",
                background: "Ex-Google, built AI systems for millions of users"
              },
              {
                role: "VP Product",
                background: "Former product lead at major PropTech company"
              }
            ].map((member, i) => (
              <div key={i} className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-600/20 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{member.role}</h3>
                <p className="text-gray-400 text-sm">{member.background}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Section */}
        <section className="border-t border-slate-800 pt-20 mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">500+</div>
              <p className="text-gray-400">Active Users</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">$1B+</div>
              <p className="text-gray-400">Pipeline Managed</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">2,500+</div>
              <p className="text-gray-400">Leads Per Day</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">45%</div>
              <p className="text-gray-400">Avg Conversion Lift</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Be Part of Our Story</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of real estate professionals transforming their business with HobbyConnect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/careers">
              <Button size="lg" variant="outline" className="border-purple-500/30 text-gray-300 hover:text-white w-full sm:w-auto">
                Join Our Team
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
