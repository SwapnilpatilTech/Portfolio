import React, { useState, useEffect } from "react";
import profilePic from "./assets/profile-pic.jpg";
import resumePdf from "./assets/Resume/Swapnil-Patil-Resume.pdf";
import erpImage from "./assets/Project-Images/ERP-System.png";
import chatImage from "./assets/Project-Images/Chat-Application.png";

const projectsData = [
  {
    title: "ERP-System",
    desc: "Comprehensive ERP platform for employee and organizational resource management with secure authentication.",
    tags: ["MERN", "Authentication", "React", "Node.js"],
    image: erpImage,
    link: "https://github.com/SwapnilpatilTech/erp"
  },
  {
    title: "Chat-Application",
    desc: "This is a real-time chat application built with React JS and Firebase. It allows users to send and receive messages instantly with authentication and live updates.",
    tags: ["React", "Firebase", "Real-time Chat"],
    image: chatImage,
    link: "https://github.com/SwapnilpatilTech/Chat-Application-by-react"
  }
];

const Typewriter = ({ words, typingSpeed = 100, deletingSpeed = 60, pauseTime = 2000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleType = () => {
      const currentWord = words[currentWordIndex];
      const isFullWord = currentText === currentWord;
      const isEmpty = currentText === "";
      
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
      }

      if (!isDeleting && isFullWord) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && isEmpty) {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const typingDelay = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(handleType, typingDelay);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="inline-block relative">
      <span className="min-w-[10px] inline-block">{currentText || "\u00A0"}</span>
      <span className="animate-pulse inline-block opacity-75 font-light" style={{ marginLeft: "4px" }}>|</span>
    </span>
  );
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentProjectPage, setCurrentProjectPage] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({ type: "error", msg: "Please fill out all fields." });
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: "info", msg: "Sending message..." });

    const formURL = import.meta.env.VITE_URL;
    try {
      const response = await fetch(formURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus({ type: "success", msg: "Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          msg: "Failed. Please add your proper Formspree endpoint URL.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        msg: "Network error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 4000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#0a0a0f] min-h-screen text-gray-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div
        className="fixed bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5 py-4 shadow-lg" : "bg-transparent py-6 border-b border-transparent"}`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center z-10">
          <a href="#" className="text-2xl font-bold tracking-tight">
            Swapnil<span className="text-indigo-500">.</span>
          </a>
          <ul className="hidden md:flex gap-8 text-sm font-medium">
            <li>
              <a
                href="#home"
                className="hover:text-indigo-400 transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-indigo-400 transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="hover:text-indigo-400 transition-colors"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-indigo-400 transition-colors"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-indigo-400 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
          {/* Mobile menu button could be added here */}
          <div className="md:hidden flex items-center text-indigo-400">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden"
      >
        <div className="max-w-4xl mx-auto text-center z-10 animate-fade-in-up">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full glass-card text-indigo-300 text-sm font-medium border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            Open to new opportunities
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Hi, I'm <span className="text-gradient">Swapnil Patil</span>
            <br /> <span className="text-gray-300"><Typewriter words={["MERN Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Freelancer"]} /></span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            I build elegant, high-performance web applications. Focused on
            crafting premium user experiences with MongoDB, Express, React, and
            Node.js.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#projects"
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transform hover:-translate-y-1"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 glass-card hover:bg-white/5 text-gray-200 font-semibold rounded-lg transition-all transform hover:-translate-y-1 border border-white/10 hover:border-white/20"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* About & Resume Section */}
      <section id="about" className="py-24 px-6 relative z-10 bg-black/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex-1 animate-fade-in-up md:mt-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About <span className="text-indigo-400">Me</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mb-8"></div>
            <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
              <p>
                Hello! I am a passionate Full Stack Developer with a strong
                foundation in the MERN stack. My journey in web development
                began with a fascination for creating interactive web
                experiences, which quickly evolved into a dedicated career
                building robust, scalable applications.
              </p>
              <p>
                I thrive in dynamic environments where I can leverage my
                problem-solving skills to tackle complex technical challenges.
                From architecting responsive and accessible frontend components
                in React to designing secure and efficient RESTful APIs with
                Node.js and Express, I enjoy being involved in every phase of
                the development lifecycle.
              </p>
              <p>
                When I'm not coding, I'm usually exploring new technologies,
                contributing to open-source communities, or refining my skills
                in software architecture and modern UI/UX design. I believe in
                continuous learning and always strive to stay ahead of the
                curve.
              </p>
            </div>

            <div className="mt-10 flex gap-4 flex-wrap">
              <a
                href={resumePdf}
                download="Swapnil_Patil_Resume.pdf"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transform hover:-translate-y-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Resume
              </a>
              <a
                href="#skills"
                className="flex items-center justify-center gap-2 px-6 py-3 glass-card hover:bg-white/5 text-gray-200 font-semibold rounded-lg transition-all transform hover:-translate-y-1 border border-white/10 hover:border-white/20"
              >
                View Skills
              </a>
            </div>
          </div>

          {/* Visual/Image Placeholder */}
          <div
            className="flex-1 w-full max-w-md mt-12 md:mt-0 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-30 animate-pulse-slow"></div>
              <div className="glass-card aspect-square rounded-2xl relative overflow-hidden flex items-center justify-center border border-white/10 p-2">
                <div className="w-full h-full bg-[#13131f] rounded-xl overflow-hidden relative flex items-center justify-center">
                  <img
                    src={profilePic}
                    alt="Swapnil Patil Profile"
                    className="w-full h-full object-cover object-center"
                  />

                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-12 text-center">
                    <span className="text-xl font-bold block text-white">
                      Swapnil Patil
                    </span>
                    <span className="text-sm text-indigo-400">
                      Full Stack MERN Developer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up md:mt-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My <span className="text-indigo-400">Tech Stack</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Frontend",
                skills: ["React.js", "Redux", "Tailwind CSS", "HTML5 & CSS3"],
                icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
              },
              {
                title: "Backend",
                skills: ["Node.js", "Express.js", "RESTful APIs", "JWT Auth"],
                icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
              },
              {
                title: "Database",
                skills: ["MongoDB", "Mongoose"],
                icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
              },
              {
                title: "Tools",
                skills: ["Git & GitHub", "Vite", "Postman"],
                icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
              },
            ].map((category, idx) => (
              <div
                key={idx}
                className="glass-card p-8 rounded-2xl hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={category.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-100">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.skills.map((skill, i) => (
                    <li
                      key={i}
                      className="flex items-center text-gray-400 text-sm font-medium"
                    >
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 relative z-10 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mt-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="text-indigo-400">Projects</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.slice(currentProjectPage * 2, (currentProjectPage + 1) * 2).map((project, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl overflow-hidden group border border-white/5 hover:border-indigo-500/40 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(99,102,241,0.1)] flex flex-col"
              >
                <div className="h-56 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 relative overflow-hidden group-hover:from-indigo-900/60 group-hover:to-purple-900/60 transition-colors flex items-center justify-center">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <svg
                      className="w-20 h-20 text-indigo-500/20 group-hover:scale-110 group-hover:text-indigo-400/40 transition-transform duration-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  )}
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold mb-3 text-gray-100 group-hover:text-indigo-400 transition-colors">
                    {project.link ? <a href={project.link} target="_blank" rel="noopener noreferrer">{project.title}</a> : project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed flex-1">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold px-3 py-1 bg-indigo-500/10 rounded-full text-indigo-300 border border-indigo-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors mt-auto w-max">
                      View on GitHub <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {projectsData.length > 2 && (
            <div className="flex justify-center gap-4 mt-12">
              <button 
                onClick={() => setCurrentProjectPage(prev => Math.max(0, prev - 1))}
                disabled={currentProjectPage === 0}
                className="px-6 py-2 glass-card hover:bg-white/5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-white/10 flex items-center gap-2 text-gray-300 font-medium"
              >
                &larr; Previous
              </button>
              <button 
                onClick={() => setCurrentProjectPage(prev => (prev + 1) * 2 < projectsData.length ? prev + 1 : prev)}
                disabled={(currentProjectPage + 1) * 2 >= projectsData.length}
                className="px-6 py-2 glass-card hover:bg-white/5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-white/10 flex items-center gap-2 text-gray-300 font-medium"
              >
                Next &rarr;
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative z-10 md:mb-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's <span className="text-indigo-400">Connect</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 max-w-xl mx-auto">
              I'm currently looking for new developer opportunities. Whether you
              have an exciting project or just want to say hi, feel free to
              reach out!
            </p>
          </div>

          <form
            className="glass-card p-8 md:p-10 rounded-2xl text-left space-y-6 animate-fade-in-up"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="5"
                placeholder="Let's build something great..."
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                required
              ></textarea>
            </div>

            {submitStatus && (
              <div
                className={`p-4 rounded-lg text-sm font-medium border ${submitStatus.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-400" : submitStatus.type === "info" ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}
              >
                {submitStatus.msg}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white font-bold rounded-lg transition-all transform hover:scale-[1.01] shadow-[0_5px_20px_rgba(99,102,241,0.3)] flex justify-center items-center"
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 pt-16 pb-8 bg-black/40 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
            <div className="max-w-sm">
              <a href="#" className="text-2xl font-bold tracking-tight block mb-4">Swapnil<span className="text-indigo-500">.</span></a>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                A dedicated Full Stack Developer specializing in the MERN stack. Committed to building robust, scalable applications and delivering premium digital experiences. Let's create something brilliant together.
              </p>
              <a href="#contact" className="text-indigo-400 hover:text-indigo-300 font-medium text-sm transition-colors flex items-center gap-1">
                Say Hello <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            </div>
            
            <div className="flex flex-row gap-16 md:gap-24">
              <div>
                <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li><a href="#home" className="hover:text-indigo-400 transition-colors">Home</a></li>
                  <li><a href="#about" className="hover:text-indigo-400 transition-colors">About</a></li>
                  <li><a href="#projects" className="hover:text-indigo-400 transition-colors">Projects</a></li>
                  <li><a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-6">Socials</h4>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li><a href="https://github.com/SwapnilpatilTech" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                    GitHub
                  </a></li>
                  <li><a href="https://www.linkedin.com/in/swapnil-patil22/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    LinkedIn
                  </a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm font-medium">
              © {new Date().getFullYear()} Swapnil Patil. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm font-medium flex items-center gap-1">
              Built with <span className="text-indigo-400">React</span> & <span className="text-indigo-400">Tailwind</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
