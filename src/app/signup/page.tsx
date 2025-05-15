
// This file is no longer needed as signup is handled in a popup on the homepage.
// You can safely delete this file.
// If you want to keep it as a fallback, ensure it redirects or clearly states its deprecated status.

export default function DeprecatedSignupPage() {
  if (typeof window !== 'undefined') {
    // Redirect to home, as signup is now a popup there
    window.location.href = '/'; 
  }
  return null; 
}
