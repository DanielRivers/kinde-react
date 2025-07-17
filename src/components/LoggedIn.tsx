import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { LogoutLink, PortalLink } from "@kinde-oss/kinde-auth-react/components";
import { useCallback } from "react";
import React from "react";

export default function LoggedIn() {
  const { user, getClaims, getClaim, getPermission, getFlag, getUserProfile, login } = useKindeAuth();

  const showClaims = useCallback(async (token: 'idToken' | 'accessToken' | undefined) => {
    const claims = await getClaims<{id_address: string}>(token);
    console.log(claims);
  }, [getClaims]);

  const showPermissions = useCallback(async () => {
    const claims = await getPermission("payments:create");
    console.log(claims);
  }, [getPermission]);

  const showFlag = useCallback(async () => {

    const flags = (
      await getClaim<{ feature_flags: string }, Record<string, { t: "b" | "i" | "s"; v: string }>>("feature_flags")
    )?.value;
    const claims = await getFlag<boolean>("testing");
    console.log(claims);
  }, [getFlag]);

  const showtUserProfile = useCallback(async () => {
    const claims = await getUserProfile();
    console.log(claims);
  }, [getUserProfile]);

  const doLogin = useCallback(async () => {
    await login({
      redirectUri: window.location.origin,
      
    }
    );
  }, [login])

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
                {user?.givenName} {user?.familyName}
              </p>
              <PortalLink>Account</PortalLink>
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
            <button onClick={() => showClaims('accessToken')} className="btn btn-light">Show access claims</button>
            <button onClick={() => showClaims('idToken')} className="btn btn-light">Show id token claims</button>
            <button onClick={showPermissions} className="btn btn-light">Show permissions</button>
            <button onClick={showFlag} className="btn btn-light">Show flag</button>
            <button onClick={showtUserProfile} className="btn btn-light">show user</button>
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
