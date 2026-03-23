import {useMemo, useReducer} from "react";
import type {PropsWithChildren} from "react";
import {AppContext} from "@/app/providers/appContext.ts";
import type {AppContextType} from "@/app/providers/AppContextTypes.ts";

const DEFAULT_CATEGORY_NAME = "Веб-разработка";

interface AppState {
  selectedCategoryId: string;
  selectedCategoryName: string;
  searchQuery: string;
}

type AppAction =
  | {type: "select-category"; payload: string}
  | {type: "select-subcategory"; payload: string}
  | {type: "set-search-query"; payload: string};

const initialState: AppState = {
  selectedCategoryId: "",
  selectedCategoryName: DEFAULT_CATEGORY_NAME,
  searchQuery: "",
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "select-category":
      return {
        ...state,
        selectedCategoryId: action.payload,
      };
    case "select-subcategory":
      return {
        ...state,
        selectedCategoryName: action.payload,
        searchQuery: "",
      };
    case "set-search-query":
      return {
        ...state,
        searchQuery: action.payload,
      };
    default:
      return state;
  }
};

interface AppProviderProps extends PropsWithChildren {
  currentPage: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

const AppProvider = ({
  children,
  currentPage,
  goToNextPage,
  goToPreviousPage,
}: AppProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = useMemo<AppContextType>(() => ({
    currentPage,
    selectedCategoryId: state.selectedCategoryId,
    selectedCategoryName: state.selectedCategoryName,
    searchQuery: state.searchQuery,
    openCategories: goToNextPage,
    selectCategory: (categoryId: string) => {
      dispatch({type: "select-category", payload: categoryId});
      goToNextPage();
    },
    selectSubCategory: (categoryName: string) => {
      dispatch({type: "select-subcategory", payload: categoryName});
      goToNextPage();
    },
    setSearchQuery: (value: string) => {
      dispatch({type: "set-search-query", payload: value});
    },
    goBack: goToPreviousPage,
  }), [currentPage, goToNextPage, goToPreviousPage, state.searchQuery, state.selectedCategoryId, state.selectedCategoryName]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
