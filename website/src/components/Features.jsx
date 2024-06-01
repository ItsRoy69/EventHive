import React from "react";

import assets from "../assets";
import styles from "../styles/Global";

const FeatureCard = ({ iconUrl, iconText }) => (
  <div className={styles.featureCard}>
    <img src={iconUrl} alt="icon" className={styles.featureImg} />
    <p className={styles.featureText}>{iconText}</p>
  </div>
);

const Features = () => {
  return (
    <div className={`${styles.section} ${styles.bgPrimary} banner03`}>
      <div className={`${styles.subSection} flex-col text-center`}>
        <div>
          <h1 className={`${styles.h1Text} ${styles.whiteText}`}>
            Technologies
          </h1>
          <p className={`${styles.pText} ${styles.whiteText}`}>
            EventHive has been developed using a cross-platform technology, React
            Native.
          </p>
        </div>

        <div className={styles.flexWrap}>
          <FeatureCard iconUrl={assets.figma} iconText="Figma" />
          <FeatureCard iconUrl={assets.react} iconText="React Native" />
          <FeatureCard iconUrl={assets.javascript} iconText="JavaScript" />
          <FeatureCard iconUrl={assets.tailwind} iconText="Tailwind CSS" />
          <FeatureCard iconUrl={assets.node} iconText="Node Js" />
          <FeatureCard iconUrl={assets.express} iconText="Express Js" />
          <FeatureCard iconUrl={assets.mongodb} iconText="MongoDB" />
        </div>
      </div>
    </div>
  );
};

export default Features;
