# ScopeTrack UI
A mordern Angular single-page application for managing clients, contracts, and deliverables. Built with Angular 21, TypeScript, and a focus on maintainability and user expericence.

---

## Table of Contents
* [Overview](#overview)
* [Architecture](#architecture)
* [Technology Stack](#technology-stack)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
* [Application Features](#application-features)
* [Component Architecture](#component-architecture)
* [State Management](#state-management)
* [Styling System](#styling-system)
* [API Integration](#api-integration)
* [Development](#development)

---

## Overview
ScopeTrack UI provides a complete frontend solution for:
* **Client Management** – View, create, update, and manage client status
* **Contract Management** – Track contracts, update statuses, and view deliverables
* **Deliverable Management** – Manage work items within contracts
* **Dashboard** – Real-time statistics and quick navigation
* **Search & Filter** – Client search with real-time filtering

The application follows Angular best practices with standalone components, reactive patterns, and clear separation of concerns.

---

## Architecture
This solution follows **Feature-Based Architecture** with clear module boundaries:
```text
[Pages] → [Features] → [Shared Components] → [Core Services] → [API Layer]
```

| Layer | Responsibility |
|-------|----------------|
| Pages | Route containers, page-level orchestration |
| Features | Domain-specific components and logic |
| Shared | Reusable components and interfaces |
| Core | API configuration, base services |
| API | HTTP client services, DTOs |

**Key Principles:**
* Standalone components (no NgModules)
* Feature folders contain all related components
* Smart/Presentational component pattern
* Reactive state with RxJS observables
* Centralized API communication
* Design token-based styling

---

## Technology Stack
* **Angular 21** – Framework
* **TypeScript 5.9** – Language
* **RxJS 7.8** – Reactive programming
* **Angular Router** – Navigation
* **HttpClient** – API communication
* **SCSS** – Styling with CSS variables
* **Standalone Components** – Modern Angular architecture

---

## Project Structure
```text
src/
├─ app/
│  ├─ core/
│  │  └─ api/
│  │     └─ api.config.ts
│  │
│  ├─ features/
│  │  ├─ clients/
│  │  │  ├─ api/
│  │  │  │  └─ client.api.ts
│  │  │  ├─ components/
│  │  │  │  ├─ client-details-modal/
│  │  │  │  ├─ client-form-modal/
│  │  │  │  └─ client-list/
│  │  │  ├─ models/
│  │  │  │  └─ client.dto.ts
│  │  │  └─ pages/
│  │  │     └─ clients-page/
│  │  │
│  │  ├─ contract/
│  │  │  ├─ api/
│  │  │  │  └─ contract.api.ts
│  │  │  ├─ components/
│  │  │  │  ├─ contract-details-modal/
│  │  │  │  ├─ contract-form-modal/
│  │  │  │  └─ contract-list/
│  │  │  ├─ models/
│  │  │  │  └─ contract.dto.ts
│  │  │  └─ pages/
│  │  │     └─ contracts-page/
│  │  │
│  │  └─ deliverables/
│  │     ├─ api/
│  │     │  └─ deliverable.api.ts
│  │     ├─ components/
│  │     │  ├─ deliverable-details-modal/
│  │     │  ├─ deliverable-form-modal/
│  │     │  └─ deliverable-list/
│  │     └─ models/
│  │        └─ deliverable.dto.ts
│  │
│  ├─ pages/
│  │  └─ dashboard/
│  │     ├─ dashboard-page/
│  │     ├─ models/
│  │     │  └─ dashboard-stats.dto.ts
│  │     └─ services/
│  │        └─ dashboard.service.ts
│  │
│  ├─ shared/
│  │  ├─ components/
│  │  │  └─ toolbar/
│  │  └─ interfaces/
│  │     └─ toolbar.interface.ts
│  │
│  ├─ app.component.ts
│  ├─ app.config.ts
│  └─ app.routes.ts
│
├─ environments/
│  └─ environment.ts
│
├─ styles.scss
└─ index.html
```

---

## Getting Started

### Prerequisites
* [Node.js 20+](https://nodejs.org)
* [npm 10+](https://www.npmjs.com)
* [Angular CLI 19+](https://angular.dev/tools/cli)

### Installation
1. **Clone the repository**
```shell
git clone http://github.com/rbcaputo/scopetrack-ui
cd scopetrack-ui
```

2. **Install dependencies**
```shell
npm install
```

3. **Configure API endpoint**\
Edit `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiBaseUrl: "http://localhost:port/api"
};
```
Ensure this matches your ScopeTrack API URL (`5253` is the default HTTP API port).

4. **Start development server**
```shell
ng serve
```

5. **Access the application**\
Open browser to: `http://localhost:4200`

---

## Application Features

### Dashboard
* Real-time statistics for clients, contracts, and deliverables
* Status breakdowns (Active/Inactive, Draft/Active/Completed/Archived, etc.)
* Quick navigation to client and contracts lists

### Client Management
* **List View:** Grid of client cards with status badges, email, and contract count
* **Search:** Real-time filtering by name or email
* **Create:** Modal form with validation (name 3-100 characters, valid email)
* **Update:** Edit clients details via modal
* **Toggle Status:** Switch between Active/Inactive
* **Add Contract:** Create new contracts directly from client details

### Contract Management
* **List View:** Grid of contract cards with status, type, and deliverable count
* **Status Management:** Change status between Draft/Active/Completed/Archived
* **Add Deliverable:** Create deliverables within contracts
* **View Details:** Modal showing full contract information and nested deliverables

### Deliverable Management
* **Nested Display:** Deliverables shown within contract details
* **Status Updates:** Change status between Pending/InProgress/Completed/Cancelled
* **Due Dates:** Optional due date tracking
* **Detail View:** Full deliverable information with status history

### Modal System
* **Layered Modals:** Support for nested modal workflows (e.g., Client → Contract → Deliverable)
* **Form Validation:** Real-time validation with error messages
* **Optimistic Updates:** Immediate UI feedback with server confirmation

---

## Component Architecture

### Component Types

#### Page Components *(route containers)*
* Manage route-level state
* Orchestrate feature components
* Handle navigation
* Example: `ClientsPageComponent`

#### Feature Components *(domain logic)*
* Contain business logic
* Manage local state
* Interact with API services
* Example: `ClientDetailsModalComponent`

#### Presentation Components *(pure UI)*
* Receive data via `@Input()`
* Emit events via `@Output()`
* No direct API calls
* Example: `ClientListComponent`

#### Shared Components *(reusable)*
* Generic, domain-agnostic
* Configurable via inputs
* Example: `ToolbarComponent`

### Component Patterns

##### Smart/Presentational Pattern
**Smart Component (ClientsPageComponent):**
* Manages `Observable<ClientGetDto[]>`
* Handles filtering logic
* Opens modals
* Reloads data after changes

**Presentational Component (ClientListComponent):**
* Receive clients via `@Input()`
* Emits select events via `@Output()`
* Pure rendering logic

### Modal Communication Pattern
```typescript
// Parent opens modal with data
<app-client-details-modal
  [clientId]="selectedClientId"
  (close)="onModalClose()">
</app-client-details-modal>

// Modal loads its own data
this.client$ = this.clientApi.getById(this.clientId);

// Modal emits events on completion
this.close.emit();
```

---

## State Management

### Observable-Based State
The application uses **RxJS observables** for state management:

#### API Data Streams
```typescript
// Service layer
public clients$!: Observable<ClientGetDto[]>;

// Component initialization
ngOnInit(): void {
  this.clients$ = this.clientApi.getAll();
}

// Template subscription
<app-client-list [clients]="clients$ | async">
```

#### Search/Filter Pattern
```typescript
// BehaviorSubject for search term
private searchTerm$ = new BehaviorSubject<string>("");

// Combined stream with filtering
this.filteredClients$ = combineLastest([
  this.clients$,
  this.searchTerm$
]).pipe(
  map(([clients, term]) => {
    if (!term.trim()) return clients;
    return clients.filter(client =>
      client.name.toLowerCase().includes(term.toLowerCase()) ||
      client.email.toLowerCase().includes(term.toLowerCase())
    );
  })
);
```

#### Data Refresh Pattern
```typescript
// Reload data after mutations
public onClientCreated(): void {
  this.showCreateForm = false;
  this.loadClients(); // Re-fetches from API
}

private loadClients(): void {
  this.clients$ = this.clientApi.getFall();
}
```

### State Principles
* **No Global State Store:** Each component manages its own data needs
* **Observable Streams:** RxJS for reactive data flow
* **API as Source of Truth:** Always fetch fresh data after mutations
* **Local UI State:** Component properties for modals, loading flags, errors

---

## Styling System

### Design Token Architecture
All styles use **CSS custom properties** defined in `styles.scss`:

#### Color System
```scss
--color-primary: #3498db;
--color-primary-dark: #2980b9;
--color-primary-light: rgba(52, 152, 219, 0.1);

--color-text:: #2c3e50;
--color-text-mutated: #666;
--color-text-light: #999;
```

#### Spacing Scale
```scss
--space-xs: 0.25rem; // 4px
--space-sm: 0.5rem;  // 8px
--space-md: 0.75rem; // 12px
--space-lg: 1rem;    // 16px
--space-xl: 1.5rem;  // 24px
--space-2xl: 2rem;   // 32px
--space-3xl: 3rem;   // 48px
```

#### Status Colors
```scss
// Clients
--color-status-active-bg: #d4edda;
--color-status-active-text: #155724;

// Contracts
--color-status-draft-bg: #e2e3e5;
--color-status-completed-bg: #d1ecf1;

// Deliverables
--color-status-pending-bg: #fff3cd;
--color-status-inprogress-bg: #cce5ff;
```

### Component Styling

#### Component-Specific Styles
```scss
// Component SCSS (client-list.component.scss)
.client-item {
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  padding: var(--space-xl);

  &:hover {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-lg);
  }
}
```

#### Global Utilities *(styles.scss)*
```scss
// Status badges
.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);

  &.active { /* Active styling */ }
  &.draft { /* Draft styling */ }
}

// Modals
.modal-backdrop {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: var(--z-modal);
}
```

---

## API Integration

### API Service Pattern
Each feature has a dedicated API service:

#### Client API Service
```typescript
@Injectable({ providedIn: "root" })
export class ClientApi {
  private readonly baseUrl = `${API_BASE_URL}/clients`;

  constructor(private readonly http: HttpClient) { }

  public post(dto: ClientPostDto): Observable<ClientGetDto> {
    return this.http.post<ClientGetDto>(this.baseUrl, dto);
  }

  public getAll(): Observable<ClientGetDto[]> {
    return this.http.get<ClientGetDto[]>(this.baseUrl);
  }
}
```

### DTOs (Data Transfer Objects)
TypeScript interfaces mirror backend contracts:
```typescript
export interface ClientGetDto {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  createdAt: Date;
  updatedAt: Date;
  contracts: ContractGetDto[];
}

export interface ClientPostDto {
  name: string;
  email: string;
}
```

#### Error Handling
```typescript
this.clientApi.post(dto).subscribe({
  next: (result) => {
    this.isSubmitting = false;
    this.saved.emit(result);
  },
  error: (er) => {
    this.isSubmitting = false;
    this.error = er.error?.message || "Failed to create client";
  }
});
```

---

## Development

### Running Tests
```shell
ng test
```

### Building for Production
```shell
ng build --configuration production
```
Output will be in `dist/scopetrack/`.

### Code Generation
```shell
# Generate new component
ng generate component features/clients/components/client-card

# Generate new service
ng generate service features/clients/services/client-state

# Generate new interface
ng generate interface shared/models/api-response
```

### Development Guidelines

#### Component Organization
1. **Feature folders** – Group all realted components, services, and models
2. **Standalone components** – Use Angular 20+ standalone API (no NGModules)
3. **Explicit imports** – Import only what's needed in component metadata
4. **Type safety** – Use DTOs for all API communication

### Reactive Patterns
1. **Observable suffixes** – Use `$` suffix for observable properties (`clients$`)
2. **Async pipe** – Subscribe in templates, not components
3. **No manual unsubscribe** – Let async pipe handle subscriptions
4. **BehaviorSubject for state** – When local state needs to be shared reactively

### Form Handling
1. **Reactive Forms** – Use `FormBuilder` and `FormGroup`
2. **Validation** – Apply validators at form creation
3. **Error display** – Show field-level errors on touch
4. **Disable on submit** – Prevent double submissions

### API Communication
1. **Service layer** – All HTTP calls in dedicated API services
2. **Type all responses** – Use DTOs for request/response types
3. **Error handling** – Catch and display user-friendly messages
4. **Loading states** – Show feedback during async operations

### Styling
1. **Design tokens** – Use CSS variables from global scope
2. **Component styles** – Keep component-specific styles in component SCSS
3. **No inline styles** – Maintain separation of concerns
4. **Responsive design** – Use CSS Grid and Flexbox

### Navigation Flow
```text
Dashboard (/)
├─ Clients (/clients)
│  ├─ Client Details Modal
│  │  ├─ Update Client Form Modal
│  │  ├─ Add Contract Form Modal
│  │  └─ Contract Details Modal
│  │     ├─ Add Deliverable Form Modal
│  │     └─ Deliverable Details Modal
│  └─ Create Client Form Modal
│
└─ Contracts (/contracts)
   └─ Contract Details Modal
      ├─ Add Deliverable Form Modal
      └─ Deliverable Details Modal
```

### Modal Nesting Strategy
* Each modal manages its own sub-modals
* Parent modal handles closing of child modals
* Date reload propagates up the chain
* Closing a parent modal closes all children

---

## Environment Configuration

### Development
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiBaseUrl: "http://localhost:5253/api"
};
```

### Production
```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiBaseUrl: "https://api.yourproductiondomain.com/api" 
};
```

---

## Browser Compatibility
* Chrome 90+
* Firefox 88+
* Safari 14+
* Edge 90+

---

## License
Open source.\
MIT License as defined in the repository[LICENSE](/LICENSE).
