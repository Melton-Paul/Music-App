import React from "react";
import styles from "./MostRecent.module.css";
import SmallCard from "../SongCards/SmallCard/SmallCard";

export default function MostRecent() {
  return (
    <section>
      <h2>Your Recents</h2>
      <article className={styles.mostrecent}>
        <SmallCard
          img="https://i.scdn.co/image/ab67616d0000b2730748978f463f71da8b4486ad"
          name="He Got A Gun"
        />
        <SmallCard
          img="https://i.scdn.co/image/ab67616d0000b2730748978f463f71da8b4486ad"
          name="He Got A Gun"
        />
        <SmallCard
          img="https://i.scdn.co/image/ab67616d0000b2730748978f463f71da8b4486ad"
          name="He Got A Gun"
        />
        <SmallCard
          img="https://i.scdn.co/image/ab67616d0000b2730748978f463f71da8b4486ad"
          name="He Got A Gun"
        />
      </article>
    </section>
  );
}
