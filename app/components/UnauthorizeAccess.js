"use client";

import Link from "next/link";

function UnauthorizeAccess() {
  return (
    <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
      <h1>🚫 Unauthorized Access</h1>
      <p>
        Sorry, <strong>{shopSlug}</strong> does not have permission to create a
        store.
      </p>
      <Link href="/">Go Back to Home</Link>
    </div>
  );
}

export default UnauthorizeAccess;
