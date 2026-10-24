import { Link, useNavigate } from "react-router";
import { clearStudentSession, getStudentSession } from "../lib/authSession";

export default function AccountPage() {
  const account = getStudentSession();
  const navigate = useNavigate();

  function handleSignOut() {
    clearStudentSession();
    navigate("/login", { replace: true });
  }

  return (
    <main className="account-page">
      <header className="page-heading">
        <p className="eyebrow">Your profile</p>
        <h1>Account</h1>
        <p>View your account details and profile information.</p>
      </header>

      {account ? (
        <section className="account-card" aria-labelledby="profile-heading">
          <div className="profile-header">
            <div className="avatar" aria-hidden="true">
              {account.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 id="profile-heading">{account.name}</h2>
              <p>Student account</p>
            </div>
          </div>
          <div className="details">
            <div className="detail-row"><span className="detail-label">Full name</span><span>{account.name}</span></div>
            <div className="detail-row"><span className="detail-label">Email address</span><span>{account.email}</span></div>
            <div className="detail-row"><span className="detail-label">Student ID</span><span>{account.id}</span></div>
          </div>
          <div className="account-actions">
            <button type="button" className="signout-button" onClick={handleSignOut}>Sign out</button>
          </div>
        </section>
      ) : (
        <section className="account-card account-empty">
          <p>You’re not signed in.</p>
          <Link to="/login">Sign in to view your account</Link>
        </section>
      )}

      <style>{`
        .account-page { box-sizing: border-box; width: min(100% - 2rem, 760px); margin: 0 auto; padding: 3.5rem 0; color: #172033; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
        .page-heading { margin-bottom: 2rem; }
        .page-heading h1 { margin: 0; font-size: clamp(2rem, 5vw, 2.5rem); letter-spacing: -0.04em; }
        .page-heading > p:last-child { margin: .6rem 0 0; color: #667085; }
        .eyebrow { margin: 0 0 .5rem; color: #5967d8; font-size: .75rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
        .account-card { overflow: hidden; border: 1px solid #e5e7eb; border-radius: 16px; background: #fff; box-shadow: 0 8px 28px rgb(16 24 40 / 6%); }
        .account-empty { padding: 1.75rem; }
        .profile-header { display: flex; align-items: center; gap: 1rem; padding: 1.75rem; background: #f8f9fc; border-bottom: 1px solid #e5e7eb; }
        .avatar { display: grid; width: 56px; height: 56px; flex: 0 0 56px; place-items: center; border-radius: 50%; background: #e8eaff; color: #4e5ac7; font-weight: 700; }
        .profile-header h2 { margin: 0; font-size: 1.15rem; }
        .profile-header p { margin: .3rem 0 0; color: #667085; font-size: .9rem; }
        .details { padding: 0 1.75rem; }
        .detail-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; min-height: 64px; border-bottom: 1px solid #eef0f3; font-size: .92rem; }
        .detail-row:last-child { border-bottom: 0; }
        .account-actions { display: flex; justify-content: flex-end; padding: 1rem 1.75rem; border-top: 1px solid #eef0f3; }
        .signout-button { border: 1px solid #d1d5db; border-radius: 8px; padding: .6rem .9rem; background: #fff; color: #b42318; font: inherit; font-weight: 600; cursor: pointer; }
        .signout-button:hover { background: #fff5f4; }
        .signout-button:focus-visible { outline: 2px solid #b42318; outline-offset: 2px; }
        .detail-label { color: #667085; }
        @media (max-width: 480px) { .account-page { padding: 2rem 0; } .profile-header { padding: 1.25rem; } .details { padding: 0 1.25rem; } .account-actions { padding: 1rem 1.25rem; } .detail-row { align-items: flex-start; flex-direction: column; justify-content: center; gap: .35rem; padding: .8rem 0; } }
      `}</style>
    </main>
  );
}