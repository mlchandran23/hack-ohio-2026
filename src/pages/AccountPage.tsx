import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router";
import { updateStudentProfile } from "../lib/api/projects";
import { clearStudentSession, getStudentSession, setStudentSession, type StudentSession } from "../lib/authSession";

export default function AccountPage() {
  const [account, setAccount] = useState(getStudentSession);
  const [major, setMajor] = useState(account?.major ?? "");
  const [bio, setBio] = useState(account?.bio ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleProfileSave(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!account) return;

    setIsSaving(true);
    setSaveError(null);
    setSaveMessage(null);
    try {
      const updatedStudent = await updateStudentProfile(account.id, { major, bio });
      const updatedAccount: StudentSession = {
        ...account,
        major: updatedStudent.major,
        bio: updatedStudent.bio,
      };
      setStudentSession(updatedAccount);
      setAccount(updatedAccount);
      setMajor(updatedStudent.major ?? "");
      setBio(updatedStudent.bio ?? "");
      setSaveMessage("Your profile has been updated.");
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Unable to update your profile.");
    } finally {
      setIsSaving(false);
    }
  }

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
          <form className="profile-form" onSubmit={handleProfileSave}>
            <h3>Profile information</h3>
            <label htmlFor="account-major">Major</label>
            <input
              id="account-major"
              name="major"
              type="text"
              maxLength={120}
              placeholder="Add your major"
              value={major}
              onChange={(event) => setMajor(event.target.value)}
            />
            <label htmlFor="account-bio">Bio</label>
            <textarea
              id="account-bio"
              name="bio"
              rows={4}
              maxLength={1000}
              placeholder="Tell others a little about yourself"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            />
            {saveError && <p className="profile-form-error" role="alert">{saveError}</p>}
            {saveMessage && <p className="profile-form-success" role="status">{saveMessage}</p>}
            <div className="account-actions">
              <button type="submit" className="save-profile-button" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save profile"}
              </button>
              <button type="button" className="signout-button" onClick={handleSignOut}>Sign out</button>
            </div>
          </form>
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
        .profile-form { display: grid; gap: .6rem; padding: 1.25rem 1.75rem; border-top: 1px solid #eef0f3; }
        .profile-form h3 { margin: 0 0 .25rem; font-size: 1rem; }
        .profile-form label { color: #667085; font-size: .9rem; font-weight: 600; }
        .profile-form input, .profile-form textarea { box-sizing: border-box; width: 100%; padding: .7rem .8rem; border: 1px solid #d1d5db; border-radius: 8px; color: #172033; font: inherit; }
        .profile-form textarea { resize: vertical; }
        .profile-form input:focus-visible, .profile-form textarea:focus-visible { outline: 2px solid #5967d8; outline-offset: 2px; }
        .profile-form-error, .profile-form-success { margin: 0; font-size: .9rem; }
        .profile-form-error { color: #b42318; }
        .profile-form-success { color: #15803d; }
        .account-actions { display: flex; justify-content: flex-end; gap: .75rem; padding-top: .5rem; }
        .save-profile-button { border: 0; border-radius: 8px; padding: .6rem .9rem; background: #4e5ac7; color: #fff; font: inherit; font-weight: 600; cursor: pointer; }
        .save-profile-button:hover { background: #3f4bb5; }
        .save-profile-button:disabled { cursor: wait; opacity: .7; }
        .save-profile-button:focus-visible { outline: 2px solid #5967d8; outline-offset: 2px; }
        .signout-button { border: 1px solid #d1d5db; border-radius: 8px; padding: .6rem .9rem; background: #fff; color: #b42318; font: inherit; font-weight: 600; cursor: pointer; }
        .signout-button:hover { background: #fff5f4; }
        .signout-button:focus-visible { outline: 2px solid #b42318; outline-offset: 2px; }
        .detail-label { color: #667085; }
        @media (max-width: 480px) { .account-page { padding: 2rem 0; } .profile-header { padding: 1.25rem; } .details { padding: 0 1.25rem; } .profile-form { padding: 1.25rem; } .account-actions { flex-wrap: wrap; padding: .5rem 0 0; } .detail-row { align-items: flex-start; flex-direction: column; justify-content: center; gap: .35rem; padding: .8rem 0; } }
      `}</style>
    </main>
  );
}