import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  FiActivity,
  FiMoon,
  FiTrendingDown,
  FiTrendingUp
} from "react-icons/fi";
import api from "../api/axios.js";
import "./HealthProgressChart.css";
const rangeOptions = [
  {
    label: "7 Days",
    value: 7
  },
  {
    label: "30 Days",
    value: 30
  },
  {
    label: "3 Months",
    value: 90
  },
  {
    label: "6 Months",
    value: 180
  }
];
function HealthProgressChart() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRange, setSelectedRange] = useState(30);
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/health-history");
        setHistory(response.data.history || []);
      } catch (requestError) {
        console.error("Health history fetch error:", requestError);
        setError(
          requestError.response?.data?.message || "Could not fetch health history."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);
  const chartData = useMemo(() => {
    const now = new Date();
    const rangeStart = new Date();
    rangeStart.setDate(now.getDate() - selectedRange);
    return history.filter((item) => {
      const recordDate = new Date(item.recordedAt);
      return recordDate >= rangeStart;
    }).map((item) => ({
      ...item,
      date: new Date(item.recordedAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short"
      })
    }));
  }, [history, selectedRange]);
  const latest = chartData.length > 0 ? chartData[chartData.length - 1] : null;
  const previous = chartData.length > 1 ? chartData[chartData.length - 2] : null;
  const getDifference = (currentValue, previousValue) => {
    if (currentValue === null || currentValue === void 0 || previousValue === null || previousValue === void 0) {
      return null;
    }
    return Number((Number(currentValue) - Number(previousValue)).toFixed(1));
  };
  const weightDifference = getDifference(latest?.weightKg, previous?.weightKg);
  const bmiDifference = getDifference(latest?.bmi, previous?.bmi);
  const sleepDifference = getDifference(
    latest?.sleepGoalHours,
    previous?.sleepGoalHours
  );
  if (loading) {
    return <section className="health-progress-card">
        <p className="health-progress-loading">Loading health progress...</p>
      </section>;
  }
  if (error) {
    return <section className="health-progress-card">
        <p className="health-progress-error">{error}</p>
      </section>;
  }
  return <section className="health-progress-card">
      <div className="health-progress-header">
        <div className="health-progress-title-area">
          <div className="health-progress-main-icon">
            <FiActivity />
          </div>

          <div>
            <span className="health-progress-eyebrow">Progress analytics</span>

            <h2>Health Progress</h2>

            <p>Track your body weight, BMI and sleep goal over time.</p>
          </div>
        </div>

        <div className="health-progress-legend">
          <span>
            <i className="legend-dot weight-dot" />
            Body Weight
          </span>

          <span>
            <i className="legend-dot bmi-dot" />
            BMI
          </span>

          <span>
            <i className="legend-dot sleep-dot" />
            Sleep Goal
          </span>
        </div>
      </div>

      {chartData.length === 0 ? <div className="health-progress-empty">
          <h3>No progress history yet</h3>

          <p>Your health progress will appear here after you update your profile.</p>
        </div> : <>
          <div className="health-progress-summary">
            <article className="progress-summary-card weight-summary-card">
              <div className="progress-summary-icon weight-summary-icon">⚖</div>

              <div className="progress-summary-content">
                <span>Body Weight</span>

                <strong>
                  {latest?.weightKg ?? "--"}

                  <small>kg</small>
                </strong>
              </div>

              <div className="progress-summary-change">
                {weightDifference !== null && <>
                    <span
    className={weightDifference <= 0 ? "progress-change positive-change" : "progress-change warning-change"}
  >
                      {weightDifference <= 0 ? <FiTrendingDown /> : <FiTrendingUp />}
                      {Math.abs(weightDifference)} kg
                    </span>

                    <small>vs last update</small>
                  </>}
              </div>
            </article>

            <article className="progress-summary-card bmi-summary-card">
              <div className="progress-summary-icon bmi-summary-icon">
                <FiActivity />
              </div>

              <div className="progress-summary-content">
                <span>BMI</span>

                <strong>{latest?.bmi ?? "--"}</strong>
              </div>

              <div className="progress-summary-change">
                {bmiDifference !== null && <>
                    <span
    className={bmiDifference <= 0 ? "progress-change positive-change" : "progress-change warning-change"}
  >
                      {bmiDifference <= 0 ? <FiTrendingDown /> : <FiTrendingUp />}

                      {Math.abs(bmiDifference)}
                    </span>

                    <small>vs last update</small>
                  </>}
              </div>
            </article>

            <article className="progress-summary-card sleep-summary-card">
              <div className="progress-summary-icon sleep-summary-icon">
                <FiMoon />
              </div>

              <div className="progress-summary-content">
                <span>Sleep Goal</span>

                <strong>
                  {latest?.sleepGoalHours ?? "--"}

                  <small>hrs</small>
                </strong>
              </div>

              <div className="progress-summary-change">
                {sleepDifference !== null && <>
                    <span className="progress-change sleep-change">
                      {sleepDifference >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                      {Math.abs(sleepDifference)} hrs
                    </span>

                    <small>vs last update</small>
                  </>}
              </div>
            </article>
          </div>

          <div className="health-progress-chart-shell">
            <div className="chart-axis-labels">
              <span className="weight-axis-label">Weight (kg)</span>

              <span className="sleep-axis-label">Sleep (hrs)</span>
            </div>

            <div className="health-progress-chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
    data={chartData}
    margin={{
      top: 18,
      right: 40,
      left: 20,
      bottom: 16
    }}
  >
                  <defs>
                    <linearGradient
    id="weightGradient"
    x1="0"
    y1="0"
    x2="0"
    y2="1"
  >
                      <stop offset="0%" stopColor="#10b39c" stopOpacity={0.2} />

                      <stop offset="100%" stopColor="#10b39c" stopOpacity={0} />
                    </linearGradient>

                    <linearGradient
    id="bmiGradient"
    x1="0"
    y1="0"
    x2="0"
    y2="1"
  >
                      <stop
    offset="0%"
    stopColor="#f34886"
    stopOpacity={0.18}
  />

                      <stop offset="100%" stopColor="#f34886" stopOpacity={0} />
                    </linearGradient>

                    <linearGradient
    id="sleepGradient"
    x1="0"
    y1="0"
    x2="0"
    y2="1"
  >
                      <stop
    offset="0%"
    stopColor="#7048f5"
    stopOpacity={0.18}
  />

                      <stop offset="100%" stopColor="#7048f5" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
    stroke="#e5ebf4"
    strokeDasharray="5 5"
    vertical
  />

                  <XAxis
    dataKey="date"
    axisLine={false}
    tickLine={false}
    tick={{
      fill: "#6c7b93",
      fontSize: 11
    }}
    tickMargin={10}
  />

                  <YAxis
    yAxisId="weight"
    orientation="left"
    axisLine={false}
    tickLine={false}
    width={40}
    domain={["dataMin - 2", "dataMax + 2"]}
    tick={{
      fill: "#5e6e87",
      fontSize: 10
    }}
  />

                  <YAxis
    yAxisId="bmi"
    hide
    domain={["dataMin - 1", "dataMax + 1"]}
  />

                  <YAxis
    yAxisId="sleep"
    orientation="right"
    axisLine={false}
    tickLine={false}
    width={42}
    domain={["dataMin - 1", "dataMax + 1"]}
    tick={{
      fill: "#5e6e87",
      fontSize: 10
    }}
  />

                  <Tooltip
    cursor={{
      stroke: "#9ba8bd",
      strokeDasharray: "4 4"
    }}
    contentStyle={{
      border: "1px solid #dfe6f1",
      borderRadius: "12px",
      background: "#ffffff",
      boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
      padding: "10px 12px"
    }}
    labelStyle={{
      color: "#14233e",
      fontWeight: 700
    }}
    formatter={(value, name) => {
      if (name === "Body Weight") {
        return [`${value} kg`, name];
      }
      if (name === "Sleep Goal") {
        return [`${value} hrs`, name];
      }
      return [value, name];
    }}
  />

                  <Area
    yAxisId="weight"
    type="monotone"
    dataKey="weightKg"
    name="Body Weight"
    stroke="#10b39c"
    strokeWidth={3}
    fill="url(#weightGradient)"
    dot={{
      r: 4,
      fill: "#ffffff",
      stroke: "#10b39c",
      strokeWidth: 2
    }}
    activeDot={{
      r: 6
    }}
  />

                  <Area
    yAxisId="bmi"
    type="monotone"
    dataKey="bmi"
    name="BMI"
    stroke="#f34886"
    strokeWidth={3}
    fill="url(#bmiGradient)"
    dot={{
      r: 4,
      fill: "#ffffff",
      stroke: "#f34886",
      strokeWidth: 2
    }}
    activeDot={{
      r: 6
    }}
  />

                  <Area
    yAxisId="sleep"
    type="monotone"
    dataKey="sleepGoalHours"
    name="Sleep Goal"
    stroke="#7048f5"
    strokeWidth={3}
    fill="url(#sleepGradient)"
    dot={{
      r: 4,
      fill: "#ffffff",
      stroke: "#7048f5",
      strokeWidth: 2
    }}
    activeDot={{
      r: 6
    }}
  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="health-progress-range-buttons">
              {rangeOptions.map((range) => <button
    key={range.value}
    type="button"
    className={selectedRange === range.value ? "range-button range-button-active" : "range-button"}
    onClick={() => {
      setSelectedRange(range.value);
    }}
  >
                  {range.label}
                </button>)}
            </div>
          </div>
        </>}
    </section>;
}
export default HealthProgressChart;
