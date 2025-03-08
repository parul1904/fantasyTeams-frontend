import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-wrapper">
      <div className="about-container container card">
        <h1 className="about-title">Your Ultimate IPL 2025 Analysis Hub</h1>

        <p className="about-text lead">
          Welcome to <span className="fw-semibold">Fantasy Teams</span>, your
          go-to platform for expert analysis and insights to help you build the
          best possible team on various betting apps during IPL 2025. We are
          redefining the way you analyze cricket matches. Our platform provides
          <span className="fw-bold">
            {" "}
            data-driven insights, expert analysis, and strategic team-building
            recommendations
          </span>{" "}
          to help you make informed decisions on various betting apps during IPL
          2025.
        </p>

        <h2 className="about-heading h4">What We Do</h2>
        <p className="about-text">
          With the fast-paced nature of the IPL, staying ahead of the
          competition requires more than just gut feeling, because{" "}
          <span className="fw-bold">
            winning isn't just about luck — it’s about strategy. That’s where we
            come in!
          </span>{" "}
          We analyze player form, pitch conditions, matchups, head-to-head
          stats, and real-time trends to give you winning strategies for every
          match.
        </p>

        <h2 className="about-heading h4">Our Vision</h2>
        <p className="about-text">
          We aim to empower users with the best cricketing insights so they can
          make smart, strategic decisions in their fantasy leagues and betting
          platforms. Whether you’re a casual player or a seasoned pro, we’ve got
          you covered!
        </p>

        <h2 className="about-heading h4">What Sets Us Apart?</h2>
        <ul className="about-list list-unstyled">
          <li className="d-flex align-items-center">
            <span className="check-icon me-2">🏏</span>
            <strong>In-Depth Match Insights</strong> – Get access to pitch
            reports, head-to-head records, and performance trends.
          </li>
          <li className="d-flex align-items-center">
            <span className="check-icon me-2">🏏</span>
            <strong>Data-Backed Predictions</strong> – Our algorithms analyze
            past performances to predict potential outcomes.
          </li>
          <li className="d-flex align-items-center">
            <span className="check-icon me-2">🏏</span>
            <strong>Real-Time Updates</strong> – Stay ahead with live news on
            player injuries, last-minute changes, and form analysis.
          </li>
          <li className="d-flex align-items-center">
            <span className="check-icon me-2">🏏</span>
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
          game to chance. <br />
          <span className="fw-bold">
            {" "}
            Leverage our insights, sharpen your strategy, and make every match
            count!
          </span>
        </p>

        <p className="about-footer fw-bold">
          🔥🏏 Stay connected for daily match analysis, expert predictions, and
          the latest cricket trends. Let’s make this IPL season a winning one!
          🏏🔥
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
