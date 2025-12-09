import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Briefcase, MapPin, DollarSign, ArrowRight, Heart, Users, Zap, Award } from "lucide-react";

export default function CareersPage() {
  const jobs = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      location: "Remote",
      type: "Full-time",
      salary: "$120K - $160K",
      description: "Build the next generation of real estate technology. You'll work on our AI-powered platform, serving hundreds of agents worldwide.",
      requirements: ["5+ years experience", "React/Node expertise", "AI/ML knowledge", "Passion for startups"]
    },
    {
      id: 2,
      title: "Product Manager",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      salary: "$140K - $180K",
      description: "Drive our product vision and strategy. Lead feature development, manage roadmap, and work directly with customers to shape the future of HobbyConnect.",
      requirements: ["3+ years PM experience", "SaaS background", "Startup experience", "Real estate interest"]
    },
    {
      id: 3,
      title: "Customer Success Manager",
      location: "New York, NY / Remote",
      type: "Full-time",
      salary: "$80K - $120K",
      description: "Be the voice of our customers. Help them succeed, gather feedback, and ensure they get maximum value from our platform.",
      requirements: ["2+ years CS experience", "Sales or support background", "Customer-focused mindset", "Real estate knowledge preferred"]
    },
    {
      id: 4,
      title: "AI/ML Engineer",
      location: "Remote",
      type: "Full-time",
      salary: "$130K - $170K",
      description: "Work on the AI that powers our lead hunting and scoring. Build machine learning models that help real estate professionals succeed.",
      requirements: ["3+ years ML experience", "Python expertise", "ML frameworks", "Real estate interest"]
    },
    {
      id: 5,
      title: "Sales Development Representative",
      location: "Remote",
      type: "Full-time",
      salary: "$50K - $80K + Commission",
      description: "Kick off your sales career with a high-growth startup. Prospect, qualify leads, and help real estate professionals discover HobbyConnect.",
      requirements: ["Sales enthusiasm", "Communication skills", "Work ethic", "Coachability"]
    },
    {
      id: 6,
      title: "Marketing Manager",
      location: "Remote",
      type: "Full-time",
      salary: "$90K - $130K",
      description: "Build our brand and drive growth. Manage campaigns, content, partnerships, and help real estate professionals find us.",
      requirements: ["3+ years marketing", "Content creation", "SaaS experience", "Data-driven mindset"]
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
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold">
            Join Our Mission
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Join Our Team</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Help us revolutionize real estate management and transform the lives of thousands of agents</p>
        </div>

        {/* Why Join Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Work at HobbyConnect?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8 text-center">
              <div className="flex justify-center mb-4">
                <Zap className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-3">Cutting-Edge Tech</h3>
              <p className="text-gray-400 text-sm">Work with AI, machine learning, and modern tech stack on problems that matter</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8 text-center">
              <div className="flex justify-center mb-4">
                <Heart className="h-8 w-8 text-pink-400" />
              </div>
              <h3 className="text-white font-semibold mb-3">Great Benefits</h3>
              <p className="text-gray-400 text-sm">Competitive salary, equity, health insurance, unlimited PTO, and professional development</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8 text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-3">Great People</h3>
              <p className="text-gray-400 text-sm">Work with talented, passionate teammates who are changing the industry</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8 text-center">
              <div className="flex justify-center mb-4">
                <Award className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-white font-semibold mb-3">Real Impact</h3>
              <p className="text-gray-400 text-sm">Your work directly impacts thousands of real estate professionals and their success</p>
            </div>
          </div>
        </section>

        {/* Jobs Section */}
        <section className="border-t border-slate-800 pt-20 mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Open Positions</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {jobs.map((job) => (
              <div key={job.id} className="rounded-xl border border-purple-500/20 bg-slate-900/50 p-8 hover:border-purple-500/40 hover:bg-slate-900/70 transition">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-6 text-sm text-gray-300 mb-4">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-purple-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-purple-400" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-purple-400" />
                      {job.salary}
                    </span>
                  </div>
                </div>
                <div className="border-t border-slate-800 pt-4 mb-4">
                  <p className="text-xs font-semibold text-gray-400 mb-3">KEY QUALIFICATIONS:</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Culture Section */}
        <section className="border-t border-slate-800 pt-20 mb-20">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Our Culture</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            We believe in creating an inclusive, supportive environment where great people can do their best work
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8">
              <h3 className="text-white font-semibold mb-4">Diversity & Inclusion</h3>
              <p className="text-gray-400 text-sm">We celebrate diverse perspectives and are committed to building a team that reflects the communities we serve.</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8">
              <h3 className="text-white font-semibold mb-4">Work-Life Balance</h3>
              <p className="text-gray-400 text-sm">Flexible schedules, remote work options, and unlimited PTO help us maintain a healthy balance.</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8">
              <h3 className="text-white font-semibold mb-4">Continuous Learning</h3>
              <p className="text-gray-400 text-sm">Annual learning budget, conference attendance, and mentorship programs support your growth.</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-8">
              <h3 className="text-white font-semibold mb-4">Transparent Communication</h3>
              <p className="text-gray-400 text-sm">Open dialogue, regular all-hands meetings, and direct access to leadership.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Us?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Don't see the perfect role? Send us your resume and let's talk about how you can contribute to our mission.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            View All Positions
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
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
