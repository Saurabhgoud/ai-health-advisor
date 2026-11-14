import { useState } from "react";
import {
  FiBell,
  FiCalendar,
  FiChevronDown,
  FiLogOut,
  FiMenu,
  FiSearch,
  FiSettings,
  FiUser
} from "react-icons/fi";
import "./Navbar.css";
function Navbar({
  user,
  onLogout,
  onMenuClick,
  onSettingsClick,
  notificationCount = 3
}) {
  const [searchText, setSearchText] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const firstName = user?.name?.trim().split(" ")[0] || "User";
  const userInitial = firstName.charAt(0).toUpperCase();
  const currentHour = (new Date()).getHours();
  let greeting = "Good Evening";
  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 17) {
    greeting = "Good Afternoon";
  }
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date());
  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchText.trim();
    if (!query) {
      return;
    }
    console.log("Dashboard search:", query);
  };
  const handleLogoutClick = () => {
    setIsProfileOpen(false);
    onLogout?.();
  };
  return <header className="health-navbar">
      <section className="health-navbar-greeting">
        <button
    type="button"
    className="navbar-menu-button"
    onClick={onMenuClick}
    aria-label="Open sidebar"
  >
          <FiMenu />
        </button>

        <div>
          <h1>
            {greeting},<br /> {firstName}
            <span className="greeting-emoji">👋</span>
          </h1>

          <p>Here&apos;s your health overview</p>
        </div>
      </section>


      <section className="health-navbar-actions">


        <div className="navbar-profile-wrapper">
          <button
    type="button"
    className="navbar-profile-button"
    onClick={() => setIsProfileOpen((previousValue) => !previousValue)}
    aria-expanded={isProfileOpen}
  >
            {user?.profileImage ? <img
    src={user.profileImage}
    alt={user.name || "User"}
    className="navbar-profile-image"
  /> : <span className="navbar-profile-avatar">{userInitial}</span>}

            <span className="navbar-profile-name">{firstName}</span>

            <FiChevronDown
    className={isProfileOpen ? "profile-arrow profile-arrow-open" : "profile-arrow"}
  />
          </button>

          {isProfileOpen && <div className="navbar-profile-dropdown">
              <div className="profile-dropdown-user">
                <span>
                  <FiUser />
                </span>

                <div>
                  <strong>{user?.name || "User"}</strong>

                  <p>{user?.email || "No email available"}</p>
                </div>
              </div>

              <button
    type="button"
    onClick={handleLogoutClick}
    className="profile-logout-button"
  >
                <FiLogOut />
                Logout
              </button>
            </div>}
        </div>

        <button type="button" className="navbar-date-button">
          <span>{formattedDate}</span>
          <FiCalendar />
        </button>
      </section>
    </header>;
}
export default Navbar;
