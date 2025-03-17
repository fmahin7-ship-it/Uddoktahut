"use client";

import Link from "next/link";
import { CONFIG } from "../_lib/config";

function UnauthorizeAccess({ shopSlug }) {
  return (
    <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
      <h1>🚫 Unauthorized Access</h1>
      <p>
        Sorry, <strong>{shopSlug}</strong> does not have permission to create a
        store.
      </p>
      {CONFIG.isProd ? (
        <Link href="https://uddoktahut.com">Go Back to Home</Link>
      ) : (
        <Link href="http://uddoktahut.local:3000">Go Back to Home</Link>
      )}
    </div>
  );
}

export default UnauthorizeAccess;
