// src/components/FilterSort.tsx
import React, { useState } from 'react';
import {
  DropdownContainer,
  FormGroup,
  SubmitButton,
  Button,
} from '../styles/FilterSort.styles';

interface FilterSortProps {
  onFilterChange: (filter: FilterOptions) => void;
  onSortChange: (sort: SortOptions) => void;
}

interface FilterOptions {
  status: string;
  dueDate: string;
}

interface SortOptions {
  sortBy: string;
  order: string;
}

const FilterSort: React.FC<FilterSortProps> = ({
  onFilterChange,
  onSortChange,
}) => {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [isSortVisible, setSortVisible] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    status: 'all',
    dueDate: '',
  });
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    sortBy: 'due-date',
    order: 'asc',
  });

  const toggleFilterVisibility = () => {
    setFilterVisible(!isFilterVisible);
    setSortVisible(false); // Close sort if open
  };

  const toggleSortVisibility = () => {
    setSortVisible(!isSortVisible);
    setFilterVisible(false); // Close filter if open
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilterOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSortOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filterOptions);
    setFilterVisible(false);
  };

  const handleSortSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSortChange(sortOptions);
    setSortVisible(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '50%',
        justifyContent: 'end',
        marginRight: '16px',
      }}
    >
      <DropdownContainer isVisible={isFilterVisible}>
        <Button onClick={toggleFilterVisibility}>Filter</Button>
        <div>
          <form onSubmit={handleFilterSubmit}>
            <FormGroup>
              <label>Status</label>
              <select
                name="status"
                value={filterOptions.status}
                onChange={handleFilterChange}
              >
                <option value="all">All</option>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="complete">Complete</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={filterOptions.dueDate}
                onChange={handleFilterChange}
              />
            </FormGroup>
            <SubmitButton type="submit">Apply Filter</SubmitButton>
          </form>
        </div>
      </DropdownContainer>

      <DropdownContainer isVisible={isSortVisible}>
        <Button onClick={toggleSortVisibility}>Sort</Button>
        <div>
          <form onSubmit={handleSortSubmit}>
            <FormGroup>
              <label>Sort By</label>
              <select
                name="sortBy"
                value={sortOptions.sortBy}
                onChange={handleSortChange}
              >
                <option value="due-date">Due Date</option>
                <option value="name">Name</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Order</label>
              <select
                name="order"
                value={sortOptions.order}
                onChange={handleSortChange}
              >
                <option value="asc">Earliest</option>
                <option value="desc">Latest</option>
              </select>
            </FormGroup>
            <SubmitButton type="submit">Apply Sort</SubmitButton>
          </form>
        </div>
      </DropdownContainer>
    </div>
  );
};

export default FilterSort;
