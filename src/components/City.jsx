import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import { Timestamp } from "firebase/firestore";

const formatDate = (date) => {
  if (!date) return "Date not available";

  // Check if date is a Firestore Timestamp and convert it
  if (date instanceof Timestamp) {
    date = date.toDate();
  }

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) return "Invalid date";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(parsedDate);
};



function City() {

  
  const {id} = useParams()
  const {getCity , currentCity , isLoading} = useCities()
  
  
  useEffect(function() {
    getCity(id);
  },[id,getCity])
  
  const { cityName, emoji, date, notes } = currentCity;
// console.log("City data:", currentCity);
  if(isLoading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
