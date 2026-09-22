export default function Skeleton() {
  return (
    <div
      className="skeleton"
      style={{ padding: "2rem", animation: "pulse 1.5s infinite" }}
    >
      <div
        style={{
          height: "24px",
          backgroundColor: "#e0e0e0",
          marginBottom: "1rem",
          borderRadius: "4px",
          width: "60%",
        }}
      />
      <div
        style={{
          height: "16px",
          backgroundColor: "#e0e0e0",
          marginBottom: "0.5rem",
          borderRadius: "4px",
          width: "80%",
        }}
      />
      <div
        style={{
          height: "16px",
          backgroundColor: "#e0e0e0",
          marginBottom: "0.5rem",
          borderRadius: "4px",
          width: "70%",
        }}
      />
      <div
        style={{
          height: "40px",
          backgroundColor: "#e0e0e0",
          borderRadius: "4px",
          width: "40%",
          marginTop: "1.5rem",
        }}
      />
    </div>
  );
}
