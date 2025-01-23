// import Header from "../../components/Header/Header";
// import Sidebar from "../../components/Sidebar/Sidebar";

function HomeLayout({ children }) {
  return (
    <div className="mainLayout">
      <Header />
      <Sidebar />
      {children}
    </div>
  );
}

export default HomeLayout;
