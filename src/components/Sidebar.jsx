import {
  FiBarChart2,
  FiCalendar,
  FiChevronRight,
  FiClipboard,
  FiCpu,
  FiDroplet,
  FiFileText,
  FiHome,
  FiLogOut,
  FiSettings,
  FiUser,
  FiX
} from "react-icons/fi";
import "./Sidebar.css";
const mainMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: FiHome
  },
  {
    id: "ai-advisor",
    label: "AI Health Advisor",
    icon: FiCpu
  },
  {
    id: "health-report",
    label: "Health Report",
    icon: FiFileText
  },
  {
    id: "nutrition",
    label: "Nutrition Tracker",
    icon: FiCalendar
  },
  {
    id: "water",
    label: "Water Tracker",
    icon: FiDroplet
  }
];
const accountMenuItems = [
  {
    id: "profile",
    label: "Profile",
    icon: FiUser
  }
];
function Sidebar({ isOpen, activeItem, onClose, onSelect, onLogout }) {
  const handleItemClick = (itemId) => {
    onSelect?.(itemId);
    onClose?.();
  };
  return <>
      <aside
    className={isOpen ? "health-sidebar health-sidebar-open" : "health-sidebar"}
  >
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-brand-logo">
              <span>AI</span>
            </div>

            <div className="sidebar-brand-text">
              <strong>AI Health</strong>
              <span>Nutrition Advisor</span>
            </div>
          </div>

          <button
    type="button"
    className="sidebar-close-button"
    onClick={onClose}
    aria-label="Close sidebar"
  >
            <FiX />
          </button>
        </div>

        <div className="sidebar-navigation">
          <nav className="sidebar-menu">
            <p className="sidebar-section-title">Main Menu</p>

            {mainMenuItems.map((item) => {
    const IconComponent = item.icon;
    const isActive = activeItem === item.id;
    return <button
      key={item.id}
      type="button"
      className={isActive ? "sidebar-menu-item sidebar-menu-item-active" : "sidebar-menu-item"}
      onClick={() => handleItemClick(item.id)}
    >
                  <span className="sidebar-item-icon">
                    <IconComponent />
                  </span>

                  <span className="sidebar-item-label">{item.label}</span>

                  <FiChevronRight className="sidebar-item-arrow" />
                </button>;
  })}
          </nav>

          <nav className="sidebar-menu sidebar-account-menu">
            <p className="sidebar-section-title">Account</p>

            {accountMenuItems.map((item) => {
    const IconComponent = item.icon;
    const isActive = activeItem === item.id;
    return <button
      key={item.id}
      type="button"
      className={isActive ? "sidebar-menu-item sidebar-menu-item-active" : "sidebar-menu-item"}
      onClick={() => handleItemClick(item.id)}
    >
                  <span className="sidebar-item-icon">
                    <IconComponent />
                  </span>

                  <span className="sidebar-item-label">{item.label}</span>

                  <FiChevronRight className="sidebar-item-arrow" />
                </button>;
  })}
          </nav>
        </div>

        <div className="sidebar-footer">
          <button
    type="button"
    className="sidebar-logout-button"
    onClick={onLogout}
  >
            <FiLogOut />
            <span>Logout</span>
          </button>

          <p>AI Health Advisor v1.0</p>
        </div>
      </aside>

      <button
    type="button"
    className={isOpen ? "sidebar-overlay sidebar-overlay-visible" : "sidebar-overlay"}
    onClick={onClose}
    aria-label="Close sidebar overlay"
  />
    </>;
}
export default Sidebar;
