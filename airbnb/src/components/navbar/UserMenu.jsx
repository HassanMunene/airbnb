'use client';
//contextMenu is the popUp that shows login, signup and other options

import {RxHamburgerMenu} from "react-icons/rx";
import Image from "next/image";
import { useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

const UserMenu = () => {
    const [iscontextMenuVisible, setIscontextMenuVisible] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const toggleContextMenu = () => {
        setIscontextMenuVisible((prev) => !prev);
    }

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={() => {}}
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                >
                    Airbnb your home
                </div>
                <div
                    onClick={toggleContextMenu}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <RxHamburgerMenu />
                    <div className="hidden md:block">
                        <Image 
                            src="/empty-profile.png"
                            alt="empty profile"
                            height="30"
                            width="30"
                        />
                    </div>
                </div>
            </div>
            {iscontextMenuVisible && (
                <div className="absolute bg-white right-0 top-12 rounded-xl shadow-md w-[40vw] md:w-3/4 overflow-hidden text-sm">
                    <div className="flex flex-col cursor-pointer">
                        <div>
                            <MenuItem onClick={loginModal.onOpen} label="Login"/>
                            <MenuItem onClick={registerModal.onOpen} label="Sign up"/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default UserMenu;