import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FormulaInput from "../components/formulaInput";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <h1>Formula Editor</h1>
        <FormulaInput />
    </QueryClientProvider>
  );
};

export default App;
