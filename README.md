# CEGsoft TaxesAI Demo

A React application that integrates Inkeep's AI chat agent for tax-related queries with client-specific context.

## Quick Start

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Fill in the required values:
   - `VITE_INKEEP_AGENT_URL` - Inkeep agent endpoint
   - `VITE_INKEEP_AGENT_API_KEY` - Inkeep agent API key
   - `VITE_TAXESAI_API_KEY` - TaxesAI API key(x-api-key)
   - `VITE_AUTH_API_URL` - Authentication endpoint
   - `VITE_AUTH_EMAIL` & `VITE_AUTH_PASSWORD` - Auth credentials for JWT Token

3. **Run the app**
   ```bash
   pnpm dev
   ```
   Open http://localhost:5175

## How It Works

### The `useInkeepChat` Hook

The core of this application is the `useInkeepChat` hook, which configures the Inkeep chat agent with authentication and context.

**Key features:**

- **JWT Authentication**: Passes JWT token in request headers
- **Return-specific context**: Includes `return-id` header to provide tax return context to the agent
- **Ready state**: Returns `isReady` flag to indicate when chat is properly initialized
- **Custom headers**: Configures both Inkeep and TaxesAI headers for the agent

**Usage:**
```typescript
const { aiChatSettings, isReady } = useInkeepChat(jwtToken, selectedReturnId);
```

**Returns:**
- `aiChatSettings` - Configuration object for `InkeepChatButton` (undefined until token is available)
- `isReady` - Boolean indicating if the chat is ready to use

**Headers passed to agent:**
- `x-emit-operations: "true"` - Enables real-time status updates from the agent
- `jwt-authentication-token: Bearer ${jwtToken}` - Authentication token
- `x-api-key` - TaxesAI API key
- `return-id` - Selected tax return ID (when available)

The hook gracefully handles the loading state by returning `undefined` for settings until the JWT token is available, preventing initialization errors.

## Project Structure

- `src/hooks/useInkeepChat.ts` - Chat configuration hook
- `src/hooks/useAuth.ts` - JWT authentication
- `src/components/ChatSection.tsx` - Chat UI component
- `src/config/inkeep.ts` - Inkeep configuration
