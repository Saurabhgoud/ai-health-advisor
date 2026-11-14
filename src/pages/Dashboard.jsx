import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WaterTracker from "../components/WaterTracker.jsx";
import api from "../api/axios.js";
import AIHealthAdvisor from "../components/ai/AIHealthAdvisor.jsx";
import DashboardOverview from "../components/DashboardOverview.jsx";
import HealthProgressChart from "../components/HealthProgressChart.jsx";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import UserProfile from "../components/UserProfile.jsx";
import HealthReport from "../components/HealthReport.jsx";
import NutritionTracker from "../components/NutritionTracker.jsx";
import "./Dashboard.css";
const sectionTitles = {
  dashboard: "Dashboard",
  "ai-advisor": "AI Health Advisor",
  "health-report": "Health Report",
  nutrition: "Nutrition Tracker",
  water: "Water Tracker",
  activity: "Activity",
  "fitness-goals": "Fitness Goals",
  analytics: "Analytics",
  sleep: "Sleep Tracker",
  "medical-records": "Medical Records",
  profile: "Profile",
  settings: "Settings"
};
function Dashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(() => {
    const savedSection = sessionStorage.getItem("activeDashboardSection");
    return savedSection && sectionTitles[savedSection] ? savedSection : "dashboard";
  });
  useEffect(() => {
    sessionStorage.setItem("activeDashboardSection", activeItem);
  }, [activeItem]);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState("");
  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setProfileLoading(false);
        navigate("/login", {
          replace: true
        });
        return;
      }
      try {
        const userResponse = await api.get("/auth/me");
        setUser(userResponse.data.user);
        try {
          const profileResponse = await api.get("/profile/me");
          setProfile(profileResponse.data.profile || null);
        } catch (profileRequestError) {
          console.error("Dashboard profile fetch error:", profileRequestError);
          if (profileRequestError.response?.status === 404) {
            setProfile(null);
          } else {
            setProfileError(
              profileRequestError.response?.data?.message || "Could not fetch the health profile."
            );
          }
        }
      } catch (requestError) {
        console.error("Current user fetch error:", requestError);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", {
          replace: true
        });
      } finally {
        setLoading(false);
        setProfileLoading(false);
      }
    };
    fetchDashboardData();
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("activeDashboardSection");
    navigate("/login", {
      replace: true
    });
  };
  const handleProfileUpdated = (updatedProfile) => {
    setProfile(updatedProfile);
    setProfileError("");
  };
  const currentSectionTitle = sectionTitles[activeItem] || "Dashboard";
  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }
  return <div className="dashboard-shell">
      <Sidebar
    isOpen={isSidebarOpen}
    activeItem={activeItem}
    onSelect={setActiveItem}
    onClose={() => {
      setIsSidebarOpen(false);
    }}
    onLogout={handleLogout}
  />

      <div className="dashboard-content-area">
        <Navbar
    user={user}
    onLogout={handleLogout}
    notificationCount={3}
    onMenuClick={() => {
      setIsSidebarOpen(true);
    }}
    onSettingsClick={() => {
      setActiveItem("settings");
    }}
  />

        <main className="dashboard-main-content">
          <section className="dashboard-page-heading">
            <div>
              <span>Health workspace</span>

              <h1>{currentSectionTitle}</h1>

              <p>Your personalized health information will appear here.</p>
            </div>

            <button
    type="button"
    onClick={() => {
      setActiveItem("profile");
    }}
  >
              Add health data
            </button>
          </section>

          {activeItem === "profile" ? <UserProfile
    profile={profile}
    onProfileUpdated={handleProfileUpdated}
  /> : activeItem === "water" ? <WaterTracker profile={profile} /> : activeItem === "health-report" ? <HealthReport /> : activeItem === "nutrition" ? <NutritionTracker /> : activeItem === "ai-advisor" ? <AIHealthAdvisor
    user={user}
    profile={profile}
    profileLoading={profileLoading}
    onOpenProfile={() => {
      setActiveItem("profile");
    }}
  /> : activeItem === "dashboard" ? <>
              <DashboardOverview
    profile={profile}
    loading={profileLoading}
    error={profileError}
  />

              <HealthProgressChart />
            </> : <section className="dashboard-empty-card">
              <div>
                <span>AI</span>
              </div>

              <h2>{currentSectionTitle}</h2>

              <p>This section is coming soon.</p>
            </section>}
        </main>
      </div>
    </div>;
}
export default Dashboard;
