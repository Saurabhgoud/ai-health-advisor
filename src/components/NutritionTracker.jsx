import { useState, useEffect } from "react";
import {
  FiSearch,
  FiPlus,
  FiTrash2,
  FiCoffee,
  FiSun,
  FiMoon,
  FiActivity,
  FiTarget,
  FiTrendingUp
} from "react-icons/fi";
import api from "../api/axios";
import "./NutritionTracker.css";
function NutritionTracker() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mealType, setMealType] = useState("breakfast");
  const [meals, setMeals] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [foodSearchQuery, setFoodSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const dailyGoals = {
    calories: 2200,
    protein: 120,
    carbs: 250,
    fats: 70
  };
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await api.get("/nutrition/meals");
        setMeals(response.data.meals || []);
      } catch (error) {
        console.error("Fetch Meals Error:", error);
      }
    };
    fetchMeals();
  }, []);
  const totalNutrition = meals.reduce(
    (total, meal) => ({
      calories: total.calories + Number(meal.calories || 0),
      protein: total.protein + Number(meal.protein || 0),
      carbs: total.carbs + Number(meal.carbs || 0),
      fats: total.fats + Number(meal.fats || 0)
    }),
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    }
  );
  const handleFoodSearch = async (e) => {
    e.preventDefault();
    if (!foodSearchQuery.trim()) {
      alert("Please enter a food name");
      return;
    }
    try {
      setLoading(true);
      setSearchResults([]);
      const response = await api.get("/nutrition/search", {
        params: {
          query: foodSearchQuery.trim()
        }
      });
      setSearchResults(response.data.foods || []);
    } catch (error) {
      console.error("Food Search Error:", error);
      alert(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  const handleSelectFood = (food) => {
    setSelectedFood(food);
    setFoodName(food.foodName || "");
    setCalories(String(food.calories ?? 0));
    setProtein(String(food.protein ?? 0));
    setCarbs(String(food.carbs ?? 0));
    setFats(String(food.fats ?? 0));
    setQuantity("1");
  };
  const handleAddMeal = async (event) => {
    event.preventDefault();
    if (!foodName.trim() || calories === "" || protein === "" || carbs === "" || fats === "" || quantity === "") {
      alert("Please fill all food details.");
      return;
    }
    const servingQuantity = Number(quantity);
    if (!Number.isFinite(servingQuantity) || servingQuantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }
    const mealData = {
      foodName: foodName.trim(),
      calories: Number(calories) * servingQuantity,
      protein: Number(protein) * servingQuantity,
      carbs: Number(carbs) * servingQuantity,
      fats: Number(fats) * servingQuantity,
      quantity: servingQuantity,
      mealType,
      date: (new Date()).toLocaleDateString("en-CA")
    };
    try {
      setSaving(true);
      await api.post("/nutrition/meals", mealData);
      const response = await api.get("/nutrition/meals");
      setMeals(response.data.meals || []);
      setFoodName("");
      setCalories("");
      setProtein("");
      setCarbs("");
      setFats("");
      setQuantity("1");
      setSelectedFood(null);
      alert("Meal saved successfully!");
    } catch (error) {
      console.error("Save Meal Error:", error);
      alert(
        error.response?.data?.message || error.message || "Unable to save meal. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };
  const handleDeleteMeal = async (id) => {
    try {
      await api.delete(`/nutrition/meals/${id}`);
      setMeals(
        (previousMeals) => previousMeals.filter((meal) => (meal._id || meal.id) !== id)
      );
    } catch (error) {
      console.error("Delete Meal Error:", error);
      alert(error.response?.data?.message || "Unable to delete meal.");
    }
  };
  const filteredMeals = meals.filter(
    (meal) => (meal.foodName || "").toLowerCase().includes(searchQuery.toLowerCase())
  );
  const getProgress = (current, goal) => {
    return Math.min(current / goal * 100, 100);
  };
  const mealCategories = [
    {
      id: "breakfast",
      label: "Breakfast",
      icon: FiCoffee
    },
    {
      id: "lunch",
      label: "Lunch",
      icon: FiSun
    },
    {
      id: "dinner",
      label: "Dinner",
      icon: FiMoon
    },
    {
      id: "snack",
      label: "Snacks",
      icon: FiActivity
    }
  ];
  return <section className="nutrition-tracker">
      <div className="nutrition-heading">
        <div>
          <span>HEALTH & FITNESS</span>
          <h2>Nutrition Tracker</h2>
          <p>Track your daily food and nutrition intake.</p>
        </div>

        <div className="nutrition-date">
          <FiTarget />
          <span>Daily Nutrition</span>
        </div>
      </div>

      <div className="nutrition-calorie-card">
        <div className="calorie-card-info">
          <span>DAILY CALORIES</span>
          <h2>{totalNutrition.calories.toFixed(0)}</h2>
          <p>Out of {dailyGoals.calories} kcal daily goal</p>

          <div className="nutrition-progress-track">
            <div
    className="nutrition-progress-fill"
    style={{
      width: `${getProgress(
        totalNutrition.calories,
        dailyGoals.calories
      )}%`
    }}
  />
          </div>

          <small>
            {Math.max(dailyGoals.calories - totalNutrition.calories, 0).toFixed(
    0
  )}{" "}
            kcal remaining
          </small>
        </div>

        <div className="calorie-card-icon">
          <FiTrendingUp />
        </div>
      </div>

      <div className="nutrition-macro-grid">
        {[
    {
      name: "Protein",
      value: totalNutrition.protein,
      goal: dailyGoals.protein,
      unit: "g",
      className: "protein"
    },
    {
      name: "Carbs",
      value: totalNutrition.carbs,
      goal: dailyGoals.carbs,
      unit: "g",
      className: "carbs"
    },
    {
      name: "Fats",
      value: totalNutrition.fats,
      goal: dailyGoals.fats,
      unit: "g",
      className: "fats"
    }
  ].map((macro) => <div
    className={`nutrition-macro-card ${macro.className}`}
    key={macro.name}
  >
            <span>{macro.name}</span>

            <h3>
              {macro.value.toFixed(1)}
              <small>
                {" "}
                / {macro.goal} {macro.unit}
              </small>
            </h3>

            <div className="nutrition-progress-track">
              <div
    className="nutrition-progress-fill"
    style={{
      width: `${getProgress(macro.value, macro.goal)}%`
    }}
  />
            </div>
          </div>)}
      </div>

      <div className="nutrition-content-grid">
        <div className="nutrition-add-card">
          <div className="nutrition-section-heading">
            <div>
              <h3>Add Food</h3>
              <p>Enter your food nutrition details.</p>
            </div>

            <FiPlus />
          </div>

          <div className="meal-type-selector">
            {mealCategories.map((category) => {
    const MealIcon = category.icon;
    return <button
      type="button"
      key={category.id}
      className={mealType === category.id ? "active" : ""}
      onClick={() => setMealType(category.id)}
    >
                  <MealIcon />
                  {category.label}
                </button>;
  })}
          </div>

          <div className="nutrition-form-field">
            <label>Search Food</label>

            <div className="nutrition-search">
              <FiSearch />

              <input
    type="text"
    placeholder="Search food..."
    value={foodSearchQuery}
    onChange={(e) => setFoodSearchQuery(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleFoodSearch(e);
      }
    }}
  />

              <button
    type="button"
    onClick={handleFoodSearch}
    disabled={loading}
  >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>

            {searchResults.length > 0 && <div className="nutrition-food-list">
                {searchResults.map((food) => <button
    type="button"
    key={food.fdcId}
    className="nutrition-food-item"
    onClick={() => handleSelectFood(food)}
    style={{
      width: "100%",
      textAlign: "left",
      cursor: "pointer",
      border: "none"
    }}
  >
                    <div className="food-item-icon">
                      <FiCoffee />
                    </div>

                    <div className="food-item-info">
                      <h4>{food.foodName}</h4>

                      <span>
                        {food.servingSize || 100}
                        {food.servingSizeUnit || "g"}
                      </span>

                      <small>
                        Protein: {food.protein}g · Carbs: {food.carbs}g · Fats:{" "}
                        {food.fats}g
                      </small>
                    </div>

                    <div className="food-item-calories">
                      <strong>{food.calories}</strong>
                      <small>kcal</small>
                    </div>
                  </button>)}
              </div>}

            {searchResults.length === 0 && !loading && foodSearchQuery.trim() !== "" && <></>}
          </div>

          <form onSubmit={handleAddMeal}>
            <div className="nutrition-form-field">
              <label>Food Name</label>
              <input
    type="text"
    placeholder="e.g. Banana"
    value={foodName}
    onChange={(event) => setFoodName(event.target.value)}
  />
            </div>

            <div className="nutrition-form-field">
              <label>Quantity / Servings</label>
              <input
    type="number"
    min="0.1"
    step="0.1"
    value={quantity}
    onChange={(event) => setQuantity(event.target.value)}
  />
            </div>

            <div className="nutrition-form-row">
              <div className="nutrition-form-field">
                <label>Calories (kcal)</label>
                <input
    type="number"
    min="0"
    step="any"
    placeholder="105"
    value={calories}
    onChange={(event) => setCalories(event.target.value)}
  />
              </div>

              <div className="nutrition-form-field">
                <label>Protein (g)</label>
                <input
    type="number"
    min="0"
    step="any"
    placeholder="1.3"
    value={protein}
    onChange={(event) => setProtein(event.target.value)}
  />
              </div>

              <div className="nutrition-form-field">
                <label>Carbs (g)</label>
                <input
    type="number"
    min="0"
    step="any"
    placeholder="27"
    value={carbs}
    onChange={(event) => setCarbs(event.target.value)}
  />
              </div>

              <div className="nutrition-form-field">
                <label>Fats (g)</label>
                <input
    type="number"
    min="0"
    step="any"
    placeholder="0.4"
    value={fats}
    onChange={(event) => setFats(event.target.value)}
  />
              </div>
            </div>

            <button
    type="submit"
    className="nutrition-add-button"
    disabled={saving}
  >
              <FiPlus />
              {saving ? "Saving..." : "Add Food to Tracker"}
            </button>
          </form>
        </div>

        <div className="nutrition-history-card">
          <div className="nutrition-section-heading">
            <div>
              <h3>Today's Meals</h3>
              <p>Your recorded food intake.</p>
            </div>

            <span>{meals.length} Items</span>
          </div>

          <div className="nutrition-search">
            <FiSearch />

            <input
    type="text"
    placeholder="Search added foods..."
    value={searchQuery}
    onChange={(event) => setSearchQuery(event.target.value)}
  />
          </div>

          <div className="nutrition-food-list">
            {filteredMeals.length === 0 ? <div className="nutrition-empty-state">
                <FiCoffee />
                <h4>No meals found</h4>
                <p>Add your first food to start tracking.</p>
              </div> : filteredMeals.map((meal) => <div className="nutrition-food-item" key={meal._id || meal.id}>
                  <div className="food-item-icon">
                    <FiCoffee />
                  </div>

                  <div className="food-item-info">
                    <h4>{meal.foodName}</h4>

                    <span>
                      {meal.mealType} · {meal.quantity} serving(s)
                    </span>

                    <small>
                      P: {Number(meal.protein || 0).toFixed(1)}g · C:{" "}
                      {Number(meal.carbs || 0).toFixed(1)}g · F:{" "}
                      {Number(meal.fats || 0).toFixed(1)}g
                    </small>
                  </div>

                  <div className="food-item-calories">
                    <strong>{Number(meal.calories || 0).toFixed(0)}</strong>
                    <small>kcal</small>
                  </div>

                  <button
    type="button"
    className="food-delete-button"
    onClick={() => handleDeleteMeal(meal._id || meal.id)}
    aria-label={`Delete ${meal.foodName}`}
  >
                    <FiTrash2 />
                  </button>
                </div>)}
          </div>
        </div>
      </div>
    </section>;
}
export default NutritionTracker;
