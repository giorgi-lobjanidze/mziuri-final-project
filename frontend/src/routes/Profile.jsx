import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLoader } from '../context/LoaderContext';
import { useUserData } from '../context/UserContext';
import { useWishlist } from '../context/WishlistContext';

function Profile() {
  const { useFakeLoader } = useLoader();
  useEffect(() => {
    useFakeLoader();
  }, []);

  const { loggedIn, userData, logout, authChecked } = useUserData();
  const navigate = useNavigate();

  const { wishlist } = useWishlist();

  useEffect(() => {
    if (authChecked && !loggedIn) navigate('/login');
  }, [authChecked, loggedIn]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!authChecked) return null;
  if (!userData) return null;

  const defaultAddress =
    userData.addresses?.find((a) => a.isDefault) ?? userData.addresses?.[0] ?? null;

  return (
    <>
      <div className="account-page">
        <h1 className="account-title">Account</h1>

        <div className="account-body">
          {/* sidebar */}
          <div className="account-sidebar">
            <p className="account-welcome">
              <span>Welcome</span>{' '}
              <strong>
                {userData.firstName} {userData.lastName}
              </strong>
            </p>

            <h3>Order History</h3>
            <div className="account-no-orders">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 7h18l-1.5 12a2 2 0 0 1-2 1.8H6.5a2 2 0 0 1-2-1.8L3 7z" />
                <path d="M8 7V5a4 4 0 0 1 8 0v2" />
              </svg>
              <Link to="/shop">
                <u>Make Your First Order</u>
              </Link>
              <p>You Haven't Placed Any Orders Yet.</p>
            </div>

            <nav className="account-nav">
              <button className="active">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="3"
                    y="3"
                    width="7"
                    height="7"
                  />
                  <rect
                    x="14"
                    y="3"
                    width="7"
                    height="7"
                  />
                  <rect
                    x="14"
                    y="14"
                    width="7"
                    height="7"
                  />
                  <rect
                    x="3"
                    y="14"
                    width="7"
                    height="7"
                  />
                </svg>
                Dashboard
              </button>
              <button onClick={() => navigate('/checkout')}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Check Out
              </button>
              <button onClick={() => navigate('/addresses')}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                  />
                </svg>
                View Addresses ({userData?.addresses?.length ?? 0})
              </button>
              <button onClick={() => navigate('/wishlist')}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                View Wishlist ({wishlist.length})
              </button>
              <button onClick={handleLogout}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line
                    x1="21"
                    y1="12"
                    x2="9"
                    y2="12"
                  />
                </svg>
                Logout
              </button>
            </nav>
          </div>

          {/* details */}
          <div className="account-details">
            <h2>Account Details:</h2>
            <table className="account-table">
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>
                    {userData.firstName} {userData.lastName}
                  </td>
                </tr>
                <tr>
                  <td>Country:</td>
                  <td>{defaultAddress?.country ?? 'United States'}</td>
                </tr>
                <tr>
                  <td>E-Mail:</td>
                  <td>{userData.email}</td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>{defaultAddress?.phone ?? ''}</td>
                </tr>
                <tr>
                  <td>City:</td>
                  <td>{defaultAddress?.city ?? ''}</td>
                </tr>
                <tr>
                  <td>Zip:</td>
                  <td>{defaultAddress?.zip ?? ''}</td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td>{defaultAddress?.address1 ?? ''}</td>
                </tr>
                <tr>
                  <td>Address 2:</td>
                  <td>{defaultAddress?.address2 ?? ''}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
