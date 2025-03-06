import { useQuery } from "@tanstack/react-query";

interface Suggestion {
  id: string;
  name: string;
  category: string;
  value:string;
}

const fetchSuggestions = async (searchTerm: string): Promise<Suggestion[]> => {
  const response = await fetch(
    `https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete?name=${searchTerm}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch suggestions");
  }
  const data = await response.json();
  return data;
};

export const useAutoComplete = (searchTerm: string) => {
  return useQuery<Suggestion[], Error>({
    queryKey: ["suggestions", searchTerm],
    queryFn: () => fetchSuggestions(searchTerm),
    enabled: searchTerm.length > 0, 
    staleTime: 1000 * 60 * 5, 
  });
};