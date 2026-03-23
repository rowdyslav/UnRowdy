export interface AppContextType {
  currentPage: number;
  selectedCategoryId: string;
  selectedCategoryName: string;
  searchQuery: string;
  openCategories: () => void;
  selectCategory: (categoryId: string) => void;
  selectSubCategory: (categoryName: string) => void;
  setSearchQuery: (value: string) => void;
  goBack: () => void;
}

