const FOOD_API_URL = "https://api.nal.usda.gov/fdc/v1";
export const searchFoods = async (foodName) => {
  const apiKey = process.env.FDC_API_KEY;
  if (!apiKey) {
    throw new Error("USDA API key is missing");
  }
  const params = new URLSearchParams({
    query: foodName,
    pageSize: "10",
    api_key: apiKey
  });
  const response = await fetch(`${FOOD_API_URL}/foods/search?${params}`);
  if (!response.ok) {
    throw new Error(`Food API request failed: ${response.status}`);
  }
  const data = await response.json();
  return (data.foods || []).map((food) => {
    const nutrients = food.foodNutrients || [];
    const getNutrient = (id) => {
      const nutrient = nutrients.find((item) => Number(item.nutrientId) === id);
      return nutrient?.value ?? 0;
    };
    return {
      fdcId: food.fdcId,
      foodName: food.description,
      dataType: food.dataType,
      servingSize: food.servingSize ?? null,
      servingSizeUnit: food.servingSizeUnit ?? null,
      calories: getNutrient(1008),
      protein: getNutrient(1003),
      carbs: getNutrient(1005),
      fats: getNutrient(1004)
    };
  });
};
