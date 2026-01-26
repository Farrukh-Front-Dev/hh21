"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { AuthInitializer } from "./components/auth/AuthInitializer";
import { I18nProvider } from "./I18nProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <Provider store={store}>
        <AuthInitializer />
        {children}
      </Provider>
    </I18nProvider>
  );
}
