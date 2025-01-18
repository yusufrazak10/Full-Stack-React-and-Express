import { render, screen, fireEvent, waitFor } from '@testing-library/react'; // Importing necessary functions from RTL
import SearchBox from '../my-react-app/src/components/SearchBox'; // Importing components to test
import UserDetails from '../my-react-app/src/components/UserDetails';
import RepoDetails from '../my-react-app/src/components/RepoDetails';
import axios from 'axios'; // Importing axios to mock API calls

// Mocking axios to avoid actual API calls during testing
jest.mock('axios');

describe('Component Tests (with Mocked API calls)', () => {
  
  // Snapshot test for SearchBox component
  it('matches the snapshot for SearchBox', () => {
    const { asFragment } = render(<SearchBox onUserSelect={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });

  // Test 1: Check if SearchBox updates the input value correctly
  it('should update input value in SearchBox', () => {
    render(<SearchBox onUserSelect={() => {}} />);
    const input = screen.getByPlaceholderText('Enter a username to search');
    fireEvent.change(input, { target: { value: 'octocat' } });
    expect(input.value).toBe('octocat');
  });

  // Test 2: Check if SearchBox triggers API call on button click
  it('should trigger API call when SearchBox button is clicked', async () => {
    const onUserSelect = jest.fn();
    
    // Mock API response for search results
    axios.get.mockResolvedValue({ data: { items: [{ login: 'octocat' }] } });

    render(<SearchBox onUserSelect={onUserSelect} />);
    
    // Trigger the button click event
    fireEvent.click(screen.getByText('Search'));

    // Wait for the API call to complete and ensure onUserSelect is called with the correct username
    await waitFor(() => expect(onUserSelect).toHaveBeenCalledWith('octocat'));
  });

  // Test 3: Check if UserDetails shows loading message when no username is provided
  it('should show loading message in UserDetails when no username is provided', () => {
    render(<UserDetails username={null} onRepoSelect={() => {}} />);
    expect(screen.getByText('Loading user details...')).toBeInTheDocument();
  });

  // Test 4: Check if RepoDetails renders repo name and description correctly
  it('should display repository name and description in RepoDetails', async () => {
    // Mock API response for repository details
    axios.get.mockResolvedValue({ data: { name: 'Hello-World', description: 'Test repo' } });

    render(<RepoDetails owner="octocat" repo="Hello-World" />);

    // Ensure that the repository name and description appear in the document
    expect(screen.getByText('Repository: Hello-World')).toBeInTheDocument();
    expect(screen.getByText('Description: Test repo')).toBeInTheDocument();
  });
});



