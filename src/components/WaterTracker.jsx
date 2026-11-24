import { useEffect, useState } from "react";
import {
  FiDroplet,
  FiPlus,
  FiTarget,
  FiTrash2,
  FiActivity
} from "react-icons/fi";
import api from "../api/axios.js";
import "./WaterTracker.css";
function WaterTracker({ profile }) {
  const [entries, setEntries] = useState([]);
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const goalLitres = Number(profile?.dailyWaterGoalLitres || 0);
  const dailyGoal = goalLitres > 0 ? goalLitres * 1e3 : 0;
  const currentDate = (new Date()).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const fetchWaterHistory = async () => {
    try {
      setError("");
      const response = await api.get("/water");
      setEntries(response.data.entries || []);
    } catch (requestError) {
      console.error("Water History Error:", requestError);
      setError(
        requestError.response?.data?.message || "Could not load water history."
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWaterHistory();
  }, []);
  const totalWater = entries.reduce(
    (total, entry) => total + Number(entry.amountMl || 0),
    0
  );
  const remainingWater = Math.max(dailyGoal - totalWater, 0);
  const progress = dailyGoal > 0 ? Math.min(totalWater / dailyGoal * 100, 100) : 0;
  const addWater = async (amount) => {
    const waterAmount = Number(amount);
    if (!Number.isFinite(waterAmount) || waterAmount <= 0) {
      alert("Please enter a valid water quantity.");
      return;
    }
    try {
      setSaving(true);
      setError("");
      await api.post("/water", {
        amountMl: waterAmount
      });
      setCustomAmount("");
      await fetchWaterHistory();
    } catch (requestError) {
      console.error("Add Water Error:", requestError);
      setError(
        requestError.response?.data?.message || "Could not save water intake."
      );
    } finally {
      setSaving(false);
    }
  };
  const deleteEntry = async (id) => {
    try {
      setError("");
      await api.delete(`/water/${id}`);
      setEntries(
        (previousEntries) => previousEntries.filter((entry) => entry._id !== id)
      );
    } catch (requestError) {
      console.error("Delete Water Error:", requestError);
      setError(
        requestError.response?.data?.message || "Could not delete the water entry."
      );
    }
  };
  return <section className="water-tracker">
      <div className="water-heading" style={{ justifyContent: "flex-end" }}>
        <div className="water-date">
          <FiDroplet />
          <span>{currentDate}</span>
        </div>
      </div>

      {error && <p className="profile-error-message">{error}</p>}

      <div className="water-main-card">
        <div className="water-main-info">
          <span>DAILY WATER INTAKE</span>

          <h2>
            {totalWater.toLocaleString("en-IN")}
            <small> ml</small>
          </h2>

          <p>
            Daily goal:{" "}
            {dailyGoal > 0 ? `${dailyGoal.toLocaleString("en-IN")} ml` : "Not set"}
          </p>

          <div className="water-progress-track">
            <div
    className="water-progress-fill"
    style={{ width: `${progress}%` }}
  />
          </div>

          <div className="water-progress-details">
            <span>
              {dailyGoal > 0 ? `${progress.toFixed(0)}% completed` : "Set your goal in Profile"}
            </span>

            <span>
              {dailyGoal > 0 ? `${remainingWater.toLocaleString("en-IN")} ml remaining` : "Goal not available"}
            </span>
          </div>
        </div>

        <div className="water-main-icon">
          <FiDroplet />
        </div>
      </div>

      <div className="water-content-grid">
        <div className="water-add-card">
          <div className="water-section-heading">
            <div>
              <h3>Add Water</h3>
              <p>Select how much water you drank.</p>
            </div>

            <FiPlus />
          </div>

          <div className="water-quick-buttons">
            <button
    type="button"
    disabled={saving}
    onClick={() => addWater(250)}
  >
              <FiDroplet />
              <strong>+250 ml</strong>
              <span>1 Glass</span>
            </button>

            <button
    type="button"
    disabled={saving}
    onClick={() => addWater(500)}
  >
              <FiDroplet />
              <strong>+500 ml</strong>
              <span>2 Glasses</span>
            </button>

            <button
    type="button"
    disabled={saving}
    onClick={() => addWater(750)}
  >
              <FiDroplet />
              <strong>+750 ml</strong>
              <span>3 Glasses</span>
            </button>
          </div>

          <div className="water-custom-section">
            <label>Custom Water Amount (ml)</label>

            <div className="water-custom-input">
              <input
    type="number"
    min="1"
    placeholder="Enter amount in ml"
    value={customAmount}
    disabled={saving}
    onChange={(event) => setCustomAmount(event.target.value)}
    onKeyDown={(event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addWater(customAmount);
      }
    }}
  />

              <button
    type="button"
    disabled={saving || !customAmount || Number(customAmount) <= 0}
    onClick={() => addWater(customAmount)}
  >
                <FiPlus />
                {saving ? "Saving..." : "Add Water"}
              </button>
            </div>
          </div>

          <div className="water-goal-info">
            <FiTarget />

            <div>
              <strong>Daily Hydration Goal</strong>

              <span>
                {dailyGoal > 0 ? `Your Profile goal is ${goalLitres} litres (${dailyGoal.toLocaleString("en-IN")} ml) per day.` : "Please set your daily water goal in your Profile."}
              </span>
            </div>
          </div>
        </div>

        <div className="water-history-card">
          <div className="water-section-heading">
            <div>
              <h3>Today's Water History</h3>
              <p>Your recorded water intake.</p>
            </div>

            <span>{entries.length} Entries</span>
          </div>

          <div className="water-history-list">
            {loading ? <div className="water-empty-state">
                <p>Loading water history...</p>
              </div> : entries.length === 0 ? <div className="water-empty-state">
                <FiDroplet />
                <h4>No water recorded yet</h4>
                <p>Add your first glass of water to get started.</p>
              </div> : entries.map((entry) => <div className="water-history-item" key={entry._id}>
                  <div className="water-history-icon">
                    <FiDroplet />
                  </div>

                  <div className="water-history-info">
                    <strong>
                      {Number(entry.amountMl).toLocaleString("en-IN")} ml
                    </strong>

                    <span>
                      {new Date(entry.recordedAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  })}
                    </span>
                  </div>

                  <button
    type="button"
    className="water-delete-button"
    onClick={() => deleteEntry(entry._id)}
    aria-label="Delete water entry"
  >
                    <FiTrash2 />
                  </button>
                </div>)}
          </div>

          <div className="water-history-total">
            <FiActivity />
            <span>Total consumed today</span>

            <strong>{totalWater.toLocaleString("en-IN")} ml</strong>
          </div>
        </div>
      </div>
    </section>;
}
export default WaterTracker;
