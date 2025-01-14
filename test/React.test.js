import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBox from '../my-react-app/src/components/SearchBox';
import UserDetails from '../my-react-app/src/components/UserDetails';
import RepoDetails from '../my-react-app/src/components/RepoDetails';
import axios from 'axios';

// Mocking axios requests
jest.mock('axios');

describe('Component Tests (with Mocked API calls)', () => {
    
  // Snapshot test for search page.
  it('matches the snapshot', () => {
    const { asFragment } = render(<SearchBox onUserSelect={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });

  // Test 1: Check if SearchBox updates input value
  it('should update input value in SearchBox', () => {
    render(<SearchBox onUserSelect={() => {}} />);
    fireEvent.change(screen.getByPlaceholderText('Enter a username to search'), { target: { value: 'octocat' } });
    expect(screen.getByPlaceholderText('Enter a username to search').value).toBe('octocat');
  });

  // Test 2: Check if SearchBox triggers API call on button click
  it('should trigger API call when SearchBox button is clicked', async () => {
    const onUserSelect = jest.fn();
    
    // Mock API response
    axios.get.mockResolvedValue({ data: { items: [{ login: 'octocat' }] } });

    render(<SearchBox onUserSelect={onUserSelect} />);
    fireEvent.click(screen.getByText('Search'));

    // Wait for the API call to complete and ensure onUserSelect is triggered
    await waitFor(() => expect(onUserSelect).toHaveBeenCalledWith('octocat'));
  });

  // Test 3: Check if UserDetails shows loading message when no username
  it('should show loading message in UserDetails when no username is provided', () => {
    render(<UserDetails username={null} onRepoSelect={() => {}} />);
    expect(screen.getByText('Loading user details...')).toBeInTheDocument();
  });

  // Test 4: Check if RepoDetails renders repo name
  it('should display repository name in RepoDetails', async () => {
    // Mock API response for repositories
    axios.get.mockResolvedValue({ data: { name: 'Hello-World', description: 'Test repo' } });

    render(<RepoDetails owner="octocat" repo="Hello-World" />);
    expect(screen.getByText('Repository: Hello-World')).toBeInTheDocument();
  });
});
