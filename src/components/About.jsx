import React from "react";
import { Target, Users, Award, TrendingUp } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Target className="text-white" size={24} />,
      title: "Our Scope",
      description:
        "Multidisciplinary research spanning natural sciences, engineering, social sciences, and humanities.",
    },
    {
      icon: <Users className="text-white" size={24} />,
      title: "Expert Review",
      description:
        "Rigorous peer review by leading academics ensuring the highest quality standards.",
    },
    {
      icon: <Award className="text-white" size={24} />,
      title: "Open Access",
      description:
        "Free, immediate access to all published research promoting global knowledge sharing.",
    },
    {
      icon: <TrendingUp className="text-white" size={24} />,
      title: "Impact",
      description:
        "High visibility and citation rates through indexing in major academic databases.",
    },
  ];

  const stats = [
    { label: "Countries", value: "120+" },
    { label: "Reviewers", value: "500+" },
    { label: "Disciplines", value: "25+" },
    { label: "Avg. Review Time", value: "21 days" },
  ];

  return (
    <section className="py-20 px-6 bg-white max-w-7xl mx-auto" id="about">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[#713F12] flex items-center justify-center gap-4 mb-6">
          About <span className=" border-[#713F12] ">MPA Research</span>
        </h2>
        <p className="text-[#854D0E] max-w-3xl mx-auto text-lg leading-relaxed">
          Committed to advancing knowledge through rigorous peer-reviewed
          research, fostering collaboration, and promoting scientific excellence
          worldwide.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#FFFBEB] p-8 rounded-2xl border border-yellow-100 hover:shadow-md transition-shadow"
          >
            <div className="bg-[#10B981] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-[#713F12] mb-3">
              {feature.title}
            </h3>
            <p className="text-[#854D0E] text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Mission Banner Section */}
      <div className="bg-[#22C55E] rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-xl relative overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content */}
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              To provide a premier platform for researchers worldwide to share
              innovative findings, foster scientific dialogue, and contribute to
              the advancement of human knowledge across all disciplines.
            </p>
            <ul className="space-y-4">
              {[
                "Promote scientific excellence",
                "Ensure ethical publishing standards",
                "Foster global collaboration",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-medium">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 md:p-8 rounded-3xl"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle Decorative Gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      </div>
    </section>
  );
};

export default About;
