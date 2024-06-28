// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// import { Link } from "react-router-dom";

// const Siderbar = () => {
//     return (
//         <div className="min-h-screen bg-purple-400 w-1/6 text-gray-50 shadow-2xl">
//             <Accordion type="single" collapsible className="mx-3">
//                 <AccordionItem value="item-1">
//                     <AccordionTrigger>
//                         <Link to={"/dashboard/event"}>
//                             Event
//                         </Link>
//                     </AccordionTrigger>
//                     {/* <AccordionContent>
//                         Yes. It adheres to the WAI-ARIA design pattern.
//                     </AccordionContent> */}
//                 </AccordionItem>
//                 <AccordionItem value="item-2">
//                     <AccordionTrigger>Participant</AccordionTrigger>
//                     {/* <AccordionContent>
//                         Yes. It comes with default styles that matches the other
//                         components&apos; aesthetic.
//                     </AccordionContent> */}
//                 </AccordionItem>
//                 <AccordionItem value="item-3">
//                     <AccordionTrigger>Sponsor</AccordionTrigger>
//                     {/* <AccordionContent>
//                         Yes. It&apos;s animated by default, but you can disable it if you
//                         prefer.
//                     </AccordionContent> */}
//                 </AccordionItem>
//             </Accordion>
//         </div>
//     );
// }

// export default Siderbar;


'use client'

import { HandCoins, LandPlot, LayoutDashboard, LucideFootprints, Newspaper, PawPrint, PocketKnife, Rabbit, ShoppingBag, Star, Ticket, User, UserCog, UtensilsCrossed } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const adminSidebarLinks = [
    {
        icon: <LayoutDashboard className="w-6 h-6" />,
        route: '/dashboard',
        label: 'Overview'
    },
    {
        icon: <User className="w-6 h-6" />,
        route: '/dashboard/operator',
        label: 'Operator'
    },
    {
        icon: <HandCoins className="w-6 h-6" />,
        route: '/dashboard/sponsor',
        label: 'Sponsor'
    },
    {
        icon: <UserCog className="w-6 h-6" />,
        route: '/dashboard/staffs',
        label: 'Staffs'
    },
    {
        icon: <LucideFootprints className="w-6 h-6" />,
        route: '/dashboard/visitors',
        label: 'Visitors'
    },
]

const operatorSidebarLinks = [
    {
        icon: <LayoutDashboard className="w-6 h-6" />,
        route: '/dashboard',
        label: 'Overview'
    },
    {
        icon: <LandPlot className="w-6 h-6" />,
        route: '/dashboard/event',
        label: 'Events'
    },
    {
        icon: <User className="w-6 h-6" />,
        route: '/dashboard/collaborator',
        label: 'Collaborator'
    },
    {
        icon: <HandCoins className="w-6 h-6" />,
        route: '/dashboard/sponsor',
        label: 'Sponsor'
    },
    // {
    //     icon: <Ticket className="w-6 h-6" />,
    //     route: '/dashboard/tickets',
    //     label: 'Tickets'
    // },
    // {
    //     icon: <Newspaper className="w-6 h-6" />,
    //     route: '/dashboard/news',
    //     label: 'News'
    // },
    {
        icon: <ShoppingBag className="w-6 h-6" />,
        route: '/dashboard/order',
        label: 'Orders'
    }
]

const staffSidebarLinks = [
    {
        icon: <LayoutDashboard className="w-6 h-6" />,
        route: '/dashboard',
        label: 'Overview'
    },
    {
        icon: <User className="w-6 h-6" />,
        route: '/dashboard/zoo-trainers',
        label: 'Zoo Trainers'
    },
    {
        icon: <LandPlot className="w-6 h-6" />,
        route: '/dashboard/areas',
        label: 'Areas'
    },
    {
        icon: <Ticket className="w-6 h-6" />,
        route: '/dashboard/tickets',
        label: 'Tickets'
    },
    {
        icon: <Newspaper className="w-6 h-6" />,
        route: '/dashboard/news',
        label: 'News'
    },
    {
        icon: <ShoppingBag className="w-6 h-6" />,
        route: '/dashboard/order',
        label: 'Orders'
    }
]

const sponsorSidebarLinks = [
    {
        icon: <LayoutDashboard className="w-6 h-6" />,
        route: '/dashboard',
        label: 'Overview'
    },
    {
        icon: <PocketKnife className="w-6 h-6" />,
        route: '/dashboard/experience',
        label: 'Experience'
    },
    {
        icon: <Star className="w-6 h-6" />,
        route: '/dashboard/skills',
        label: 'Skills'
    },
    {
        icon: <LandPlot className="w-6 h-6" />,
        route: '/dashboard/areas',
        label: 'Areas'
    },
    {
        icon: <PawPrint className="w-6 h-6" />,
        route: '/dashboard/types',
        label: 'Animal Types'
    },
    {
        icon: <Rabbit className="w-6 h-6" />,
        route: '/dashboard/animals',
        label: 'Animals'
    },
    {
        icon: <ShoppingBag className="w-6 h-6" />,
        route: '/dashboard/species',
        label: 'Species'
    },
    {
        icon: <UtensilsCrossed className="w-6 h-6" />,
        route: '/dashboard/diets',
        label: 'Diets'
    },
]
//1 admin
//2 visitor
//3 Sponsor
//4 Staff
//5 Operator
//6 collaborator

function LeftSidebar({ }) {
    const [user, setUser] = useState(localStorage.getItem('role'));
    console.log(user)
    const sidebarLinks = user === '1'
        ? adminSidebarLinks : user === '3'
            ? sponsorSidebarLinks : user === '4'
                ? operatorSidebarLinks : user === '5'
                    ? operatorSidebarLinks : [];
    return (
        <section className='custom-scrollbar
    sticky left-0 top-0 z-20 px-6 flex w-fit flex-col justify-between bg-white-500 border-r border-r-gray-200 pb-5 pt-5 max-md:hidden
    '>
            <div className='flex w-full flex-1 flex-col gap-2 px-0 xl:px-6'>
                <div className="cursor-pointer relative w-full h-full mx-auto flex items-center justify-center lg:hidden"
                // onClick={() => router.push("/dashboard")}
                >
                    {/* <Image
                        src="/logos/Zooma_Black.svg"
                        alt="logo"
                        width={50}
                        height={50}
                    /> */}
                </div>
                {sidebarLinks.map((link) => {
                    // const isActive =
                    //     (pathname.includes(link.route) && link.route.length == pathname.length) ||
                    //     pathname === link.route;

                    return (
                        <Link
                            to={link.route}
                            key={link.label}
                            className={`relative flex justify-start gap-4 rounded-sm p-4 ${'bg-primary/20 border-l-8 border-primary text-primary'}`}
                        >
                            {link.icon}
                            <p className=' max-lg:hidden text-base font-semibold whitespace-nowrap'>{link.label}</p>
                        </Link>
                    );
                })}
            </div>
        </section>
    )
}

export default LeftSidebar