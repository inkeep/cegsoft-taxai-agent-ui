import { useState, useEffect } from "react";
import { getJwtToken, AuthenticationError } from "../services/auth";

export function useAuth() {
  const [jwtToken, setJwtToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const fetchToken = async () => {
    try {
      setIsLoading(true);
      setAuthError(null);
      const token = await getJwtToken();
      setJwtToken(token);
      console.log("[Inkeep Demo] JWT token fetched successfully");
    } catch (error) {
      const errorMessage =
        error instanceof AuthenticationError
          ? error.message
          : "Failed to fetch authentication token";
      setAuthError(errorMessage);
      console.error("[Inkeep Demo] Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch JWT token on mount
  useEffect(() => {
    fetchToken();
  }, []);

  // Refresh JWT token every 55min for testing context updates
  useEffect(() => {
    if (!jwtToken) return;

    console.log("[Inkeep Demo] Starting 55min JWT token refresh interval");
    const interval = setInterval(async () => {
      try {
        const newToken = await getJwtToken();
        setJwtToken(newToken);
        console.log("[Inkeep Demo] JWT token refreshed at", new Date().toISOString());
      } catch (error) {
        console.error("[Inkeep Demo] Failed to refresh token:", error);
      }
    }, 3300000);

    return () => {
      console.log("[Inkeep Demo] Clearing JWT token refresh interval");
      clearInterval(interval);
    };
  }, [jwtToken]);

  return {
    jwtToken,
    isLoading,
    authError,
    retry: fetchToken,
  };
}
