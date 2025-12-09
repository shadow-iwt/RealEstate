import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, ArrowRight, Zap, Users, BarChart3 } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for individuals",
      details: "Ideal for solo agents and small teams just getting started with AI lead generation",
      features: [
        "Up to 500 leads/month",
        "Basic lead scoring",
        "Email support",
        "1 user account",
        "Mobile app access",
        "Daily lead reports",
        "Community forum access",
      ],
      cta: "Start Free Trial",
    },
    {
      name: "Professional",
      price: "$99",
      period: "/month",
      description: "For growing teams",
      details: "Everything you need to scale your real estate business and manage multiple agents",
      features: [
        "Up to 5,000 leads/month",
        "Advanced lead scoring",
        "Priority support (12-24 hrs)",
        "Up to 5 users",
        "Lead enrichment",
        "Custom workflows",
        "Advanced reporting",
        "CRM integrations",
        "Team collaboration tools",
        "API access (limited)",
      ],
      highlighted: true,
      cta: "Start Free Trial",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Contact us",
      description: "For large organizations",
      details: "Unlimited scale with dedicated support and custom integrations",
      features: [
        "Unlimited leads",
        "AI-powered insights",
        "24/7 dedicated support",
        "Unlimited users",
        "Full API access",
        "Custom integrations",
        "Dedicated account manager",
        "Custom training",
        "White-label options",
        "Custom SLA",
      ],
      cta: "Schedule Demo",
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
            Flexible Pricing for Every Scale
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Choose the perfect plan for your business and scale as you grow. All plans include a 30-day free trial.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl border p-8 transition-all duration-300 flex flex-col ${
                plan.highlighted
                  ? "border-purple-500 bg-gradient-to-br from-purple-900/50 to-slate-900/50 ring-2 ring-purple-500/50 md:scale-105 md:-translate-y-4"
                  : "border-purple-500/20 bg-slate-900/50 hover:border-purple-500/40"
              }`}
            >
              {plan.highlighted && (
                <div className="mb-4 inline-block px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full w-fit">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-sm text-gray-300 mb-2">{plan.description}</p>
              <p className="text-xs text-gray-400 mb-6">{plan.details}</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                <span className="text-sm text-gray-400 ml-2">{plan.period}</span>
              </div>
              <Link href="/signup">
                <Button className={`w-full mb-8 ${plan.highlighted ? "bg-purple-600 hover:bg-purple-700" : "border-purple-500/30 text-gray-300 hover:text-white"}`}>
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <div className="border-t border-slate-800 pt-8">
                <p className="text-sm font-semibold text-white mb-4">Includes:</p>
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <Check className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        <section className="border-t border-slate-800 pt-20 mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Plan Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-4 px-4 text-white font-semibold">Feature</th>
                  <th className="text-center py-4 px-4 text-gray-300">Starter</th>
                  <th className="text-center py-4 px-4 text-gray-300">Professional</th>
                  <th className="text-center py-4 px-4 text-gray-300">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Lead Hunting", starter: true, pro: true, ent: true },
                  { name: "Lead Scoring", starter: true, pro: true, ent: true },
                  { name: "Lead Enrichment", starter: false, pro: true, ent: true },
                  { name: "Custom Workflows", starter: false, pro: true, ent: true },
                  { name: "Team Collaboration", starter: false, pro: true, ent: true },
                  { name: "API Access", starter: false, pro: "Limited", ent: true },
                  { name: "Dedicated Support", starter: false, pro: false, ent: true },
                  { name: "Custom Integrations", starter: false, pro: false, ent: true },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-800">
                    <td className="py-4 px-4 text-gray-300">{row.name}</td>
                    <td className="text-center py-4 px-4">
                      {row.starter === true ? (
                        <Check className="h-5 w-5 text-purple-400 mx-auto" />
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {row.pro === true ? (
                        <Check className="h-5 w-5 text-purple-400 mx-auto" />
                      ) : row.pro === "Limited" ? (
                        <span className="text-gray-300 text-xs">Limited</span>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {row.ent === true ? (
                        <Check className="h-5 w-5 text-purple-400 mx-auto" />
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ROI Section */}
        <section className="border-t border-slate-800 pt-20 mb-20">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Our Customers See Real Results</h2>
          <p className="text-center text-gray-400 mb-12">Average metrics from our customer base</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-8 text-center">
              <div className="flex justify-center mb-4">
                <BarChart3 className="h-8 w-8 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">45%</div>
              <p className="text-gray-400">Higher Conversion Rates</p>
              <p className="text-xs text-gray-500 mt-2">Within 3 months of using HobbyConnect</p>
            </div>
            <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-8 text-center">
              <div className="flex justify-center mb-4">
                <Zap className="h-8 w-8 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">6x ROI</div>
              <p className="text-gray-400">Average Return on Investment</p>
              <p className="text-xs text-gray-500 mt-2">In the first year</p>
            </div>
            <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-8 text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-8 w-8 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">20 hrs/week</div>
              <p className="text-gray-400">Time Saved Per Agent</p>
              <p className="text-xs text-gray-500 mt-2">Previously spent on lead hunting</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-slate-800 pt-20 mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Can I change my plan anytime?</h3>
              <p className="text-gray-400 text-sm">Yes! You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.</p>
            </div>
            <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-gray-400 text-sm">All plans include a 30-day free trial with full access. No credit card required to get started.</p>
            </div>
            <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">What if I need more leads?</h3>
              <p className="text-gray-400 text-sm">You can add additional lead credits at any time, or upgrade to a higher plan for more monthly allowance.</p>
            </div>
            <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Do you offer discounts?</h3>
              <p className="text-gray-400 text-sm">Yes! We offer 20% off annual subscriptions. Contact our sales team for custom volume pricing.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Try HobbyConnect free for 30 days. No credit card required.
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
