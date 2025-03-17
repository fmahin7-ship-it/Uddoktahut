import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>🚫 Store Not Found</h1>
      <p>The store you are looking for does not exist.</p>
      <Link href="/">Go Back to Home</Link>
    </div>
  );
}
