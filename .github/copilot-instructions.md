# Copilot Instructions for Shotime

## Project Overview

Shotime is a SvelteKit web application that displays information about MLB players. Originally built to showcase Shohei Ohtani (#660271), the app now supports viewing any MLB player's data through dynamic routes. The app fetches real-time data from the MLB API to show player stats, team information, and schedules.

## Tech Stack

- **Frontend Framework**: SvelteKit 2 with Svelte 5
- **Language**: TypeScript
- **Styling**: Tailwind 4
- **Runtime**: Bun
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics

## Key Technologies & Libraries

- `@sveltejs/kit` - SvelteKit framework
- `@sveltejs/adapter-vercel` - Vercel deployment adapter
- `@tailwindcss/vite` - Tailwind CSS integration
- `@vercel/analytics` - Analytics tracking
- TypeScript with strict type checking
- ESLint + Prettier for code formatting

## Code Style & Conventions

### General Guidelines

- Use TypeScript for all `.ts` and `.svelte` files
- Follow ESLint and Prettier configurations
- Use modern ES6+ syntax and async/await
- Prefer functional programming patterns where appropriate

### SvelteKit Specific

- Use SvelteKit's file-based routing (`src/routes/`)
- Follow SvelteKit naming conventions:
  - `+page.svelte` for page components
  - `+page.server.ts` for server-side data loading
  - `+layout.svelte` for layout components
- Use Svelte 5's new syntax:
  - `$props()` for component props
  - `$state()` for reactive state
  - `$derived()` for computed values
  - `$effect()` for side effects

### API Integration

- MLB API base URL: `https://statsapi.mlb.com/api/v1`
- Player ID for Shohei Ohtani: `660271` (default player)
- Support for any MLB player ID through dynamic routes (`/players/[playerId]`)
- Always handle API errors gracefully with try/catch
- Use proper TypeScript interfaces for API responses
- Cache API responses when appropriate using SvelteKit's built-in caching

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use semantic HTML elements
- Maintain consistent spacing and typography
- Use Tailwind's color palette and design tokens

### File Structure

```
src/
  app.css          # Global styles and Tailwind imports
  app.html         # HTML template
  routes/          # SvelteKit routes
    +layout.svelte # Global layout
    +page.svelte   # Home page component (Shohei Ohtani)
    +page.server.ts # Server-side data fetching
    players/       # Dynamic player routes
      [playerId]/  # Dynamic route for any player ID
        +page.svelte      # Player stats display
        +page.server.ts   # Player data fetching
        +error.svelte     # Error handling page
  assets/          # Static assets (images, icons)
```

## Development Commands

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run check` - Type checking with svelte-check
- `bun run lint` - Run ESLint and Prettier checks
- `bun run format` - Format code with Prettier

## API Data Types

When working with MLB API data, use these TypeScript interfaces:

```typescript
interface Player {
	fullName: string;
	primaryNumber: string;
	currentTeam: { id: number };
	stats: Stats[];
}

interface Team {
	id: number;
	name: string;
	teamName: string;
	abbreviation: string;
}
```

## Common Patterns

### Server-side Data Loading

- Use `+page.server.ts` for fetching MLB API data
- Return data from `load` functions
- Handle errors and provide fallbacks
- Use dynamic parameters with proper TypeScript typing: `{ params: { playerId: string } }`

### Dynamic Routes

- Use `[playerId]` syntax for dynamic player routes
- Access route parameters via `params.playerId` in load functions
- Provide proper error handling with `+error.svelte` pages
- Handle invalid player IDs gracefully

### Component Props

- Use Svelte 5's `$props()` syntax
- Destructure props with proper TypeScript typing
- Provide default values when appropriate

### Async Data Handling

- Use `{#await}` blocks for loading states
- Provide proper error handling with `{:catch}`
- Show loading indicators for better UX

## Performance Considerations

- Minimize API calls by caching responses
- Use SvelteKit's built-in preloading
- Optimize images and assets
- Use semantic HTML for better SEO

## Deployment

- Project is configured for Vercel deployment
- Analytics are integrated via `@vercel/analytics`
- Environment variables should be configured in Vercel dashboard

## MLB API Specific Notes

- Respect API rate limits
- Player ID 660271 is Shohei Ohtani's permanent MLB ID
- API returns both hitting and pitching stats for two-way players
- Team data includes schedule information
- Use appropriate error handling for network failures

## When Adding New Features

1. Create TypeScript interfaces for new data structures
2. Add proper error handling and loading states
3. Follow SvelteKit conventions for file organization
4. Use Tailwind CSS for consistent styling
5. Test responsive design on multiple screen sizes
6. Update this documentation if introducing new patterns
