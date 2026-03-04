# Code Splitting & Project Structure Plan

## Overview
This document outlines a comprehensive plan to refactor and enhance the Pokemon frontend application with proper code splitting, modular architecture, and professional folder structure.

### Key Conventions
- **Functional Components Only**: All React components must use functional component approach (no class components). Use `react-error-boundary` or custom hooks for error boundaries.
- **Default Exports**: All components must use `export default ComponentName`. Barrel files (`index.ts`) re-export as both named and default.
- **TDD (Test-Driven Development)**: Write tests first for all new components. Every component, hook, context, and utility must have corresponding test files written before or alongside implementation.
- **Commit Strategy**: Small, logical commits with clear messages on `feature/code-splitting` branch. Commits group related files by phase.

---

## 1. Project Structure Redesign

### Current vs. Proposed Structure

```
src/
├── App.tsx
├── App.css
├── index.css
├── main.tsx
│
├── pages/                           # Page components
│   ├── Home/
│   │   ├── index.ts
│   │   ├── Home.tsx
│   │   └── Home.test.tsx
│   ├── PokemonListPage/
│   │   ├── index.ts
│   │   ├── PokemonListPage.tsx
│   │   └── PokemonListPage.test.tsx
│   ├── PokemonDetailPage/
│   │   ├── index.ts
│   │   ├── PokemonDetailPage.tsx
│   │   └── PokemonDetailPage.test.tsx
│   ├── NotFound/
│   │   ├── index.ts
│   │   └── NotFound.tsx
│   └── ErrorPage/
│       ├── index.ts
│       └── ErrorPage.tsx
│
├── components/                      # Reusable components
│   ├── common/                      # Common UI components
│   │   ├── Badge/
│   │   │   ├── index.ts
│   │   │   ├── Badge.tsx
│   │   │   ├── Badge.test.tsx
│   │   │   └── Badge.css
│   │   ├── Button/
│   │   │   ├── index.ts
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── Button.css
│   │   ├── Card/
│   │   │   ├── index.ts
│   │   │   ├── Card.tsx
│   │   │   ├── Card.test.tsx
│   │   │   └── Card.css
│   │   ├── Form/
│   │   │   ├── index.ts
│   │   │   ├── Form.tsx
│   │   │   ├── Form.test.tsx
│   │   │   └── Form.css
│   │   ├── Input/
│   │   │   ├── index.ts
│   │   │   ├── Input.tsx
│   │   │   ├── Input.test.tsx
│   │   │   └── Input.css
│   │   ├── Link/
│   │   │   ├── index.ts
│   │   │   ├── Link.tsx
│   │   │   ├── Link.test.tsx
│   │   │   └── Link.css
│   │   ├── Modal/
│   │   │   ├── index.ts
│   │   │   ├── Modal.tsx
│   │   │   ├── Modal.test.tsx
│   │   │   └── Modal.css
│   │   ├── Spinner/
│   │   │   ├── index.ts
│   │   │   ├── Spinner.tsx
│   │   │   ├── Spinner.test.tsx
│   │   │   └── Spinner.css
│   │   ├── Alert/
│   │   │   ├── index.ts
│   │   │   ├── Alert.tsx
│   │   │   ├── Alert.test.tsx
│   │   │   └── Alert.css
│   │   └── index.ts                 # Barrel export
│   │
│   ├── features/                    # Feature-specific components
│   │   ├── PokemonCard/
│   │   │   ├── index.ts
│   │   │   ├── PokemonCard.tsx
│   │   │   ├── PokemonCard.test.tsx
│   │   │   └── PokemonCard.css
│   │   ├── PokemonDetail/
│   │   │   ├── index.ts
│   │   │   ├── PokemonDetail.tsx
│   │   │   ├── PokemonDetail.test.tsx
│   │   │   └── PokemonDetail.css
│   │   ├── PokemonList/
│   │   │   ├── index.ts
│   │   │   ├── PokemonList.tsx
│   │   │   ├── PokemonList.test.tsx
│   │   │   └── PokemonList.css
│   │   ├── PokemonSearch/
│   │   │   ├── index.ts
│   │   │   ├── PokemonSearch.tsx
│   │   │   ├── PokemonSearch.test.tsx
│   │   │   └── PokemonSearch.css
│   │   ├── PokemonFilter/
│   │   │   ├── index.ts
│   │   │   ├── PokemonFilter.tsx
│   │   │   ├── PokemonFilter.test.tsx
│   │   │   └── PokemonFilter.css
│   │   └── index.ts                 # Barrel export
│   │
│   ├── ErrorBoundary/
│   │   ├── index.ts
│   │   ├── ErrorBoundary.tsx
│   │   └── ErrorBoundary.test.tsx
│   │
│   ├── Layout/
│   │   ├── index.ts
│   │   ├── MainLayout.tsx
│   │   ├── MainLayout.test.tsx
│   │   ├── MainLayout.css
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   │
│   └── index.ts                     # Barrel export
│
├── contexts/                         # React contexts for state management
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   ├── NotificationContext.tsx
│   ├── PokemonContext.tsx
│   └── index.ts                     # Barrel export
│
├── hooks/                            # Custom React hooks
│   ├── useAuth.ts
│   ├── useLocalStorage.ts
│   ├── useFetch.ts
│   ├── useDebounce.ts
│   ├── usePagination.ts
│   ├── useNotification.ts
│   ├── useTheme.ts
│   ├── useForm.ts
│   └── index.ts                     # Barrel export
│
├── services/                         # API & external services
│   ├── api/
│   │   ├── pokemonApi.ts
│   │   ├── pokemonApi.test.ts
│   │   ├── apiClient.ts
│   │   └── apiConfig.ts
│   ├── auth/
│   │   ├── authService.ts
│   │   ├── authService.test.ts
│   │   └── tokenManager.ts
│   └── index.ts                     # Barrel export
│
├── utils/                            # Utility functions
│   ├── helpers.ts
│   ├── helpers.test.ts
│   ├── validation.ts
│   ├── validation.test.ts
│   ├── formatting.ts
│   ├── formatting.test.ts
│   ├── constants.ts
│   └── index.ts                     # Barrel export
│
├── lib/                              # Third-party wrappers & configurations
│   ├── axios.ts                      # Axios instance configuration
│   ├── fetch.ts                      # Fetch API wrapper
│   ├── storage.ts                    # Local/Session storage utilities
│   ├── notification.ts               # Notification library setup
│   ├── date.ts                       # Date utility library setup
│   └── index.ts                     # Barrel export
│
├── types/                            # TypeScript type definitions
│   ├── pokemon.ts
│   ├── pokemon.test.ts
│   ├── api.ts
│   ├── auth.ts
│   ├── common.ts
│   ├── enums.ts
│   └── index.ts                     # Barrel export
│
├── constants/                        # Application constants
│   ├── api.ts                        # API endpoints & config
│   ├── app.ts                        # General app constants
│   ├── validation.ts                 # Validation rules
│   ├── messages.ts                   # User messages & notifications
│   ├── permissions.ts                # Auth permissions
│   ├── pokemon.ts                    # Pokemon-specific constants
│   └── index.ts                     # Barrel export
│
├── routes/                           # Route definitions
│   ├── index.ts
│   ├── routes.tsx
│   ├── PrivateRoute.tsx
│   ├── PublicRoute.tsx
│   └── RouteConfig.ts
│
├── test/                             # Test configuration & setup
│   ├── setup.ts
│   ├── mocks/
│   │   ├── handlers.ts
│   │   ├── server.ts
│   │   ├── pokemon.mocks.ts
│   │   ├── auth.mocks.ts
│   │   └── index.ts
│   └── utils/
│       ├── testHelpers.ts
│       ├── renderWithProviders.tsx
│       └── index.ts
│
└── styles/                           # Global styles
    ├── global.css
    ├── variables.css                 # CSS variables
    ├── animations.css
    ├── typography.css
    └── responsive.css
```

---

## 2. Implementation Plan by Phase

### Phase 1: Foundation (Folder Structure & Setup)
- [ ] Create new folder structure directories
- [ ] Create barrel exports (index.ts) files in each component folder
- [ ] Move existing components to appropriate locations
- [ ] Set up base types and interfaces

**Commits:**
1. `feat: create base folder structure for code splitting`
2. `feat: add barrel exports for components`

---

### Phase 2: Constants & Types
- [ ] Create `constants/api.ts` - API endpoints, base URLs, timeouts
- [ ] Create `constants/app.ts` - General app constants (brand names, versions)
- [ ] Create `constants/validation.ts` - Validation rules and regex patterns
- [ ] Create `constants/messages.ts` - User messages, error messages, notifications
- [ ] Create `constants/permissions.ts` - Authentication permissions and roles
- [ ] Create `constants/pokemon.ts` - Pokemon-specific constants
- [ ] Enhance `types/pokemon.ts` with comprehensive interfaces
- [ ] Create `types/api.ts` - API request/response types
- [ ] Create `types/auth.ts` - Authentication types
- [ ] Create `types/common.ts` - Common reusable types
- [ ] Create `types/enums.ts` - Enum definitions

**Commits:**
1. `feat: create constants directory with api, app, validation, messages, permissions, and pokemon constants`
2. `feat: enhance type definitions for api, auth, and common types`

---

### Phase 3: Library Wrappers & Utilities
- [ ] Create `lib/axios.ts` - Configure axios instance with interceptors
- [ ] Create `lib/fetch.ts` - Fetch API wrapper with error handling
- [ ] Create `lib/storage.ts` - LocalStorage/SessionStorage utilities
- [ ] Create `lib/notification.ts` - Notification library setup (toast, snackbar)
- [ ] Create `lib/date.ts` - Date utility library configuration
- [ ] Create utility files:
  - `utils/validation.ts` - Form validation helpers
  - `utils/formatting.ts` - Data formatting utilities
  - `utils/helpers.ts` (refactor existing)
  - Add tests for all utils

**Commits:**
1. `feat: create lib wrappers for axios, fetch, storage, notification, and date utilities`
2. `feat: create utility functions for validation, formatting, and helpers`
3. `test: add tests for utility functions`

---

### Phase 4: Authentication & Services
- [ ] Create `services/auth/authService.ts` - Authentication logic
- [ ] Create `services/auth/tokenManager.ts` - Token management (JWT, refresh tokens)
- [ ] Refactor `services/api/pokemonApi.ts` to use new structure
- [ ] Create `services/api/apiClient.ts` - API client setup
- [ ] Create `services/api/apiConfig.ts` - API configuration
- [ ] Add tests for all services

**Commits:**
1. `feat: create authentication service with token management`
2. `feat: refactor pokemon api service with new structure`
3. `test: add tests for authentication and api services`

---

### Phase 5: Contexts & Hooks
- [ ] Create `contexts/AuthContext.tsx` - Authentication context
- [ ] Create `contexts/ThemeContext.tsx` - Theme/styling context
- [ ] Create `contexts/NotificationContext.tsx` - Notification management context
- [ ] Create `contexts/PokemonContext.tsx` - Pokemon data context
- [ ] Create custom hooks:
  - `hooks/useAuth.ts` - Authentication hook
  - `hooks/useLocalStorage.ts` - Local storage hook
  - `hooks/useFetch.ts` - Data fetching hook with caching
  - `hooks/useDebounce.ts` - Debounce hook
  - `hooks/usePagination.ts` - Pagination hook
  - `hooks/useNotification.ts` - Notification hook
  - `hooks/useTheme.ts` - Theme hook
  - `hooks/useForm.ts` - Form management hook
- [ ] Add tests for all contexts and hooks

**Commits:**
1. `feat: create authentication and theme contexts`
2. `feat: create notification and pokemon contexts`
3. `feat: create custom hooks for auth, storage, fetch, and form management`
4. `test: add tests for contexts and hooks`

---

### Phase 6: Common UI Components
- [ ] Create/enhance common UI components with proper styling and props:
  - `components/common/Button/` - Button component with variants
  - `components/common/Card/` - Card component with slot support
  - `components/common/Form/` - Form component with validation
  - `components/common/Input/` - Input component with variations
  - `components/common/Link/` - Link component with routing integration
  - `components/common/Badge/` - Badge component
  - `components/common/Modal/` - Modal component with accessibility
  - `components/common/Spinner/` - Loading spinner component
  - `components/common/Alert/` - Alert/notification component
- [ ] Create barrel exports
- [ ] Add comprehensive tests for each component
- [ ] Create Storybook stories (optional, future enhancement)

**Commits:**
1. `feat: create button, card, and form common components`
2. `feat: create input, link, and badge common components`
3. `feat: create modal, spinner, and alert common components`
4. `test: add tests for all common ui components`

---

### Phase 7: Error Boundary & Layout
- [ ] Refactor `components/ErrorBoundary.tsx` to functional component approach:
  - Use `react-error-boundary` library or wrapper with functional fallback component
  - Add error logging
  - Add error recovery mechanisms
  - Create specific error boundaries for different sections
- [ ] Create `components/Layout/`:
  - `MainLayout.tsx` - Main application layout
  - `Header.tsx` - Header component
  - `Footer.tsx` - Footer component
  - `Sidebar.tsx` - Sidebar/navigation component
- [ ] Add styling and responsive design
- [ ] Add tests

**Commits:**
1. `feat: enhance error boundary with logging and recovery`
2. `feat: create layout components (main, header, footer, sidebar)`
3. `test: add tests for error boundary and layout components`

---

### Phase 8: Feature Components
- [ ] Refactor existing components to folder structure:
  - `components/features/PokemonCard/`
  - `components/features/PokemonList/`
  - `components/features/PokemonDetail/`
- [ ] Create new feature components:
  - `components/features/PokemonSearch/` - Search functionality
  - `components/features/PokemonFilter/` - Filter functionality
- [ ] Implement memoization where appropriate (React.memo, useMemo, useCallback)
- [ ] Add comprehensive error handling
- [ ] Add tests and prop validation

**Commits:**
1. `feat: refactor pokemon feature components with memoization`
2. `feat: create pokemon search and filter components`
3. `test: add tests for all feature components`

---

### Phase 9: Pages & Routing
- [ ] Create pages directory structure:
  - `pages/Home/` - Home page
  - `pages/PokemonListPage/` - Pokemon list page
  - `pages/PokemonDetailPage/` - Pokemon detail page
  - `pages/NotFound/` - 404 page
  - `pages/ErrorPage/` - Error page
- [ ] Create `routes/routes.tsx` - Route configuration
- [ ] Create `routes/PrivateRoute.tsx` - Protected routes
- [ ] Create `routes/PublicRoute.tsx` - Public routes
- [ ] Create `routes/RouteConfig.ts` - Route metadata
- [ ] Update `App.tsx` to use new routing
- [ ] Add route-based code splitting with React.lazy
- [ ] Add tests

**Commits:**
1. `feat: create page components and route structure`
2. `feat: implement route-based code splitting with lazy loading`
3. `feat: create private and public route wrappers`
4. `test: add tests for pages and routing`

---

### Phase 10: Test Configuration & Enhancements
- [ ] Create comprehensive test setup:
  - `test/setup.ts` - Test environment setup
  - `test/mocks/handlers.ts` - MSW handlers
  - `test/mocks/server.ts` - MSW server setup
  - `test/mocks/pokemon.mocks.ts` - Pokemon-specific mocks
  - `test/mocks/auth.mocks.ts` - Auth-specific mocks
  - `test/utils/renderWithProviders.tsx` - Custom render utility
  - `test/utils/testHelpers.ts` - Test helper functions
- [ ] Add tests for integration scenarios
- [ ] Set up coverage thresholds

**Commits:**
1. `test: enhance test setup with providers and helpers`
2. `test: create comprehensive mocks for pokemon and auth`
3. `test: add integration tests for key scenarios`

---

### Phase 11: Styling & Global Setup
- [ ] Create `styles/` directory:
  - `styles/global.css` - Global styles
  - `styles/variables.css` - CSS custom properties (colors, spacing, fonts)
  - `styles/animations.css` - Reusable animations
  - `styles/typography.css` - Typography utilities
  - `styles/responsive.css` - Responsive design utilities
- [ ] Migrate existing CSS
- [ ] Update component imports

**Commits:**
1. `feat: create global styles and css variables`
2. `refactor: migrate component styles to new structure`

---

### Phase 12: Documentation & Final Polish
- [ ] Create component documentation
- [ ] Create API documentation
- [ ] Add inline code comments for complex logic
- [ ] Create development guide
- [ ] Verify all tests pass
- [ ] Optimize bundle size analysis

**Commits:**
1. `docs: add component and api documentation`
2. `refactor: code quality improvements and final polish`

---

## 3. Key Features to Implement

### Memoization Strategy
- [ ] Use `React.memo()` for list items and cards that don't frequently update
- [ ] Use `useMemo()` for expensive computations (filtering, sorting)
- [ ] Use `useCallback()` for event handlers passed to memoized children
- [ ] Profile and identify performance bottlenecks before memoizing

### Error Handling
- [ ] Error boundaries for component errors
- [ ] Try-catch in async operations
- [ ] Custom error types and error handling utilities
- [ ] User-friendly error messages
- [ ] Error logging and monitoring (prepare infrastructure)

### Authentication Flow
- [ ] Login/logout functionality
- [ ] Token management (JWT, refresh tokens)
- [ ] Protected routes with PrivateRoute wrapper
- [ ] Session persistence with useLocalStorage hook
- [ ] Auth context for global auth state

### Code Splitting Strategy
- [ ] Route-based code splitting (React.lazy)
- [ ] Component-based code splitting for heavy components
- [ ] Dynamic imports for utilities
- [ ] Analyze bundle with vite-plugin-visualizer

---

## 4. Development Workflow

### Branch Management
- Feature branch: `feature/code-splitting`
- Commit frequency: Small, logical commits with clear messages
- PR to main after phases complete

### Commit Message Convention
```
<type>: <subject>
<body>
<footer>
```

Types:
- `feat:` - New feature
- `refactor:` - Code refactoring
- `test:` - Adding/updating tests
- `docs:` - Documentation
- `style:` - CSS/styling changes
- `fix:` - Bug fixes
- `chore:` - Build, dependencies, config

### Testing Requirements
- **TDD approach**: Write test files (`.test.tsx` / `.test.ts`) before or alongside component implementation
- Unit tests for utilities, hooks, and services
- Component tests for all components (common UI, features, layout, error boundary)
- Integration tests for key user flows
- Achieve minimum 80% code coverage
- Use `renderWithProviders` helper for components needing context
- Mock external dependencies with MSW for API calls

### Export Convention
- All components: `export default ComponentName` at the bottom of each file
- Barrel files (`index.ts`): `export { default as ComponentName } from './ComponentName'` and `export { default } from './ComponentName'`
- Named exports for sub-components (e.g., `CardHeader`, `CardBody`) alongside the default export

### Component Convention
- **Functional components only** — no class components anywhere in the codebase
- Error boundaries use the `react-error-boundary` library or a wrapper around `ErrorBoundary` from React's API with a functional fallback component

---

## 5. Tools & Technologies

### Already in Use
- Vite (build tool)
- React 18+
- TypeScript
- Vitest (testing)
- ESLint (linting)

### To Integrate
- React Router v6 (routing)
- React Context API (state management)
- MSW (API mocking)
- CSS custom properties (styling)

---

## 6. Performance Considerations

- [ ] Lazy load routes and heavy components
- [ ] Optimize bundle size (analyze with vite-plugin-visualizer)
- [ ] Implement proper memoization
- [ ] Use virtual scrolling for large lists (if needed)
- [ ] Optimize re-renders with useMemo/useCallback
- [ ] Implement image lazy loading
- [ ] Add performance monitoring hooks

---

## 7. Accessibility & Best Practices

- [ ] ARIA labels and semantic HTML
- [ ] Keyboard navigation support
- [ ] Color contrast compliance (WCAG AA)
- [ ] Form validation with accessible error messages
- [ ] Focus management in modals
- [ ] Test with accessibility tools

---

## 8. Future Enhancements (Not in Current Plan)

- [ ] State management upgrade (Redux/Zustand) if needed
- [ ] Storybook for component library
- [ ] E2E testing (Cypress/Playwright)
- [ ] CI/CD pipeline
- [ ] Docker containerization
- [ ] Analytics integration
- [ ] Internationalization (i18n)
- [ ] Dark mode support

---

## 9. Rollback & Risk Mitigation

- Keep main branch stable
- All changes on feature branch
- Comprehensive testing before merge
- Easy rollback with git
- Monitor performance impact

---

## Timeline Estimate

- **Phase 1-2**: 2-3 commits (1-2 hours)
- **Phase 3-4**: 3-4 commits (2-3 hours)
- **Phase 5**: 4 commits (2-3 hours)
- **Phase 6**: 3 commits (2-3 hours)
- **Phase 7**: 3 commits (1-2 hours)
- **Phase 8**: 3 commits (2-3 hours)
- **Phase 9**: 4 commits (2-3 hours)
- **Phase 10-11**: 3 commits (1-2 hours)
- **Phase 12**: 2 commits (1 hour)

**Total Estimated Time**: 15-24 hours across multiple development sessions

---

## Success Criteria

- ✅ All folders and structure created
- ✅ All components properly organized
- ✅ All tests passing (>80% coverage)
- ✅ No console errors or warnings
- ✅ Bundle size optimized
- ✅ Feature branch merged to main via PR
- ✅ Clean git history with descriptive commits
- ✅ Documentation complete

---

## Notes

- This plan is flexible and can be adjusted based on progress and requirements
- Focus on quality over speed - each phase should be thoroughly tested
- Regular commits help with debugging and reverting if needed
- Document any architectural decisions in future comments or wiki
