"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setCredentials, logout } from "../../store/slices/authSlice";
import { useLazyGetMeQuery } from "../../store/api/authApi";

export function AuthInitializer() {
  const dispatch = useDispatch();
  const access = useSelector((state: RootState) => state.auth.accessToken);
  const refresh = useSelector((state: RootState) => state.auth.refreshToken);
  const user = useSelector((state: RootState) => state.auth.user);

  const [triggerGetMe] = useLazyGetMeQuery();

  useEffect(() => {
    let mounted = true;

    async function init() {
      // If we already have a user, nothing to do
      if (!mounted) return;
      if (user) return;

      // If we have at least one token, attempt to fetch /auth/me/
      if (access || refresh) {
        try {
          const me = await triggerGetMe().unwrap();
          // Keep tokens as they are; backend refresh flow may update them later via baseApi
          dispatch(setCredentials({ access: access ?? "", refresh: refresh ?? "", user: me }));
        } catch (err) {
          // can't fetch user; logout to clear bad tokens
          dispatch(logout());
        }
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, [access, refresh, user, dispatch, triggerGetMe]);

  return null;
}
