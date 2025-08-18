import React, { ReactNode } from "react";
import { CopilotKit } from "@copilotkit/react-core"; 


export default function RootLayout({ children }) {
  return (
    <CopilotKit publicApiKey="ck_pub_f2f7cac57eff497b7940dccdb6eef337">
      {children}
    </CopilotKit>
  );
}
