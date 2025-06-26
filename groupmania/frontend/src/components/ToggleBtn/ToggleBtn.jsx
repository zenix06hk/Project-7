// "use client";

// import React from "`react";
// import { useEffect, useState } from "react";
// import { FaMoon } from "react-icons/fa";
// import { BaSunFill } from "react-icons/bs";

// const ToggleBtn = () => {
//   const [darkMode, setDarkMode] = useState(true);

//   useEffect(() => {
//     const theme = localStorage.getItem("theme");
//     if (theme === "dark") setDarkMode(true)}, [])

//       useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [darkMode]);

//   function ToggleBtn(){
//   return (<div className=" relative w-16 h-8 items-center dark:bg-gray-900 bg-teal-500 cursor-pointer rounded-full p-1 "
//     onclick={() => setDarkMode(!darkMode)}>
//       <FaMoon className = "text-white" size ={18}>
//         <div className={absolute bg-white dark:bg-midium" ${darkMode ? "translate-x-8" : "translate-x-0"}`}>
//       </div>);
//   }
// export default ToggleBtn;
