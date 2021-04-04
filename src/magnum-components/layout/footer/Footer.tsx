import "./Footer.scss";

export const Footer: React.FC = () => {
  return (
    <footer className="cmp-footer border-top">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4">
            <img
              className="brand-img"
              src={`${window.location.origin}/logo-180x180.png`}
              alt=""
            />
          </div>
          <div className="col-12 col-md-4"></div>
          <div className="col-12 col-md-4"></div>
        </div>
      </div>
      <div
        className="text-center p-3 text-light"
        style={{ backgroundColor: `#28292b` }}
      >
        © 2021 Copyright:
        <a className="text-light" href="https://mdbootstrap.com/">
          ShareBoard
        </a>
      </div>
    </footer>
  );
};
