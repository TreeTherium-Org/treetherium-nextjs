"use client";
import Section from "../../component/layouts/Section.js";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./textstyle.module.css";

const Landowners = () => {
  return (
    <Section allNotification={false} searchPopup={true} title={"Landowners"}>
      <div className="pd-top-36">
        <div className="container">
          <h3 className="form-title">&quot;tokenize your land now&quot;</h3>
        </div>
      </div>
      <div className={styles.card}>
        <Image
          className={styles.cardImgTop}
          src="/assets/img/landowners.png"
          alt="Tree Image"
          width={600} 
          height={253}
          layout="responsive" 
          priority={true} 
        />
        <div className={styles.cardBody}>
          <div className={styles.divider} />
          <p className={styles.paragraph}>Welcome, Land Owners</p>
          <p className={styles.paragraph}>
            We invite landowners to join TreeTherium and make their land
            available for tree-planting projects. With TreeTherium, you can help
            the environment while benefiting from the trees planted on your
            land.
          </p>
          <p className={styles.title}>How to Plant Your Land</p>
          <p className={styles.paragraph}>
            Getting started is simple! Join TreeTherium, register your land, and
            we’ll guide you through the process of bringing new life to your
            land with tree-planting projects.
          </p>
          <p className={styles.title}>Land NFT</p>
          <p className={styles.paragraph}>
            Each plot of land will receive a unique NFT. This digital
            certificate verifies ownership of your land within the TreeTherium
            platform, helping track tree growth and rewards.
          </p>
          <p className={styles.title}>Land Planting Rewards</p>
          <p className={styles.paragraph}>
            Earn 10 $SEEDZ tokens for making your land available for tree
            planting. These tokens represent your contribution to global
            reforestation.
          </p>
          <p className={styles.title}>Planted Tree Rewards</p>
          <p className={styles.paragraph}>
            As a landowner, you’ll receive rewards equivalent to 15% of the
            trees planted on your land, adding value with every new tree.
          </p>
          <p className={styles.title}>Benefits for $SEEDZ Token Holders</p>
          <p className={styles.paragraph}>
            Owning $SEEDZ tokens grants access to our DAO (decentralized
            autonomous organization, the entity which governs TreeTherium) ,
            where you can participate in decisions shaping TreeTherium’s future.
            Together, we’re building a green community.
          </p>
          <p className={styles.title}>Land Ownership and Tree Benefits</p>
          <p className={styles.paragraph}>
            As the landowner, you retain ownership of both the land and the
            trees, including the trees’ economic value, such as fruits, seeds,
            and timber.
          </p>
          <p className={styles.title}>Data Sharing</p>
          <p className={styles.paragraphLast}>
            You’ll receive detailed data on all planted trees on your land,
            empowering you with insights into their growth, species, and
            environmental impact.
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <Link href="/my-forest">
            <button className={styles.button}>Plant Land Today</button>
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default Landowners;