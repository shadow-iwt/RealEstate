import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Shield, Lock, Eye, Check, ArrowRight, Award, Database, AlertCircle } from "lucide-react";

export default function SecurityPage() {
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
            Enterprise-Grade Security
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Your Data is Safe With Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">We take security seriously. HobbyConnect employs industry-leading practices and compliance standards to protect your data.</p>
        </div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-xl border border-purple-500/20 bg-slate-900/50 hover:border-purple-500/40 transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600/20">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white">End-to-End Encryption</h3>
            </div>
            <p className="text-gray-300 mb-4">All data is encrypted using AES-256 encryption in transit and at rest. Your information is protected at every level.</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-purple-400" />
                TLS 1.2+ for transmission
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-purple-400" />
                AES-256 at rest
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-purple-400" />
                Key rotation protocols
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-xl border border-purple-500/20 bg-slate-900/50 hover:border-purple-500/40 transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/20">
                <Lock className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Access Control</h3>
            </div>
            <p className="text-gray-300 mb-4">Role-based access control and multi-factor authentication ensure only authorized users access sensitive data.</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-400" />
                RBAC with custom roles
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-400" />
                Two-factor authentication
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-400" />
                IP whitelisting support
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-xl border border-purple-500/20 bg-slate-900/50 hover:border-purple-500/40 transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600/20">
                <Eye className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Audit Logs</h3>
            </div>
            <p className="text-gray-300 mb-4">Complete audit trails track all access and changes to your data for compliance and security investigations.</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" />
                Complete activity logs
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" />
                Real-time monitoring
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" />
                Export capabilities
              </li>
            </ul>
          </div>
        </div>

        {/* Compliance Section */}
        <section className="border-t border-slate-800 pt-20 mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Compliance & Certifications</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8">
              <div className="flex items-start gap-4">
                <Award className="h-8 w-8 text-purple-400 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-2">ISO 27001 Certified</h3>
                  <p className="text-gray-400 text-sm">International standard for information security management. Annual third-party audits ensure compliance.</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8">
              <div className="flex items-start gap-4">
                <Award className="h-8 w-8 text-blue-400 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-2">SOC 2 Type II</h3>
                  <p className="text-gray-400 text-sm">Security, availability, and confidentiality controls verified by independent auditors.</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-8 w-8 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-2">GDPR Compliant</h3>
                  <p className="text-gray-400 text-sm">Full compliance with European data protection regulations and user privacy rights.</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8">
              <div className="flex items-start gap-4">
                <Database className="h-8 w-8 text-pink-400 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-2">CCPA Ready</h3>
                  <p className="text-gray-400 text-sm">California Consumer Privacy Act compliance with data export and deletion capabilities.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Practices */}
        <section className="border-t border-slate-800 pt-20 mb-20">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Our Security Practices</h2>
          <p className="text-center text-gray-400 mb-12">We follow industry best practices to maintain the highest level of security</p>
          <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-4">Technical Controls</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Regular penetration testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">24/7 security monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">DDoS protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Web application firewall</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Automated threat detection</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Operational Controls</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Employee security training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Background checks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Incident response plan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Regular backups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Disaster recovery plan</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Security You Can Trust</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your data is our priority. We use enterprise-grade security to protect your business.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
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
