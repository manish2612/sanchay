import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/features/Auth/api';
import type { Company } from '@/types/models/Company';

// We can't import RootState directly from index.ts because index.ts will import us
// to configure the store (circular dependency). We'll define the state type shape here 
// or import it if the store index avoids circularity. Actually, usually it's fine 
// as long as we only use the type `RootState`.

interface AuthState {
  user: User | null;
  companies: Company[];
  activeCompanyId: string | null;
}

const initialState: AuthState = {
  user: null,
  companies: [],
  activeCompanyId: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; companies: Company[] }>
    ) => {
      state.user = action.payload.user;
      state.companies = action.payload.companies;
    },
    setActiveCompany: (state, action: PayloadAction<string>) => {
      state.activeCompanyId = action.payload;
    },
    addCompany: (state, action: PayloadAction<Company>) => {
      state.companies.push(action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.companies = [];
      state.activeCompanyId = null;
    },
  },
});

export const { setCredentials, setActiveCompany, addCompany, logout } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectCompanies = (state: { auth: AuthState }) => state.auth.companies;
export const selectActiveCompanyId = (state: { auth: AuthState }) => state.auth.activeCompanyId;
export const selectActiveCompany = (state: { auth: AuthState }) =>
  state.auth.companies.find((c) => c.id === state.auth.activeCompanyId) || null;

export default authSlice.reducer;
