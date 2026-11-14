import { useState } from "react";
function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const features = [
    {
      icon: "\u{1F916}",
      title: "AI Health Advisor",
      desc: "Get personalized health insights and AI-powered recommendations."
    },
    {
      icon: "\u{1F957}",
      title: "Nutrition Tracker",
      desc: "Search foods and track calories, protein, carbs and fats."
    },
    {
      icon: "\u{1F4A7}",
      title: "Water Tracker",
      desc: "Record daily water intake and monitor hydration goals."
    },
    {
      icon: "\u{1F4CA}",
      title: "Health Analytics",
      desc: "Visualize health metrics and understand your progress."
    },
    {
      icon: "\u{1F4C4}",
      title: "Health Reports",
      desc: "View and manage your recorded health information."
    },
    {
      icon: "\u{1F510}",
      title: "Secure Authentication",
      desc: "User authentication and protected application routes."
    }
  ];
  const technologies = [
    "React.js",
    "JavaScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "JWT",
    "REST API"
  ];
  return <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Inter', sans-serif;
          color: #111827;
        }

        a {
          text-decoration: none;
        }

        .home {
          overflow: hidden;
          background: #fff;
        }

        .container {
          width: 90%;
          max-width: 1200px;
          margin: auto;
        }

        .navbar {
          height: 75px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255,255,255,.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #edf0f5;
        }

        .logo {
          font-size: 21px;
          font-weight: 800;
          color: #172554;
        }

        .logo span {
          color: #635bff;
        }

        .nav-links {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .nav-links a {
          color: #475569;
          font-size: 13px;
          font-weight: 600;
        }

        .nav-links a:hover {
          color: #635bff;
        }

        .nav-buttons {
          display: flex;
          gap: 10px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 22px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          transition: .25s;
          cursor: pointer;
        }

        .primary {
          color: white;
          background: linear-gradient(110deg,#4169ff,#8138e9);
          box-shadow: 0 5px 15px #635bff30;
        }

        .primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px #635bff45;
        }

        .secondary {
          color: #5148e8;
          border: 1px solid #aaa5ff;
          background: white;
        }

        .secondary:hover {
          background: #f4f3ff;
        }

        .mobile-auth {
          display: none;
        }

        .menu-btn {
          display: none;
          background: none;
          border: 0;
          font-size: 25px;
        }


        .hero {
          padding: 90px 5%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 55px;
          background:
            radial-gradient(circle at 85% 40%,#e8eaff,transparent 38%),
            linear-gradient(120deg,#fff,#f8f9ff);
        }

        .tag {
          display: inline-block;
          color: #5749ed;
          background: #efedff;
          padding: 8px 14px;
          border-radius: 30px;
          font-size: 11px;
          font-weight: 700;
          margin-bottom: 22px;
        }

        .hero h1 {
          font-size: clamp(38px,5vw,58px);
          line-height: 1.15;
          letter-spacing: -2px;
          color: #111c38;
          margin-bottom: 22px;
        }

        .gradient {
          background: linear-gradient(90deg,#3765ff,#902be8);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero p {
          color: #64748b;
          font-size: 15px;
          line-height: 1.9;
          max-width: 490px;
          margin-bottom: 28px;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .hero-note {
          margin-top: 25px;
          font-size: 11px;
          color: #64748b;
        }


        .dashboard {
          padding: 17px;
          border: 1px solid #e5e7eb;
          border-radius: 17px;
          background: white;
          box-shadow: 0 20px 60px #17255418;
          transform: rotateY(-3deg);
        }

        .dash-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 22px;
          font-size: 12px;
          font-weight: 700;
        }

        .dash-top span {
          color: #64748b;
          font-weight: 500;
        }

        .dash-welcome {
          margin-bottom: 18px;
        }

        .dash-welcome small {
          color: #64748b;
          font-size: 11px;
        }

        .dash-welcome h3 {
          margin-top: 5px;
          font-size: 21px;
        }

        .dash-grid {
          display: grid;
          grid-template-columns: repeat(2,1fr);
          gap: 12px;
        }

        .dash-card {
          padding: 17px;
          border: 1px solid #e8eaf2;
          border-radius: 11px;
          background: #fff;
        }

        .dash-card small {
          color: #64748b;
          font-size: 11px;
        }

        .dash-card strong {
          display: block;
          font-size: 23px;
          margin-top: 10px;
          color: #172554;
        }

        .dash-card span {
          font-size: 10px;
          color: #16a36a;
          display: block;
          margin-top: 5px;
        }

        .dash-progress {
          margin-top: 15px;
          padding: 17px;
          border-radius: 11px;
          background: #f7f8ff;
        }

        .dash-progress h4 {
          font-size: 12px;
          margin-bottom: 15px;
        }

        .progress-line {
          height: 9px;
          background: #e5e7eb;
          border-radius: 20px;
          overflow: hidden;
          margin: 10px 0;
        }

        .progress-line div {
          width: 72%;
          height: 100%;
          background: linear-gradient(90deg,#4268ff,#8a36e9);
          border-radius: 20px;
        }

        .dash-progress small {
          color: #64748b;
          font-size: 10px;
        }


        .section {
          padding: 85px 0;
        }

        .section-title {
          text-align: center;
          margin-bottom: 45px;
        }

        .section-title .tag {
          margin-bottom: 14px;
        }

        .section-title h2 {
          color: #15213d;
          font-size: 34px;
          letter-spacing: -1px;
        }

        .section-title p {
          color: #64748b;
          font-size: 13px;
          line-height: 1.8;
          max-width: 570px;
          margin: 14px auto 0;
        }


        .features {
          background: white;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 20px;
        }

        .feature-card {
          padding: 27px;
          border: 1px solid #e9ebf2;
          border-radius: 13px;
          transition: .25s;
          background: white;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          border-color: #c7c2ff;
          box-shadow: 0 12px 30px #1725540d;
        }

        .feature-icon {
          width: 49px;
          height: 49px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: #f0efff;
          font-size: 24px;
          margin-bottom: 20px;
        }

        .feature-card h3 {
          font-size: 16px;
          margin-bottom: 11px;
        }

        .feature-card p {
          color: #64748b;
          font-size: 12px;
          line-height: 1.8;
        }


        .workflow {
          background: #f8f9ff;
        }

        .workflow-grid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 20px;
        }

        .workflow-card {
          background: white;
          padding: 25px;
          border: 1px solid #e8eaf2;
          border-radius: 12px;
        }

        .workflow-number {
          font-size: 30px;
          font-weight: 800;
          color: #6756f4;
          margin-bottom: 17px;
        }

        .workflow-card h3 {
          font-size: 14px;
          margin-bottom: 10px;
        }

        .workflow-card p {
          color: #64748b;
          font-size: 12px;
          line-height: 1.8;
        }


        .tech-section {
          background: #081631;
          color: white;
          padding: 75px 0;
        }

        .tech-section .section-title h2 {
          color: white;
        }

        .tech-section .section-title p {
          color: #b6c2d9;
        }

        .tech-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px;
        }

        .tech-item {
          padding: 16px 24px;
          border: 1px solid #344463;
          border-radius: 10px;
          background: #122344;
          color: #e2e8f0;
          font-size: 13px;
          font-weight: 600;
          transition: .2s;
        }

        .tech-item:hover {
          border-color: #8b7cff;
          background: #1b2d54;
          transform: translateY(-3px);
        }


        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
        }

        .about-content h2 {
          font-size: 34px;
          color: #15213d;
          line-height: 1.3;
          margin-bottom: 18px;
        }

        .about-content p {
          color: #64748b;
          font-size: 13px;
          line-height: 1.9;
          margin-bottom: 15px;
        }

        .about-box {
          background: linear-gradient(140deg,#111e43,#392b83);
          color: white;
          padding: 35px;
          border-radius: 16px;
          box-shadow: 0 15px 35px #17255425;
        }

        .about-box h3 {
          font-size: 23px;
          margin-bottom: 16px;
        }

        .about-box p {
          font-size: 13px;
          color: #d4d9ed;
          line-height: 1.9;
        }

        .about-box .btn {
          margin-top: 23px;
        }


        .cta {
          padding: 65px 25px;
          text-align: center;
          border-radius: 17px;
          background: linear-gradient(110deg,#315cff,#772ce5);
          color: white;
          margin-bottom: 85px;
        }

        .cta h2 {
          font-size: 32px;
          margin-bottom: 13px;
        }

        .cta p {
          font-size: 13px;
          color: #e4e7ff;
          margin-bottom: 23px;
          line-height: 1.8;
        }

        .cta .btn {
          background: white;
          color: #5145dc;
        }


        .footer {
          background: #07142d;
          padding: 30px 5%;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .footer strong {
          font-size: 16px;
        }

        .footer p {
          font-size: 11px;
          color: #aab6cc;
          margin-top: 7px;
        }

        .footer-links {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .footer-links a {
          color: #cbd5e1;
          font-size: 12px;
        }

        @media(max-width: 850px) {
          .nav-links {
            gap: 15px;
          }

          .hero {
            gap: 30px;
          }

          .workflow-grid {
            grid-template-columns: repeat(2,1fr);
          }
        }

        @media(max-width: 650px) {
          .navbar {
            height: 68px;
          }

          .menu-btn {
            display: block;
          }

          .nav-links {
            display: none;
            position: absolute;
            top: 68px;
            left: 0;
            width: 100%;
            padding: 25px 5%;
            background: white;
            flex-direction: column;
            align-items: flex-start;
            box-shadow: 0 10px 20px #00000010;
          }

          .nav-links.open {
            display: flex;
          }

          .nav-buttons {
            display: none;
          }

          .mobile-auth {
            display: flex;
            gap: 10px;
            width: 100%;
            margin-top: 10px;
          }

          .mobile-auth .btn {
            flex: 1;
            text-align: center;
            padding: 13px 10px;
            font-size: 14px;
          }

          .hero {
            grid-template-columns: 1fr;
            padding: 65px 5%;
          }

          .hero h1 {
            font-size: 42px;
          }

          .section {
            padding: 65px 0;
          }

          .section-title h2 {
            font-size: 28px;
          }

          .feature-grid {
            grid-template-columns: repeat(2,1fr);
            gap: 12px;
          }

          .feature-card {
            padding: 18px;
          }

          .workflow-grid {
            grid-template-columns: 1fr 1fr;
          }

          .about-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .cta h2 {
            font-size: 25px;
          }

          .footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media(max-width: 400px) {
          .feature-grid {
            grid-template-columns: 1fr;
          }

          .workflow-grid {
            grid-template-columns: 1fr;
          }

          .hero h1 {
            font-size: 36px;
          }
        }
      `}</style>

      <div className="home">
        <nav className="navbar">
          <a href="/" className="logo">
            ✚ AI <span>Health</span>
          </a>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#features" onClick={() => setMenuOpen(false)}>
              Features
            </a>
            <a href="#workflow" onClick={() => setMenuOpen(false)}>
              How It Works
            </a>
            <a href="#technology" onClick={() => setMenuOpen(false)}>
              Technology
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>

            <div className="mobile-auth">
              <a
    href="/login"
    className="btn secondary"
    onClick={() => setMenuOpen(false)}
  >
                Login
              </a>
              <a
    href="/signup"
    className="btn primary"
    onClick={() => setMenuOpen(false)}
  >
                Signup
              </a>
            </div>
          </div>

          <div className="nav-buttons">
            <a href="/login" className="btn secondary">
              Login
            </a>
            <a href="/signup" className="btn primary">
              Get Started
            </a>
          </div>

          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "\u2715" : "\u2630"}
          </button>
        </nav>

        <section className="hero">
          <div>
            <span className="tag">AI-POWERED HEALTH MANAGEMENT</span>

            <h1>
              Take Control of Your
              <br />
              <span className="gradient">Health Journey</span>
              <br />
              with AI
            </h1>

            <p>
              An intelligent health management platform that helps users track
              nutrition, monitor daily habits, analyze health data and receive
              personalized AI-powered insights.
            </p>

            <div className="hero-actions">
              <a href="/signup" className="btn primary">
                Explore Application →
              </a>
              <a href="#features" className="btn secondary">
                Explore Features
              </a>
            </div>

            <div className="hero-note">
              Full-Stack MERN Application · AI Integration · Responsive UI
            </div>
          </div>

          <div className="dashboard">
            <div className="dash-top">
              <div>✚ AI Health Dashboard</div>
              <span>Overview · Today</span>
            </div>

            <div className="dash-welcome">
              <small>Welcome back,</small>
              <h3>Your Health Overview 👋</h3>
            </div>

            <div className="dash-grid">
              <div className="dash-card">
                <small>Body Mass Index</small>
                <strong>24.1</strong>
                <span>● Sample value</span>
              </div>

              <div className="dash-card">
                <small>Daily Calories</small>
                <strong>1,850</strong>
                <span>Nutrition tracking</span>
              </div>

              <div className="dash-card">
                <small>Water Intake</small>
                <strong>2.5 L</strong>
                <span>Daily hydration</span>
              </div>

              <div className="dash-card">
                <small>Health Reports</small>
                <strong>📊</strong>
                <span>Progress overview</span>
              </div>
            </div>

            <div className="dash-progress">
              <h4>Health Progress Preview</h4>
              <div className="progress-line">
                <div />
              </div>
              <small>Illustrative dashboard preview</small>
            </div>
          </div>
        </section>

        <section className="section features" id="features">
          <div className="container">
            <div className="section-title">
              <span className="tag">CORE FEATURES</span>
              <h2>Everything You Need for Better Health</h2>
              <p>
                Explore the key modules designed to simplify health tracking and
                provide useful insights.
              </p>
            </div>

            <div className="feature-grid">
              {features.map((feature, index) => <div className="feature-card" key={index}>
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>)}
            </div>
          </div>
        </section>

        <section className="section workflow" id="workflow">
          <div className="container">
            <div className="section-title">
              <span className="tag">APPLICATION WORKFLOW</span>
              <h2>How AI Health Advisor Works</h2>
              <p>
                A simple workflow to manage health information and make
                better-informed lifestyle decisions.
              </p>
            </div>

            <div className="workflow-grid">
              <div className="workflow-card">
                <div className="workflow-number">01</div>
                <h3>Create Your Account</h3>
                <p>Register and securely access your personal dashboard.</p>
              </div>

              <div className="workflow-card">
                <div className="workflow-number">02</div>
                <h3>Enter Health Data</h3>
                <p>Record nutrition, water intake and health metrics.</p>
              </div>

              <div className="workflow-card">
                <div className="workflow-number">03</div>
                <h3>Get AI Insights</h3>
                <p>Use AI-powered assistance for personalized guidance.</p>
              </div>

              <div className="workflow-card">
                <div className="workflow-number">04</div>
                <h3>Monitor Progress</h3>
                <p>Review reports and track your health journey.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="tech-section" id="technology">
          <div className="container">
            <div className="section-title">
              <span className="tag">TECHNICAL IMPLEMENTATION</span>
              <h2>Built With Modern Technologies</h2>
              <p>
                Developed using the MERN stack and modern web technologies to
                build a scalable full-stack application.
              </p>
            </div>

            <div className="tech-grid">
              {technologies.map((tech, index) => <div className="tech-item" key={index}>
                  {tech}
                </div>)}
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container about-grid">
            <div className="about-content">
              <span className="tag">ABOUT THE PROJECT</span>
              <h2>Making Health Management Smarter with Technology</h2>

              <p>
                AI Health Advisor is a full-stack web application designed to
                bring essential health tracking tools together in one platform.
              </p>

              <p>
                The project combines frontend development, backend API
                integration, database management, authentication and AI-assisted
                features to create a unified user experience.
              </p>

              <p>
                Its modular architecture makes it possible to extend the
                application with additional health and wellness features.
              </p>
            </div>

            <div className="about-box">
              <h3>
                One Platform.
                <br />
                Multiple Health Tools.
              </h3>
              <p>
                Track nutrition, monitor hydration, manage health records and
                explore personalized AI assistance through a single dashboard.
              </p>
              <a href="/login" className="btn primary">
                View Application →
              </a>
            </div>
          </div>
        </section>

        <section className="container">
          <div className="cta">
            <h2>Start Your Smarter Health Journey</h2>
            <p>
              Explore AI Health Advisor and experience a unified approach to
              health tracking.
            </p>
            <a href="/signup" className="btn">
              Get Started →
            </a>
          </div>
        </section>

        <footer className="footer">
          <div>
            <strong>✚ AI Health Advisor</strong>
            <p>Smart health management powered by technology.</p>
          </div>

          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#technology">Technology</a>
            <a href="#about">About Project</a>
            <a href="/login">Login</a>
          </div>

          <p>© 2026 AI Health Advisor. All rights reserved.</p>
        </footer>
      </div>
    </>;
}
export default Home;
