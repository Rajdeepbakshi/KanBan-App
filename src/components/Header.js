import React, { useState } from "react";
import Logo from "../assets/logo-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropDown from "./HeaderDropDown";
import ElipsisMenu from "./ElipsisMenu";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";
import { logout } from "../redux/userSlice";

function Header({ setIsBoardModalOpen, isBoardModalOpen }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  const user = useSelector((state) => state.user.currentUser);
  const board = boards.find((board) => board.isActive);

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // Replace this with your actual logout avatar image URL:
  const logoutAvatarUrl =
    "https://cdn-icons-png.flaticon.com/512/1828/1828479.png";

  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      <header className="flex justify-between items-center dark:text-white">
        {/* Left Side */}
        <div className="flex items-center gap-3 md:gap-6">
          <img src={Logo} alt="Logo" className="h-6 w-6" />
          <h3 className="md:text-3xl hidden md:inline-block font-bold font-sans">
            kanban
          </h3>

          <div className="flex items-center">
            <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-10 font-sans">
              {board?.name || "No Board"}
            </h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt="dropdown"
              className="w-3 ml-2 md:hidden"
              onClick={onDropdownClick}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 md:gap-4 relative">
          {/* Avatar with hover email */}
          {user?.email && (
            <div className="relative group">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold uppercase">
                {user.email[0]}
              </div>
              <div className="absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                {user.email}
              </div>
            </div>
          )}

          {/* Logout Avatar Image */}
          {user?.email && (
            <button
              onClick={handleLogout}
              className="bg-red-500 rounded-full hover:bg-red-500/20 p-1 rounded transition"
              title="Logout"
            >
              <img
                src={logoutAvatarUrl}
                alt="Logout"
                className="h-6 w-6 rounded-full"
              />
            </button>
          )}

          {/* Add Task Buttons */}
          <button
            className="button hidden md:block"
            onClick={() => setIsTaskModalOpen((prev) => !prev)}
          >
            + Add New Task
          </button>
          <button
            className="button py-1 px-3 md:hidden"
            onClick={() => setIsTaskModalOpen((prev) => !prev)}
          >
            +
          </button>

          {/* Elipsis menu */}
          <img
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false);
              setIsElipsisMenuOpen((prev) => !prev);
            }}
            src={elipsis}
            alt="elipsis"
            className="cursor-pointer h-6"
          />
          {isElipsisMenuOpen && (
            <ElipsisMenu
              type="Boards"
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
        </div>
      </header>

      {/* Dropdown */}
      {openDropdown && (
        <HeaderDropDown
          setOpenDropdown={setOpenDropdown}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}

      {/* Modals */}
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}

      {isBoardModalOpen && (
        <AddEditBoardModal
          setBoardType={setBoardType}
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board?.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}

export default Header;
