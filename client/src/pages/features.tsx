import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Zap, Shield, Users, Smartphone, Globe, TrendingUp, ArrowRight, Check, Brain, Layers, Gauge, Lock } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Lead Hunting",
      description: "Our advanced AI algorithms automatically hunt qualified leads from multiple data sources, analyzing hundreds of data points to find your ideal prospects.",
      details: [
        "Multi-source data aggregation",
        "Intelligent lead deduplication",
        "Real-time lead discovery",
        "Customizable hunting criteria"
      ]
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: "Lead Enrichment",
      description: "Enrich your leads with comprehensive data, contact information, company details, and market intelligence to improve targeting accuracy.",
      details: [
        "50+ data attributes per lead",
        "Company and decision-maker info",
        "Contact details and social profiles",
        "Intent and behavior signals"
      ]
    },
    {
      icon: <Gauge className="h-8 w-8" />,
      title: "Predictive Lead Scoring",
      description: "Intelligent lead scoring powered by machine learning to prioritize high-value prospects and maximize your conversion rates.",
      details: [
        "Conversion probability prediction",
        "Risk factor analysis",
        "Buying stage identification",
        "Action recommendations"
      ]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Real-time collaboration tools for teams to work together efficiently on leads, properties, and deals without any bottlenecks.",
      details: [
        "Shared lead workspaces",
        "Real-time updates and notifications",
        "Role-based access control",
        "Activity tracking and audit logs"
      ]
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Friendly",
      description: "Access your leads and properties on the go with our fully responsive mobile interface. Manage your business from anywhere.",
      details: [
        "Native mobile experience",
        "Offline mode for lead access",
        "Push notifications for hot leads",
        "One-click calling and messaging"
      ]
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Automation & Workflows",
      description: "Create custom workflows to automate repetitive tasks and focus on what matters most - closing deals.",
      details: [
        "Drag-and-drop workflow builder",
        "Conditional logic automation",
        "Integration with email and CRM",
        "Scheduled tasks and triggers"
      ]
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
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold">
              Comprehensive Feature Set
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Everything You Need to Win More Deals
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From intelligent lead hunting to predictive scoring, our comprehensive suite of features is designed to help real estate professionals close more deals faster than ever before.
            </p>
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="group p-8 rounded-xl border border-purple-500/20 bg-slate-900/50 backdrop-blur hover:border-purple-500/50 hover:bg-slate-900/80 transition-all duration-300">
              <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <Check className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <section className="border-t border-slate-800 pt-20 mb-20">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Choose HobbyConnect?</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600/20">
                    <TrendingUp className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Proven Results</h3>
                  <p className="text-gray-400">Our users report 45% higher conversion rates on average within the first 3 months.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/20">
                    <Smartphone className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Work From Anywhere</h3>
                  <p className="text-gray-400">Fully mobile-optimized platform means you can manage your business from your phone or tablet.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600/20">
                    <Lock className="h-6 w-6 text-green-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Enterprise Security</h3>
                  <p className="text-gray-400">Bank-level encryption and compliance with GDPR, CCPA, and other data protection standards.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-600/20">
                    <Zap className="h-6 w-6 text-pink-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Fast Implementation</h3>
                  <p className="text-gray-400">Get up and running in minutes. Our onboarding process is streamlined for quick time-to-value.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-600/20">
                    <Users className="h-6 w-6 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">World-Class Support</h3>
                  <p className="text-gray-400">Dedicated support team available 24/7 to help you maximize your ROI and solve any challenges.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-600/20">
                    <Globe className="h-6 w-6 text-yellow-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Global Coverage</h3>
                  <p className="text-gray-400">Works with properties and leads worldwide. Multi-language support for international teams.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="border-t border-slate-800 pt-20 mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Seamless Integrations</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            HobbyConnect integrates with your favorite tools to streamline your workflow
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {['Zapier', 'Slack', 'Gmail', 'Salesforce', 'HubSpot', 'Google Sheets', 'Outlook', 'Custom API'].map((tool) => (
              <div key={tool} className="p-6 rounded-lg border border-purple-500/20 bg-slate-800/50 text-center">
                <p className="text-gray-300 font-medium">{tool}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of real estate professionals using HobbyConnect to close more deals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500/30 text-gray-300 hover:text-white w-full sm:w-auto"
            >
              Schedule a Demo
            </Button>
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
