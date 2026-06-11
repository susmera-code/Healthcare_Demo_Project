import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

// ── Inline styles ────────────────────────────────────────────────────────────
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inner: {
    width: "100%",
    maxWidth: "760px",
  },
  card: {
    background: "#FFFFFF",
    borderRadius: "12px",
    border: "0.5px solid #E5E7EB",
    overflow: "hidden",
  },
  cover: {
    background: "#2563A8",
    height: "80px",
    position: "relative",
  },
  avatar: {
    position: "absolute",
    bottom: "-36px",
    left: "1.5rem",
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: "#DBEAFE",
    border: "4px solid #FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
    fontWeight: 600,
    color: "#1E40AF",
    userSelect: "none",
  },
  body: {
    padding: "2.75rem 1.5rem 1.5rem",
  },
  nameRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "1.25rem",
  },
  activeBadge: {
    display: "inline-block",
    fontSize: "13px",
    fontWeight: 500,
    padding: "4px 12px",
    borderRadius: "20px",
    background: "#DCFCE7",
    color: "#166534",
  },
  editBtn: {
    fontSize: "15px",
    padding: "9px 18px",
    borderRadius: "10px",
    border: "1px solid #D1D5DB",
    background: "#FFFFFF",
    color: "#111827",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  divider: {
    height: "0.5px",
    background: "#E5E7EB",
    marginBottom: "1.25rem",
  },

  fieldsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.25rem",
  },
  fieldLabel: {
    fontSize: "17px",
    color: "#6B7280",
    margin: "0 0 5px",
  },
  fieldValue: {
    fontSize: "17px",
    color: "#111827",
    margin: 0,
  },
  input: {
    width: "100%",
    fontSize: "14px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #D1D5DB",
    outline: "none",
    color: "#111827",
    background: "#F9FAFB",
  },
  actionsRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "1.5rem",
  },
  cancelBtn: {
    fontSize: "14px",
    padding: "9px 18px",
    borderRadius: "10px",
    border: "1px solid #D1D5DB",
    background: "#FFFFFF",
    color: "#374151",
    cursor: "pointer",
  },
  saveBtn: {
    fontSize: "14px",
    padding: "9px 18px",
    borderRadius: "10px",
    border: "none",
    background: "#2563A8",
    color: "#FFFFFF",
    cursor: "pointer",
    fontWeight: 500,
  },
  saveBtnDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  errorBox: {
    fontSize: "13px",
    color: "#991B1B",
    background: "#FEE2E2",
    border: "0.5px solid #FCA5A5",
    borderRadius: "8px",
    padding: "10px 14px",
    marginTop: "1rem",
  },
 
  loadingState: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    fontSize: "15px",
    color: "#6B7280",
    background: "#F3F4F6",
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const getInitials = (name = "") =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

// ── Arrow icon ───────────────────────────────────────────────────────────────
const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const LockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="#9CA3AF" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// ── Component ────────────────────────────────────────────────────────────────
const PatientProfile = () => {
  const navigate = useNavigate();

  const [loading, setLoading]   = useState(true);
  const [patient, setPatient]   = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone]       = useState("");
  const [error, setError]       = useState("");
  const [saving, setSaving]     = useState(false);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  useEffect(() => { fetchPatientProfile(); }, []);

  const fetchPatientProfile = async () => {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (!user || authError) { navigate("/login"); return; }

    const { data, error } = await supabase
      .from("patients")
      .select("id, full_name, email, phone, created_at")
      .eq("id", user.id)
      .single();

    if (error) {
      setError("Unable to load profile");
    } else {
      setPatient(data);
      setFullName(data.full_name);
      setPhone(data.phone);
    }
    setLoading(false);
  };

  // ── Save ───────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!fullName.trim() || !phone.trim()) {
      setError("Name and phone are required");
      return;
    }
    setSaving(true);
    setError("");

    const { error } = await supabase
      .from("patients")
      .update({ full_name: fullName, phone })
      .eq("id", patient.id);

    if (error) {
      setError(error.message);
    } else {
      setPatient({ ...patient, full_name: fullName, phone });
      setEditMode(false);
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setFullName(patient.full_name);
    setPhone(patient.phone);
    setError("");
  };

  if (loading) return <div style={styles.loadingState}>Loading profile…</div>;


  return (
    <div style={styles.page}>
      <div style={styles.inner}>

        <h2 className="text-blue mb-3 fw-semibold">My Profile</h2>

        <div style={styles.card}>

          {/* Cover banner */}
          <div style={styles.cover}>
            <div style={styles.avatar}>
              {getInitials(patient.full_name)}
            </div>
          </div>

          {/* Body */}
          <div style={styles.body}>

            {/* Name + Edit button row */}
            <div style={styles.nameRow}>
              <div>
                <h2 className="text-blue fw-semibold">{patient.full_name}</h2>
                <span style={styles.activeBadge}>Active member</span>
              </div>
              {!editMode && (
                <button style={styles.editBtn} onClick={() => setEditMode(true)}>
                  Edit profile <ArrowIcon />
                </button>
              )}
            </div>

            {/* Divider */}
            <div style={styles.divider} />

            {/* Fields */}
            <div style={styles.fieldsGrid}>

              {/* Email — always read-only */}
              <div>
                <p style={styles.fieldLabel}>Email</p>
                <p style={styles.fieldValue}>{patient.email}</p>
              </div>

              {/* Phone */}
              <div>
                <p style={styles.fieldLabel}>Phone</p>
                {editMode ? (
                  <input
                    style={styles.input}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                  />
                ) : (
                  <p style={styles.fieldValue}>{patient.phone}</p>
                )}
              </div>

              {/* Member since — read-only */}
              <div>
                <p style={styles.fieldLabel}>Member since</p>
                <p style={styles.fieldValue}>{formatDate(patient.created_at)}</p>
              </div>

              {/* Full name (editable) */}
              <div>
                <p style={styles.fieldLabel}>
                  {editMode ? "Full name" : "Account status"}
                </p>
                {editMode ? (
                  <input
                    style={styles.input}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full name"
                  />
                ) : (
                  <p style={styles.fieldValue}>Verified</p>
                )}
              </div>

            </div>

            {/* Error message */}
            {error && <div style={styles.errorBox}>{error}</div>}

            {/* Edit mode action buttons */}
            {editMode && (
              <div style={styles.actionsRow}>
                <button style={styles.cancelBtn} onClick={handleCancel}>
                  Cancel
                </button>
                <button
                  style={{
                    ...styles.saveBtn,
                    ...(saving ? styles.saveBtnDisabled : {}),
                  }}
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving…" : "Save changes"}
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default PatientProfile;
