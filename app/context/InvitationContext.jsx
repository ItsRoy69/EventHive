import React, { createContext, useState } from "react";

const InvitationContext = createContext({
  sendInvitation: true,
  setSendInvitation: () => {},
});

// const InvitationContext = createContext(null)

const InvitationProvider = ({ children }) => {
  const [sendInvitation, setSendInvitation] = useState(false);

  return (
    <InvitationContext.Provider value={{ sendInvitation, setSendInvitation }}>
      {children}
    </InvitationContext.Provider>
  );
};

export { InvitationContext, InvitationProvider };
