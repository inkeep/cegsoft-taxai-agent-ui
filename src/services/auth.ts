const authApiUrl = import.meta.env.VITE_AUTH_API_URL;
const authEmail = import.meta.env.VITE_AUTH_EMAIL;
const authPassword = import.meta.env.VITE_AUTH_PASSWORD;

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
  expiresAt: string;
}

export class AuthenticationError extends Error {
  constructor(
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "AuthenticationError";
  }
}

/**
 * Fetches a JWT token from the authentication API
 * @returns Promise with the access token
 * @throws AuthenticationError if authentication fails
 */
export async function getJwtToken(): Promise<string> {
  if (!authApiUrl || !authEmail || !authPassword) {
    throw new AuthenticationError(
      "Missing authentication configuration. Please check environment variables."
    );
  }

  try {
    const response = await fetch(authApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: authEmail,
        Password: authPassword,
      }),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new AuthenticationError(
          "Invalid credentials. Please check your email and password.",
          response.status
        );
      }
      throw new AuthenticationError(
        `Authentication failed with status ${response.status}`,
        response.status
      );
    }

    const data: AuthResponse = await response.json();

    if (!data.accessToken) {
      throw new AuthenticationError("No access token received from server");
    }

    console.log("[Auth Service] Successfully fetched JWT token", {
      email: data.email,
      expiresAt: data.expiresAt,
      tokenLength: data.accessToken.length,
    });

    return data.accessToken;
  } catch (error) {
    if (error instanceof AuthenticationError) {
      throw error;
    }

    if (error instanceof TypeError) {
      throw new AuthenticationError(
        "Network error. Please check your connection and try again."
      );
    }

    throw new AuthenticationError(
      `Unexpected error during authentication: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
