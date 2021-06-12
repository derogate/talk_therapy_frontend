import React from "react";
import cx from "classnames";

import BodyQA from "./BodyQA";
import Card from "./Card";

import logo from "../assets/img/yoga.svg";

const Body = () => {
  return (
    <div
      className={cx(
        "container-fluid d-flex flex-column align-items-center justify-content-around p-md-5"
      )}
    >
      <div className="d-flex flex-row align-items-center justify-content-around pb-5 mb-3">
        <div>
          <h1 className="mb-0">
            Welcome to <span className="text-primary">Mindful.BN</span>
          </h1>
          <p className="text-secondary">Here for you. Always.</p>
          <button type="button" className="btn btn-primary btn-lg">
            <a
              className="text-white text-decoration-none"
              href="http://localhost:3000/login"
            >
              Chat Now
            </a>
          </button>
        </div>
        <div>
          <img
            src={logo}
            alt="cartoon lady doing yoga"
            className="img-fluid"
            width={300}
          />
        </div>
      </div>
      <div className="d-flex flex-column border-secondary border-top text-center pt-5 p-md-5">
        <BodyQA className="mb-3" question="What is Mindful.BN?">
          <span className="text-primary">Mindful.BN</span> is a platform to
          improve your mental health online via community-based mental
          healthcare and recovery with the help of a Bruneian mental health
          organization, <span className="text-primary">Mindful.BN</span>.
        </BodyQA>
        <BodyQA question="Why Mindful.BN?">
          Our counsellors will listen to your problems and help provide support
          online. <br />
          We respect your privacy, we value your anonymity and we maintain
          confidentiality at all times. <br />
          We are here to be with you and guide you on how to cope and manage
          your emotions and problems. <br />
          In <span className="text-primary">Mindful.BN</span>, you have the
          freedom to express yourself in a safe zone and we are ready to listen
          and provide support. <br />
          If you feel alone and want to talk to someone, you are free to
          register and start chatting with our experienced counsellors, with no
          fees required.
        </BodyQA>
        <BodyQA question="Disclaimer">
          <span className="text-primary">Mindful.BN</span> is not a substitute
          for getting professional psychological, therapy or counselling help.
          Please consult your nearest health centre to seek proper help or call
          the hotline provided below.
        </BodyQA>
      </div>
      <Card
        title="Clinical Psychology Division, 2nd Floor, RIPAS"
        className="mb-2"
      >
        Call: 2240162 / 7212697
      </Card>
      <Card title="Community Psychology Division, Anggerek Desa">
        Call: 2333214 / 8699614
      </Card>
    </div>
  );
};

export default Body;
