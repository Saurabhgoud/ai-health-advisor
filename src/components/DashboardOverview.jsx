import { useEffect, useState } from "react";
import {
  FiActivity,
  FiBarChart2,
  FiDroplet,
  FiMoon,
  FiZap
} from "react-icons/fi";
import api from "../api/axios.js";
import "./DashboardOverview.css";
function DashboardOverview({ profile, loading, error }) {
  const [todayMeals, setTodayMeals] = useState(null);
  useEffect(() => {
    let cancelled = false;
    api.get("/nutrition/meals").then((response) => {
      if (cancelled) {
        return;
      }
      const today = new Date().toLocaleDateString("en-CA");
      const todaysMeals = (response.data.meals || []).filter((meal) => {
        return meal.date && new Date(meal.date).toLocaleDateString("en-CA") === today;
      });
      setTodayMeals({
        totalCalories: todaysMeals.reduce((sum, meal) => sum + Number(meal.calories || 0), 0),
        count: todaysMeals.length
      });
    }).catch(() => {
      if (!cancelled) {
        setTodayMeals({ totalCalories: 0, count: 0 });
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);
  if (loading) {
    return <section className="dashboard-overview">
        <p>Loading health overview...</p>
      </section>;
  }
  if (error) {
    return <section className="dashboard-overview">
        <p className="profile-error-message">{error}</p>
      </section>;
  }
  const heightInMetres = profile?.heightCm ? profile.heightCm / 100 : 0;
  const bmiValue = heightInMetres && profile?.weightKg ? (profile.weightKg / (heightInMetres * heightInMetres)).toFixed(1) : "--";
  let bmiStatus = "Not available";
  if (bmiValue !== "--") {
    const numericBmi = Number(bmiValue);
    if (numericBmi < 18.5) {
      bmiStatus = "Underweight";
    } else if (numericBmi < 25) {
      bmiStatus = "Normal";
    } else if (numericBmi < 30) {
      bmiStatus = "Overweight";
    } else {
      bmiStatus = "High";
    }
  }
  const bmiProgress = bmiValue === "--" ? null : Math.min(Math.round(Number(bmiValue) / 40 * 100), 100);
  const dailyCalorieGoal = 2200;
  const todayCalories = todayMeals ? todayMeals.totalCalories : 0;
  const todayMealCount = todayMeals ? todayMeals.count : 0;
  const caloriesProgress = todayCalories > 0 ? Math.min(Math.round(todayCalories / dailyCalorieGoal * 100), 100) : null;
  const healthCards = [
    {
      id: "bmi",
      title: "Body Mass Index",
      value: bmiValue,
      unit: "BMI",
      status: bmiStatus,
      description: bmiValue === "--" ? "Complete your profile to calculate BMI." : `Calculated using ${profile.heightCm} cm height and ${profile.weightKg} kg weight.`,
      progress: bmiProgress,
      footerLabel: "BMI range position",
      icon: FiActivity,
      className: "bmi-card"
    },
    {
      id: "calories",
      title: "Daily Calories",
      value: todayCalories > 0 ? todayCalories.toLocaleString() : "--",
      unit: "kcal",
      status: todayCalories > 0 ? "Tracked" : "Not tracked",
      description: todayCalories > 0 ? `${todayMealCount} meal${todayMealCount === 1 ? "" : "s"} logged today.` : "No meals logged today yet. Add a meal in Nutrition Tracker.",
      progress: caloriesProgress,
      footerLabel: todayCalories > 0 ? "Daily goal 2,200 kcal" : "",
      icon: FiZap,
      className: "calories-card"
    },
    {
      id: "water",
      title: "Daily Water Goal",
      value: profile?.dailyWaterGoalLitres ?? "--",
      unit: "litres",
      status: profile?.dailyWaterGoalLitres ? "Configured" : "Missing",
      description: profile?.dailyWaterGoalLitres ? "Water goal loaded from your health profile." : "Add your water goal in Profile.",
      progress: null,
      footerLabel: "",
      icon: FiDroplet,
      className: "water-card"
    },
    {
      id: "sleep",
      title: "Sleep Goal",
      value: profile?.sleepGoalHours ?? "--",
      unit: "hours",
      status: profile?.sleepGoalHours ? "Configured" : "Missing",
      description: profile?.sleepGoalHours ? "Sleep goal loaded from your health profile." : "Add your sleep goal in Profile.",
      progress: null,
      footerLabel: "",
      icon: FiMoon,
      className: "sleep-card"
    },
    {
      id: "weight",
      title: "Current Weight",
      value: profile?.weightKg ?? "--",
      unit: "kg",
      status: profile?.weightKg ? "Recorded" : "Missing",
      description: profile?.weightKg ? "Weight loaded from your health profile." : "Add your weight in Profile.",
      progress: null,
      footerLabel: "",
      icon: FiBarChart2,
      className: "weight-card"
    }
  ];
  return <section className="dashboard-overview">
      <div className="overview-heading">
        <div>
          <span>Today&apos;s summary</span>
          <h2>Health Overview</h2>
        </div>

        <p>Your latest health information</p>
      </div>

      <div className="overview-card-grid">
        {healthCards.map((card) => {
    const IconComponent = card.icon;
    return <article
      key={card.id}
      className={`health-summary-card ${card.className}`}
    >
              <div className="summary-card-top">
                <div className="summary-card-icon">
                  <IconComponent />
                </div>

                <span className="summary-card-status">{card.status}</span>
              </div>

              <div className="summary-card-content">
                <p>{card.title}</p>

                <h3>
                  {card.value}
                  <span>{card.unit}</span>
                </h3>

                <small>{card.description}</small>
              </div>

              {card.progress !== null && <>
                  <div className="summary-progress-track">
                    <div
      className="summary-progress-value"
      style={{
        width: `${card.progress}%`
      }}
    />
                  </div>

                  <div className="summary-card-footer">
                    <span>{card.footerLabel}</span>

                    <strong>{card.progress}%</strong>
                  </div>
                </>}
            </article>;
  })}
      </div>
    </section>;
}
export default DashboardOverview;
