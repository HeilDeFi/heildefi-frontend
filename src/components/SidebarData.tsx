import React from 'react'
import * as FaIcons from 'react-icons/fa' 
import * as IconName  from "react-icons/bi";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <FaIcons.FaHome />
    },
    {
        title: 'LaunchPad',
        path: '/idos',
        icon: <FaIcons.FaFunnelDollar />
    },
    {
        title: 'Multi Sender',
        path: '/multisender',
        icon: <IconName.BiTransferAlt />
    },
    {
        title: 'Go To Future',
        path: '/gotothefuture',
        icon: <FaIcons.FaRocket />
    },
    {
        title: 'Grants',
        path: '/grants',
        icon: <FaIcons.FaDonate/>
    },
    {
        title: 'Buy Crypto',
        path: '/buycrypto',
        icon: <FaIcons.FaCreditCard />
    }

]
