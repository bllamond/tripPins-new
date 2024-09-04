// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>
            Simple pricing.
             
          </h2>
          <p>
          Just kidding—it's free! 🎉
            <br />
            <br />
          Ready to pin your adventures like a pro? Pack your virtual bags, and let's get pinning! 🌍📌
          </p>
        </div>
        <img src="/img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
