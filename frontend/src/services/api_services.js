import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getAllShoppingList = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/get-all-shoppinglist-data`);

    return data;
  } catch (error) {
    console.log(`error in getting all shoppingList`);
    throw new Error(`Failed to fetch shopping list error: ${error}`);
  }
};

export const updateShoppingList = async (shoppingListId) => {
  try {
    const { data, status } = await axios.put(
      `${API_URL}/update-shoppinglist-data/${shoppingListId}`
    );

    return { data, status };
  } catch (error) {
    console.log(`error in updating shoppingList`);
    throw new Error(`Failed to update shopping list error: ${error}`);
  }
};
