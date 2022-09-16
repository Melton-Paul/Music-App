import React from "react";
import styles from "./SimilarSongs.module.css";
import MediumCard from "../SongCards/MediumCard/MediumCard";

export default function SimilarSongs() {
  return (
    <section>
      <h2>Similar to what you listen to</h2>
      <article className={styles.similarSongs}>
        <MediumCard
          img="https://i.scdn.co/image/ab67616d0000b2730748978f463f71da8b4486ad"
          name="He Got A Gun"
          desc="New album by Bizarre"
        />
        <MediumCard
          img="https://i.scdn.co/image/ab67616d0000b2730748978f463f71da8b4486ad"
          name="He Got A Gun"
          desc="New album by Bizarre"
        />
        <MediumCard
          img="https://i.scdn.co/image/ab67616d0000b2730748978f463f71da8b4486ad"
          name="He Got A Gun"
          desc="New album by Bizarre"
        />
        <MediumCard
          img="https://i.scdn.co/image/ab67616d0000b2730748978f463f71da8b4486ad"
          name="He Got A Gun"
          desc="New album by Bizarre"
        />
        <MediumCard
          img="https://i.scdn.co/image/ab67616d0000b2730748978f463f71da8b4486ad"
          name="He Got A Gun"
          desc="New album by Bizarre"
        />
      </article>
    </section>
  );
}
