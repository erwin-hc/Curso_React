import Logo from "../Logo/Logo";
import AppNav from "../AppNav/AppNav";
import Footer from "../Footer/Footer";
import styles from "../Sidebar/Sidebar.module.css";
import { Link, Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Link to={"/"}>
        <Logo />
      </Link>
      <AppNav />

      <Outlet />

      <Footer />
    </div>
  );
}
