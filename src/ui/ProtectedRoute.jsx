import styled from 'styled-components';
import { useUser } from './../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background: var(--color-grey-50);
  display: flex;
  align-items: center;
`;
function ProtectedRoute({ children }) {
  // load authintcated user
  const { isLoading, user, isAuthencated, fetchStatus } = useUser();
  const navigate = useNavigate();

  // show spinner while this happening
  useEffect(() => {
    if (!isAuthencated && !isLoading && fetchStatus !== 'fetching')
      navigate('/login');
  }, [isAuthencated, isLoading, navigate, fetchStatus]);
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  // if there is no auth users redirected to login page

  // if(!isAuthencated)

  // if there is a user render the app
  if (isAuthencated) return children;
}

export default ProtectedRoute;
