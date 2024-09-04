import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useContext } from "react";

import { db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        // const res = await fetch(`${BASE_URL}/cities`);
        // const data = await res.json();

        const citiesCollection = collection(db, "cities");
        const citiesSnapshot = await getDocs(citiesCollection);
        const data = citiesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error fetching cities",
        });
      }
    }

    fetchCities();
  }, []);
  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      try {
        dispatch({ type: "loading" });
        // const res = await fetch(`${BASE_URL}/cities/${id}`);
        // const data = await res.json();
        // dispatch({ type: "city/loaded", payload: data });

        const cityDoc = doc(db, "cities", id);
        const citySnapshot = await getDoc(cityDoc);
        if (citySnapshot.exists()) {
          dispatch({
            type: "city/loaded",
            payload: { id: citySnapshot.id, ...citySnapshot.data() },
          });
        } else {
          throw new Error("City not found");
        }
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading city data...",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      // const res = await fetch(`${BASE_URL}/cities`, {
      //   method: "POST",
      //   body: JSON.stringify(newCity),
      //   headers: {
      //     "COntent-type": "application/json",
      //   },
      // });
      // const data = await res.json();
      const docRef = await addDoc(collection(db, "cities"), newCity);
      dispatch({ type: "cities/created", payload: { id: docRef.id, ...newCity } });
      // dispatch({ type: "cities/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error add new city ... ",
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      // await fetch(`${BASE_URL}/cities/${id}`, {
      //   method: "DELETE",
      // });
      // dispatch({ type: "cities/deleted", payload: id });
      await deleteDoc(doc(db, "cities", id));
      dispatch({ type: "cities/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city data...",
      });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside provider");

  return context;
}
export { CitiesProvider, useCities };
