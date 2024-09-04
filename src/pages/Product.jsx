import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="/img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About tripPins.</h2>
          <p>
          Your go-to platform for pinning and sharing your travel adventures with ease. Start mapping your journeys and sharing your stories today!
          </p>
         
        </div>
      </section>
    </main>
  );
}
