import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-react/components";
import { useCallback } from "react";

export default function LoggedIn() {
  const { user, getClaims } = useKindeAuth();

  const showClaims = useCallback(async () => {
    const claims = await getClaims();
    console.log(claims);
  }, []);

  return (
    <>
      <header>
        <nav className="nav container">
          <h1 className="text-display-3">KindeAuth</h1>
          <div className="profile-blob">
            {user?.picture !== "" ? (
              <img
                className="avatar"
                src={user?.picture}
                alt="user profile avatar"
              />
            ) : (
              <div className="avatar">
                {user?.givenName?.[0]}
                {user?.familyName?.[1]}
              </div>
            )}
            <div>
              <p className="text-heading-2">
                {user?.given_name} {user?.familyName}
              </p>
              
              <LogoutLink className="text-subtle">Signs out</LogoutLink>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className="container">
          <div className="card start-hero">
            <p className="text-body-2 start-hero-intro">Woohoo!</p>
            <p className="text-display-2">
              Your authentication is all sorted.
              <br />
              Build the important stuff.
            </p>
            <button onClick={showClaims} className="btn btn-light">Show claims</button>
          </div>
          <section className="next-steps-section">
            <h2 className="text-heading-1">Next steps for you</h2>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <strong className="text-heading-2">KindeAuth</strong>
          <p className="footer-tagline text-body-3">
            Visit our{" "}
            <a className="link" href="https://kinde.com/docs">
              help center
            </a>
          </p>

          <small className="text-subtle">
            © 2023 KindeAuth, Inc. All rights reserved
          </small>
        </div>
      </footer>
    </>
  );
}
