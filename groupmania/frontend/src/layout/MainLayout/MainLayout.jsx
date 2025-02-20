// import Header from "../../components/Header/Header";
// import Sidebar from "../../components/Sidebar/Sidebar";

function HomeLayout({ children }) {
  return (
    <div className="mainLayout">
      <ThemeProvider attribute="class" defaultTheme="system">
        <Header />
        <Sidebar />
        {children}
      </ThemeProvider>
    </div>
  );
}

export default HomeLayout;
