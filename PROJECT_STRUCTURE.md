# 📱 Login Dashboard - Project Structure

## Visual Overview

```
┌─────────────────────────────────────────────────┐
│                                                 │
│              React Native App                   │
│                                                 │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│              App.tsx (Root)                     │
│  ┌───────────────────────────────────────────┐  │
│  │       SafeAreaProvider                    │  │
│  │  ┌─────────────────────────────────────┐  │  │
│  │  │      AuthProvider                   │  │  │
│  │  │  ┌───────────────────────────────┐  │  │  │
│  │  │  │  NavigationContainer          │  │  │  │
│  │  │  │  ┌─────────────────────────┐  │  │  │  │
│  │  │  │  │   AppNavigator          │  │  │  │  │
│  │  │  │  │  ├─ LoginScreen         │  │  │  │  │
│  │  │  │  │  └─ DashboardScreen     │  │  │  │  │
│  │  │  │  └─────────────────────────┘  │  │  │  │
│  │  │  └───────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

## Authentication Flow

```
┌──────────────┐
│  App Starts  │
└──────┬───────┘
       │
       ▼
┌────────────────────────┐
│ Check AsyncStorage     │
│ for existing session   │
└──────┬─────────────┬───┘
       │             │
   ┌───▼───┐    ┌────▼────┐
   │ Found │    │ Not     │
   │Session│    │ Found   │
   └───┬───┘    └────┬────┘
       │             │
       ▼             ▼
┌──────────┐   ┌──────────┐
│Dashboard │   │  Login   │
│ Screen   │   │  Screen  │
└──────────┘   └─────┬────┘
                     │
              User Enters
              Credentials
                     │
                     ▼
              ┌──────────────┐
              │  Validation  │
              └──────┬───────┘
                     │
              ┌──────▼──────┐
              │ Valid?      │
              └──┬──────┬───┘
         ┌───────┘      └───────┐
      ┌──▼──┐               ┌───▼────┐
      │ Yes │               │   No   │
      └──┬──┘               │ Show   │
         │                  │ Errors │
         ▼                  └────────┘
    ┌──────────┐
    │ Call API │
    │ (Mocked) │
    └─────┬────┘
          │
          ▼
    ┌─────────────┐
    │Save to      │
    │AsyncStorage │
    └──────┬──────┘
           │
           ▼
    ┌──────────────┐
    │Update Context│
    └──────┬───────┘
           │
           ▼
    ┌──────────┐
    │Dashboard │
    │ Screen   │
    └──────────┘
```

## File Dependencies

```
App.tsx
├── src/context/AuthContext.tsx
│   ├── src/types/auth.types.ts
│   └── src/utils/storage.ts
│
├── src/screens/LoginScreen.tsx
│   ├── src/components/Button.tsx
│   ├── src/components/Input.tsx
│   ├── src/utils/validation.ts
│   ├── src/context/AuthContext.tsx
│   └── src/types/navigation.types.ts
│
└── src/screens/DashboardScreen.tsx
    ├── src/components/Button.tsx
    ├── src/context/AuthContext.tsx
    └── src/types/navigation.types.ts
```

## Component Hierarchy

```
LoginScreen
├── KeyboardAvoidingView
│   └── ScrollView
│       ├── Header (Welcome Back)
│       ├── Form
│       │   ├── Input (Email)
│       │   ├── Input (Password)
│       │   ├── Button (Sign In)
│       │   ├── Divider (OR)
│       │   └── Button (Create Account)
│       └── Footer (Demo Info)

DashboardScreen
├── ScrollView
│   ├── Header
│   │   ├── Avatar
│   │   ├── Welcome Text
│   │   ├── Name
│   │   └── Email
│   ├── Stats Container
│   │   ├── Stat Card (Tasks)
│   │   ├── Stat Card (Projects)
│   │   └── Stat Card (Teams)
│   ├── Cards Container
│   │   ├── Card (Profile)
│   │   ├── Card (Settings)
│   │   ├── Card (Analytics)
│   │   └── Card (Notifications)
│   └── Logout Button
```

## State Management

```
AuthContext
├── State
│   ├── user: User | null
│   ├── isAuthenticated: boolean
│   └── isLoading: boolean
│
└── Methods
    ├── login(credentials)
    ├── logout()
    └── register(credentials)
```

## Data Flow

```
User Action
    │
    ▼
Component (Screen)
    │
    ▼
AuthContext Method
    │
    ├─→ Validation (utils/validation.ts)
    │
    ├─→ API Call (mocked)
    │
    ├─→ Storage (utils/storage.ts)
    │
    └─→ State Update
            │
            ▼
    Context Re-render
            │
            ▼
    Navigation Change
```

## Key Files Summary

| File | Purpose | Lines |
|------|---------|-------|
| `App.tsx` | Root component with providers | ~80 |
| `src/context/AuthContext.tsx` | Global auth state | ~200 |
| `src/screens/LoginScreen.tsx` | Login UI | ~200 |
| `src/screens/DashboardScreen.tsx` | Dashboard UI | ~300 |
| `src/components/Button.tsx` | Reusable button | ~120 |
| `src/components/Input.tsx` | Reusable input | ~100 |
| `src/utils/validation.ts` | Form validation | ~60 |
| `src/utils/storage.ts` | AsyncStorage helpers | ~100 |
| `src/types/auth.types.ts` | Auth type definitions | ~30 |
| `src/types/navigation.types.ts` | Navigation types | ~20 |

**Total: ~1,200 lines of clean, maintainable code**

## Technology Stack

```
┌────────────────────────────────────┐
│        Application Layer           │
│  (Screens, Components, Logic)      │
├────────────────────────────────────┤
│      State Management Layer        │
│    (React Context, Hooks)          │
├────────────────────────────────────┤
│       Navigation Layer             │
│   (React Navigation Stack)         │
├────────────────────────────────────┤
│       Storage Layer                │
│   (AsyncStorage - Persistent)      │
├────────────────────────────────────┤
│      React Native Core             │
│   (Views, Text, TouchableOpacity)  │
├────────────────────────────────────┤
│      Platform Layer                │
│      (iOS / Android)               │
└────────────────────────────────────┘
```

## Design Patterns Used

1. **Context Provider Pattern** - Global state management
2. **Custom Hooks** - `useAuth()` for auth access
3. **Compound Components** - Reusable UI components
4. **Container/Presenter** - Screens handle logic, components handle UI
5. **Dependency Injection** - Props and context for data flow
6. **Error Boundaries** - Graceful error handling
7. **Single Responsibility** - Each file has one purpose

## Performance Optimizations

- ✅ `useCallback` for memoized functions
- ✅ Efficient re-renders with proper state management
- ✅ Native navigation with `@react-navigation/native-stack`
- ✅ KeyboardAvoidingView for better UX
- ✅ ScrollView with `keyboardShouldPersistTaps`
- ✅ StyleSheet for optimized styling
- ✅ Conditional rendering based on auth state

---

**This structure ensures:**
- 📦 Modularity
- 🔒 Type Safety
- 🎨 Clean Code
- 🚀 Scalability
- 🧪 Testability

