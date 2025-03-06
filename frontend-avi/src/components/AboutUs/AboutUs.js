import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-wrapper d-flex align-items-center justify-content-center">
      <div className="about-container container text-center p-4">
        <h1 className="about-title display-4 fw-bold">About Us</h1>

        <h2 className="about-subtitle h4 fw-semibold">
          Your Ultimate IPL 2025 Analysis Hub
        </h2>
        <p className="about-text lead">
          At <strong>[Your App Name]</strong>, we are redefining the way you
          analyze cricket matches. Our platform provides
          <strong>
            {" "}
            data-driven insights, expert analysis, and strategic team-building
            recommendations
          </strong>{" "}
          to help you make informed decisions on various betting apps during{" "}
          <strong>IPL 2025</strong>.
        </p>

        <h2 className="about-heading h4">Our Mission</h2>
        <p className="about-text">
          We believe that{" "}
          <strong>winning isn't just about luck—it’s about strategy</strong>.
          Our mission is to
          <strong>
            {" "}
            equip users with top-tier insights, player stats, and match
            predictions
          </strong>{" "}
          so they can build winning teams with confidence.
        </p>

        <h2 className="about-heading h4">What Sets Us Apart?</h2>
        <ul className="about-list list-unstyled">
          <li className="d-flex align-items-center">
            <span className="check-icon me-2">✔</span>{" "}
            <strong>In-Depth Match Insights</strong> – Get access to pitch
            reports, head-to-head records, and performance trends.
          </li>
          <li className="d-flex align-items-center">
            <span className="check-icon me-2">✔</span>{" "}
            <strong>Data-Backed Predictions</strong> – Our algorithms analyze
            past performances to predict potential outcomes.
          </li>
          <li className="d-flex align-items-center">
            <span className="check-icon me-2">✔</span>{" "}
            <strong>Real-Time Updates</strong> – Stay ahead with live news on
            player injuries, last-minute changes, and form analysis.
          </li>
          <li className="d-flex align-items-center">
            <span className="check-icon me-2">✔</span>{" "}
            <strong>Expert-Curated Strategies</strong> – Hand-picked
            recommendations to help you maximize your chances of success.
          </li>
        </ul>

        <h2 className="about-heading h4">Our Approach</h2>
        <p className="about-text">
          We blend <strong>technology and cricket expertise</strong> to deliver
          analysis that is both <strong>accurate and easy to understand</strong>
          . Whether you're a seasoned bettor or just starting out, our platform
          ensures you have the <strong>right data at the right time</strong>.
        </p>

        <h2 className="about-heading h4">Join the Winning Team</h2>
        <p className="about-text">
          With IPL 2025 set to be an action-packed tournament, don’t leave your
          game to chance.
          <strong>
            {" "}
            Leverage our insights, sharpen your strategy, and make every match
            count!
          </strong>
        </p>

        <p className="about-footer fw-bold text-warning">
          Stay connected for{" "}
          <strong>
            daily match analysis, expert predictions, and the latest cricket
            trends
          </strong>
          . Let’s make this IPL season a winning one! 🏏🔥
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
