import UserSync from "./UserSync";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ChatFloatingButton from "../components/ChatFloatingButton";

export default function UsersLayout({ children }) {
  return (
    <>
      <UserSync />
      <Navbar />
      {children}
      <ChatFloatingButton />
      <Footer />
    </>
  );
}
