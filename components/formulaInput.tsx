import React, { useState, useEffect, useRef } from "react";
import { useFormulaStore } from "../stores/formulaStore";
import { useAutoComplete } from "../hooks/useAutoComplete";
import { debounce } from "lodash";
import { Select } from "antd";

const FormulaInput = () => {
  const { selectedSuggestions, addSuggestion, removeSuggestion } = useFormulaStore();
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef(null); 

  const debouncedSetSearchTerm = debounce((value: string) => {
    setSearchTerm(value); 
  }, 300);

  const { data: suggestions, isLoading, isError } = useAutoComplete(searchTerm);

  const handleSuggestionSelect = (values: string[]) => {
    values.forEach((value) => {
      addSuggestion(value);
    });
  };

  const handleSearch = (value: string) => {
    if (value.endsWith(" ")) {
      const term = value.trim(); 
      if (term) {
        addSuggestion(term); 
        setSearchTerm(""); 
      }
    } else {
      debouncedSetSearchTerm(value); 
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" ) {
      console.log("e",e.key);
      if (selectedSuggestions.length > 0) {
        removeSuggestion(selectedSuggestions.length - 1);
      }
    }
  };

  useEffect(() => {
    return () => {
      debouncedSetSearchTerm.cancel();
    };
  }, []);
  

  return (
    <div>
      <Select
        mode="tags" 
        showSearch
        value={selectedSuggestions}
        placeholder="Search for variables, functions, or operators"
        optionFilterProp="children"
        onChange={handleSuggestionSelect} 
        onSearch={handleSearch} 
        onKeyDown={handleKeyDown}
        suffixIcon={null} 
        filterOption={false} 
        options={(suggestions || []).map((d) => ({
          value: d.name,
          label: d.name, 
        }))}
        style={{ width: "100%" }}
        notFoundContent={isLoading ? "Loading..." : "No results found"}
        ref={selectRef}
      />
      {isError && <div>Error fetching suggestions</div>}
    </div>
  );
};

export default FormulaInput;