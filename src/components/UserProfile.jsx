import { useEffect, useState } from "react";
import api from "../api/axios.js";
import "./UserProfile.css";
function UserProfile() {
  const [profileData, setProfileData] = useState({
    age: "",
    gender: "prefer-not-to-say",
    heightCm: "",
    weightKg: "",
    activityLevel: "sedentary",
    fitnessGoal: "general-fitness",
    dietPreference: "vegetarian",
    dailyWaterGoalLitres: "3",
    sleepGoalHours: "8",
    allergies: "",
    medicalConditions: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((previousData) => ({
      ...previousData,
      [name]: value
    }));
    setError("");
    setSuccessMessage("");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    if (!profileData.age || !profileData.heightCm || !profileData.weightKg) {
      setError("Age, height and weight are required.");
      return;
    }
    try {
      setLoading(true);
      const response = await api.put("/profile/me", {
        age: Number(profileData.age),
        gender: profileData.gender,
        heightCm: Number(profileData.heightCm),
        weightKg: Number(profileData.weightKg),
        activityLevel: profileData.activityLevel,
        fitnessGoal: profileData.fitnessGoal,
        dietPreference: profileData.dietPreference,
        dailyWaterGoalLitres: Number(profileData.dailyWaterGoalLitres),
        sleepGoalHours: Number(profileData.sleepGoalHours),
        allergies: profileData.allergies.split(",").map((item) => item.trim()).filter(Boolean),
        medicalConditions: profileData.medicalConditions.split(",").map((item) => item.trim()).filter(Boolean)
      });
      console.log("Profile response:", response.data);
      setSuccessMessage(response.data.message || "Profile saved successfully.");
    } catch (requestError) {
      console.error("Profile save error:", requestError);
      setError(
        requestError.response?.data?.message || "Could not save the profile."
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile/me");
        console.log("Fetched profile response:", response.data);
        const savedProfile = response.data.profile;
        if (!savedProfile) {
          console.log("Profile not found in the database");
          return;
        }
        setProfileData({
          age: savedProfile.age ?? "",
          gender: savedProfile.gender || "prefer-not-to-say",
          heightCm: savedProfile.heightCm ?? "",
          weightKg: savedProfile.weightKg ?? "",
          activityLevel: savedProfile.activityLevel || "sedentary",
          fitnessGoal: savedProfile.fitnessGoal || "general-fitness",
          dietPreference: savedProfile.dietPreference || "vegetarian",
          dailyWaterGoalLitres: savedProfile.dailyWaterGoalLitres ?? "3",
          sleepGoalHours: savedProfile.sleepGoalHours ?? "8",
          allergies: Array.isArray(savedProfile.allergies) ? savedProfile.allergies.join(", ") : "",
          medicalConditions: Array.isArray(savedProfile.medicalConditions) ? savedProfile.medicalConditions.join(", ") : ""
        });
      } catch (requestError) {
        console.error("Profile fetch complete error:", requestError);
        console.log("Backend profile error:", requestError.response?.data);
        setError(
          requestError.response?.data?.message || "Could not fetch the saved profile."
        );
      } finally {
        setFetchingProfile(false);
      }
    };
    fetchProfile();
  }, []);
  return <section className="user-profile-section">
      <div className="user-profile-heading">
        <h2>Complete Your Health Profile</h2>

        <p>Enter your personal health and fitness information.</p>
      </div>

      {error && <p className="profile-error-message">{error}</p>}

      {successMessage && <p className="profile-success-message">{successMessage}</p>}

      <form className="user-profile-form" onSubmit={handleSubmit}>
        <div className="profile-form-field">
          <label htmlFor="age">Age</label>

          <input
    id="age"
    type="number"
    name="age"
    min="1"
    max="120"
    placeholder="Enter your age"
    value={profileData.age}
    onChange={handleChange}
  />
        </div>

        <div className="profile-form-field">
          <label htmlFor="gender">Gender</label>

          <select
    id="gender"
    name="gender"
    value={profileData.gender}
    onChange={handleChange}
  >
            <option value="male">Male</option>

            <option value="female">Female</option>

            <option value="other">Other</option>

            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>

        <div className="profile-form-field">
          <label htmlFor="heightCm">Height in centimetres</label>

          <input
    id="heightCm"
    type="number"
    name="heightCm"
    min="50"
    max="250"
    placeholder="Example: 173"
    value={profileData.heightCm}
    onChange={handleChange}
  />
        </div>

        <div className="profile-form-field">
          <label htmlFor="weightKg">Weight in kilograms</label>

          <input
    id="weightKg"
    type="number"
    name="weightKg"
    min="10"
    max="500"
    step="0.1"
    placeholder="Example: 68"
    value={profileData.weightKg}
    onChange={handleChange}
  />
        </div>

        <div className="profile-form-field">
          <label htmlFor="activityLevel">Activity Level</label>

          <select
    id="activityLevel"
    name="activityLevel"
    value={profileData.activityLevel}
    onChange={handleChange}
  >
            <option value="sedentary">Sedentary</option>

            <option value="light">Lightly Active</option>

            <option value="moderate">Moderately Active</option>

            <option value="active">Active</option>

            <option value="very-active">Very Active</option>
          </select>
        </div>

        <div className="profile-form-field">
          <label htmlFor="fitnessGoal">Fitness Goal</label>

          <select
    id="fitnessGoal"
    name="fitnessGoal"
    value={profileData.fitnessGoal}
    onChange={handleChange}
  >
            <option value="weight-loss">Weight Loss</option>

            <option value="weight-gain">Weight Gain</option>

            <option value="maintain-weight">Maintain Weight</option>

            <option value="muscle-gain">Muscle Gain</option>

            <option value="general-fitness">General Fitness</option>
          </select>
        </div>

        <div className="profile-form-field">
          <label htmlFor="dietPreference">Diet Preference</label>

          <select
    id="dietPreference"
    name="dietPreference"
    value={profileData.dietPreference}
    onChange={handleChange}
  >
            <option value="vegetarian">Vegetarian</option>

            <option value="non-vegetarian">Non-Vegetarian</option>

            <option value="vegan">Vegan</option>

            <option value="eggetarian">Eggetarian</option>

            <option value="other">Other</option>
          </select>
        </div>

        <div className="profile-form-field">
          <label htmlFor="dailyWaterGoalLitres">
            Daily Water Goal (Litres)
          </label>

          <input
    id="dailyWaterGoalLitres"
    type="number"
    name="dailyWaterGoalLitres"
    min="0.5"
    max="10"
    step="0.1"
    value={profileData.dailyWaterGoalLitres}
    onChange={handleChange}
  />
        </div>

        <div className="profile-form-field">
          <label htmlFor="sleepGoalHours">Sleep Goal (Hours)</label>

          <input
    id="sleepGoalHours"
    type="number"
    name="sleepGoalHours"
    min="1"
    max="16"
    step="0.5"
    value={profileData.sleepGoalHours}
    onChange={handleChange}
  />
        </div>

        <div className="profile-form-field profile-full-width">
          <label htmlFor="allergies">Allergies</label>

          <textarea
    id="allergies"
    name="allergies"
    placeholder="Example: Peanuts, Milk, Dust"
    value={profileData.allergies}
    onChange={handleChange}
  />
        </div>

        <div className="profile-form-field profile-full-width">
          <label htmlFor="medicalConditions">Medical Conditions</label>

          <textarea
    id="medicalConditions"
    name="medicalConditions"
    placeholder="Example: Asthma, Diabetes"
    value={profileData.medicalConditions}
    onChange={handleChange}
  />
        </div>

        <button
    type="submit"
    className="profile-save-button"
    disabled={loading}
  >
          {loading ? "Saving Profile..." : "Save Profile"}
        </button>
      </form>
    </section>;
}
export default UserProfile;
