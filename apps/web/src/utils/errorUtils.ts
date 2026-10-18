/**
 * Safely extracts a user-readable error message from various error formats,
 * including RTK Query, Axios, fetch, standard Error objects, and backend JSON payloads
 * such as:
 * - { error: "Account Group with name 'Test 1' already exists" }
 * - { message: "Validation error" }
 * - { detail: "Resource not found" }
 * - { errors: [...] }
 */
export function getErrorMessage(
  err: unknown,
  fallback = 'An unexpected error occurred. Please try again.'
): string {
  if (!err) return fallback;

  // 1. RTK Query / Axios error object with data
  const data = (err as any)?.data;
  if (data) {
    if (typeof data === 'string' && data.trim()) {
      return data.trim();
    }
    // E.g. { error: "Account Group with name 'Test 1' already exists" }
    if (typeof data.error === 'string' && data.error.trim()) {
      return data.error.trim();
    }
    // E.g. { message: "Validation error" }
    if (typeof data.message === 'string' && data.message.trim()) {
      return data.message.trim();
    }
    // E.g. { detail: "Resource not found" }
    if (typeof data.detail === 'string' && data.detail.trim()) {
      return data.detail.trim();
    }
    // E.g. { errors: [...] } or { errors: { field: "error" } }
    if (data.errors) {
      if (Array.isArray(data.errors)) {
        const msgs = data.errors
          .map((e: any) =>
            typeof e === 'string' ? e : e?.message || e?.error || JSON.stringify(e)
          )
          .filter(Boolean);
        if (msgs.length > 0) return msgs.join(', ');
      } else if (typeof data.errors === 'object') {
        const msgs = Object.values(data.errors)
          .flat()
          .map((e: any) =>
            typeof e === 'string' ? e : e?.message || e?.error || JSON.stringify(e)
          )
          .filter(Boolean);
        if (msgs.length > 0) return msgs.join(', ');
      }
    }
  }

  // 2. Direct error property (e.g. { error: "..." })
  if (typeof (err as any)?.error === 'string' && (err as any).error.trim()) {
    return (err as any).error.trim();
  }

  // 3. Direct message property (e.g. standard Error instance)
  if (typeof (err as any)?.message === 'string' && (err as any).message.trim()) {
    return (err as any).message.trim();
  }

  return fallback;
}
