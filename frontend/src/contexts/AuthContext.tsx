import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

type User = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultUser: User = {
  id: 'guest-user',
  email: 'guest@ecorides.app',
  full_name: 'Guest Rider',
  avatar_url: undefined,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(defaultUser);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, _password: string) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setUser({
      id: crypto.randomUUID(),
      email,
      full_name: email.split('@')[0] || 'Eco Rider',
    });
    setLoading(false);
  };

  const signup = async (email: string, _password: string, fullName: string) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setUser({
      id: crypto.randomUUID(),
      email,
      full_name: fullName || 'Eco Rider',
    });
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    setUser(defaultUser);
    setLoading(false);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      signup,
      logout,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}