import React from "react";
import { CopilotKit } from "@copilotkit/react-core"; 
import "@copilotkit/react-ui/styles.css";

export default function RootLayout({ children }) {
  return (
    <CopilotKit publicApiKey={process.env.REACT_APP_COPILOT_KEY}>
      {children}
    </CopilotKit>
  );
}
