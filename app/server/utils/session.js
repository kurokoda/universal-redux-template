export function getSessionState(session) {
  return {
    auth: {
      loggedIn: session.loggedIn || false
    }
  };
}
