"use client";
import { APP_NAME } from "@sanchay/config";
import { Button } from "@sanchay/ui";

export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Welcome to ERP Web</h1>
      <p>This is the walking skeleton.</p>
      <Button onClick={() => console.log('Clicked')}>
        Shared UI Button
      </Button>
    </main>
  );
}
