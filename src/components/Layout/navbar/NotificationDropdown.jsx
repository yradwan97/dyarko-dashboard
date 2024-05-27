import React, { Fragment, useEffect, useState } from 'react';
import { VscBell } from 'react-icons/vsc';
import { Menu, Transition } from '@headlessui/react';
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useGetNotifications } from 'features/notifications/hooks/useGetNotifications';
import { useAppSelector } from 'hooks';
import { t } from 'i18next';
import i18next from 'i18next';

const getNotificationColor = (index) => {
  if (index % 3 === 0) return 'bg-red';
  else if (index % 2 === 0) return 'bg-main-600';
  else return 'bg-main-yellow-600';
};

function NotificationDropdown() {
  useGetNotifications(1);
  const notifications = useAppSelector((state) => state.notifications.notifications);
  const unreadNotifications = useAppSelector((state) => state.notifications.unreadNotifications);

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        as='button'
        disabled={window.location.pathname === "/notifications"}
        className={`w-10 h-10 rounded-lg bg-main-100 flex justify-center items-center  ${window.location.pathname === "/notifications" ? 'opacity-50' : 'bg-main-100'}`}
      >
        <VscBell className="text-black text-2xl" />
        {unreadNotifications > 0 && (
          <span className="absolute -bottom-[8.65px] -right-[6.65px] bg-red text-white text-[10px] rounded-full px-1.5 py-0.5 z-20">
            {unreadNotifications}
          </span>
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute items-center ltr:right-0 rtl:left-0 mt-2 py-4 w-[350px] max-h-[400px] overflow-y-auto origin-top-right rounded-md z-2 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex justify-between items-center px-5 mb-5">
            <h4 className="text-black font-bold capitalize">{t("pages.notifications.notifications")}</h4>
            <Link to="/notifications" className="capitalize text-main-600 text-sm font-bold text-center">
              {t("pages.notifications.see-all")}
            </Link>
          </div>
          {notifications.map((n, i) => (
            <Menu.Item key={i} as={Fragment}>
              {({ active }) => (
                <Link to="/notifications">
                  <div className={`px-5 py-3 ${!n?.is_read ? `bg-main-200 cursor-pointer` : ""} hover:bg-main-100 flex gap-x-4 border-b border-gray-100 m-1 rounded-lg last:border-b-0`}>
                    <div>
                      <span className={`w-10 h-10 rounded-full ${getNotificationColor(i)} flex justify-center items-center`}>
                        <AiFillHome className="text-lg text-white" />
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h6 className="text-black font-bold capitalize">{i18next.language === "en" ? n.title_en : n.title_ar}</h6>
                      <p className="text-gray-600 text-sm">{i18next.language === "en" ? n.body_en : n.body_ar}</p>
                    </div>
                  </div>
                </Link>
              )}
            </Menu.Item>
          ))}
          <Link to="/notifications" className="text-main-600 capitalize text-sm font-bold block text-center mt-2">
            {t("pages.notifications.see-all")}
          </Link>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default NotificationDropdown;
