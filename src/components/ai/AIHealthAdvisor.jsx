import { FiAlertCircle, FiCheck, FiCpu, FiTarget } from "react-icons/fi";
import AIChat from "./AIChat.jsx";
import "./AIHealthAdvisor.css";
function AIHealthAdvisor({ user, profile, profileLoading, onOpenProfile }) {
  const firstName = user?.name?.trim().split(" ")[0] || "User";
  const profileComplete = Boolean(
    profile?.age && profile?.heightCm && profile?.weightKg
  );
  const heightInMetres = profile?.heightCm ? profile.heightCm / 100 : 0;
  const bmi = heightInMetres && profile?.weightKg ? (profile.weightKg / (heightInMetres * heightInMetres)).toFixed(1) : "--";
  return <section className="ai-advisor-page">
      <div className="ai-advisor-hero">
        <div className="ai-advisor-hero-icon">
          <FiCpu />
        </div>

        <div className="ai-advisor-hero-text">
          <span>Your personalized wellness companion</span>

          <h2>Hi {firstName}, how can I help today?</h2>

          <p>
            Ask questions about nutrition, fitness, sleep and healthy habits.
          </p>
        </div>

        <div
    className={profileComplete ? "ai-profile-status ai-profile-complete" : "ai-profile-status ai-profile-incomplete"}
  >
          {profileComplete ? <FiCheck /> : <FiAlertCircle />}

          <div>
            <strong>
              {profileLoading ? "Checking profile..." : profileComplete ? "Profile connected" : "Profile incomplete"}
            </strong>

            <span>
              {profileComplete ? "Personalization is active" : "Complete it for better advice"}
            </span>
          </div>

          {!profileLoading && !profileComplete && <button type="button" onClick={onOpenProfile}>
              Complete profile
            </button>}
        </div>
      </div>

      <div className="ai-advisor-content-grid">
        <div className="ai-advisor-main-content">
          <AIChat />
        </div>

        <aside className="ai-profile-context">
          <div className="ai-context-heading">
            <h3>Your profile context</h3>

            <FiTarget />
          </div>

          <div className="ai-context-row">
            <span>Fitness goal</span>

            <strong>{profile?.fitnessGoal || "--"}</strong>
          </div>

          <div className="ai-context-row">
            <span>Diet</span>

            <strong>{profile?.dietPreference || "--"}</strong>
          </div>

          <div className="ai-context-row">
            <span>Activity</span>

            <strong>{profile?.activityLevel || "--"}</strong>
          </div>

          <div className="ai-context-row">
            <span>BMI</span>

            <strong>{bmi}</strong>
          </div>
        </aside>
      </div>
    </section>;
}
export default AIHealthAdvisor;
