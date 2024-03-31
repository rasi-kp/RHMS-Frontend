import React, { useState } from 'react';
import logo from '../images/logo.png'
import image from '../images/doctor 1.jpg'
import { AiOutlineMenu } from 'react-icons/ai';
import { IoNotifications } from "react-icons/io5";
import { MdBloodtype } from "react-icons/md";
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import Sidebar from './Sidebar';
const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Monitored",
        value: "monitored",
    },
    {
        label: "Unmonitored",
        value: "unmonitored",
    },
];

const TABLE_HEAD = ["Member", "Function", "Status", "Employed", ""];

const TABLE_ROWS = [
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "John Michael",
        email: "john@creative-tim.com",
        job: "Manager",
        org: "Organization",
        online: true,
        date: "23/04/18",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
        name: "Alexa Liras",
        email: "alexa@creative-tim.com",
        job: "Programator",
        org: "Developer",
        online: false,
        date: "23/04/18",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
        name: "Laurent Perrier",
        email: "laurent@creative-tim.com",
        job: "Executive",
        org: "Projects",
        online: false,
        date: "19/09/17",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
        name: "Michael Levi",
        email: "michael@creative-tim.com",
        job: "Programator",
        org: "Developer",
        online: true,
        date: "24/12/08",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
        name: "Richard Gran",
        email: "richard@creative-tim.com",
        job: "Manager",
        org: "Executive",
        online: false,
        date: "04/10/21",
    },
];
const DashboardLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='bg-[#E2F1FF] h-screen'>
            <div className='p-3 flex items-center lg:hidden justify-around'>
                <AiOutlineMenu className='' size={30} onClick={toggleSidebar} />
                <img className='ml-2' src={logo} width="102" alt="logo" />
                <div className='flex items-center'>
                    <IoNotifications className='cursor-pointer w-5 h-5 me-3 text-slate-500' />

                    <div className="rounded-full border-2 border-blue-900 overflow-hidden bg-gray-200 w-8 h-8 flex mx-auto">
                        <img className="w-full h-auto cursor-pointer" src={image} alt="Doctor" />
                    </div>

                </div>
            </div>
            <div>
                <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
                <h1 className='absolute lg:ml-52 p-7 pt-6 font-semibold hidden lg:block'>Dashboard</h1>
                <div className=" lg:ml-52 p-3 pt-4 flex justify-end lg:flex hidden lg:block">
                    <div className='flex items-center'>

                        <IoNotifications className='cursor-pointer w-5 h-5 me-3 text-slate-500' />
                        <div className="rounded-full border-2 border-blue-900 overflow-hidden bg-gray-200 w-8 h-8 flex mx-auto">
                            <img className="w-full h-auto cursor-pointer" src={image} alt="Doctor" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-sm font-semibold cursor-default text-blue-900 ml-2 mr-3">Muhammad Rasi</h1>
                            <h1 className='text-xs ml-2 cursor-default text-slate-400'>Patient</h1>
                        </div>
                    </div>
                    {children}
                </div>
                <div className='sm:flex'>
                    <div className='w-full lg:ml-52 md:w-96'>
                        <div className='bg-white ml-7 me-6 mt-3 h-52 flex'>
                            <div className="w-2/4 flex flex-col">
                                <div className="h-full">
                                    <div className='flex justify-center items-center mt-4 ml-4 me-2 h-20 rounded-xl bg-red-200'>
                                        <div className="text-center justify-center">
                                            <MdBloodtype className='w-8 h-8 ml-4' />
                                            <h1 className='text-sm font-bold'>B+</h1>
                                            <h1 className='text-xs font-light'>Blood Group</h1> {/* Blood group */}
                                        </div>
                                    </div>
                                </div>

                                <div className="h-full">
                                    <div className='flex items-center justify-center mt-2 ml-4 me-2 h-20 rounded-xl bg-yellow-200'>
                                        <div className="text-center justify-center">
                                            <MdBloodtype className='w-8 h-8 ml-4' />
                                            <h1 className='text-sm font-bold'>B+</h1>
                                            <h1 className='text-xs font-light'>Blood Group</h1> {/* Blood group */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-2/4 flex flex-col">
                                <div className="h-full ">
                                    <div className='flex items-center mt-4 ml-2 me-4 h-20 rounded-xl justify-center bg-blue-200'>
                                        <div className="text-center justify-center">
                                            <MdBloodtype className='w-8 h-8 ml-4 ' />
                                            <h1 className='text-sm font-bold'>B+</h1>
                                            <h1 className='text-xs font-light'>Blood Group</h1> {/* Blood group */}
                                        </div>
                                    </div>
                                </div>
                                <div className="h-full">
                                    <div className='flex items-center mt-2 ml-2 me-4 h-20 rounded-xl justify-center bg-green-200'>
                                        <div className="text-center justify-center">
                                            <MdBloodtype className='w-8 h-8 ml-4' />
                                            <h1 className='text-sm font-bold'>B+</h1>
                                            <h1 className='text-xs font-light'>Blood Group</h1> {/* Blood group */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='w-full md:w-3/4 '>
                        <div className='bg-white ml-2 me-8 mt-3 h-52'>
                            <h1>hai</h1>
                            <Card className="h-full w-full">
                                <CardHeader floated={false} shadow={false} className="rounded-none">
                                    <div className="mb-8 flex items-center justify-between gap-8">
                                        <div>
                                            <Typography variant="h5" color="blue-gray">
                                                Members list
                                            </Typography>
                                            <Typography color="gray" className="mt-1 font-normal">
                                                See information about all members
                                            </Typography>
                                        </div>
                                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                            <Button variant="outlined" size="sm">
                                                view all
                                            </Button>
                                            <Button className="flex items-center gap-3" size="sm">
                                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                                        <Tabs value="all" className="w-full md:w-max">
                                            <TabsHeader>
                                                {TABS.map(({ label, value }) => (
                                                    <Tab key={value} value={value}>
                                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                                    </Tab>
                                                ))}
                                            </TabsHeader>
                                        </Tabs>
                                        <div className="w-full md:w-72">
                                            <Input
                                                label="Search"
                                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                            />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardBody className="overflow-scroll px-0">
                                    <table className="mt-4 w-full min-w-max table-auto text-left">
                                        <thead>
                                            <tr>
                                                {TABLE_HEAD.map((head, index) => (
                                                    <th
                                                        key={head}
                                                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                                    >
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                                        >
                                                            {head}{" "}
                                                            {index !== TABLE_HEAD.length - 1 && (
                                                                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                                            )}
                                                        </Typography>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {TABLE_ROWS.map(
                                                ({ img, name, email, job, org, online, date }, index) => {
                                                    const isLast = index === TABLE_ROWS.length - 1;
                                                    const classes = isLast
                                                        ? "p-4"
                                                        : "p-4 border-b border-blue-gray-50";

                                                    return (
                                                        <tr key={name}>
                                                            <td className={classes}>
                                                                <div className="flex items-center gap-3">
                                                                    {/* <Avatar src={img} alt={name} size="sm" /> */}
                                                                    <div className="flex flex-col">
                                                                        <Typography
                                                                            variant="small"
                                                                            color="blue-gray"
                                                                            className="font-normal"
                                                                        >
                                                                            {name}
                                                                        </Typography>
                                                                        <Typography
                                                                            variant="small"
                                                                            color="blue-gray"
                                                                            className="font-normal opacity-70"
                                                                        >
                                                                            {email}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className={classes}>
                                                                <div className="flex flex-col">
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal"
                                                                    >
                                                                        {job}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal opacity-70"
                                                                    >
                                                                        {org}
                                                                    </Typography>
                                                                </div>
                                                            </td>
                                                            <td className={classes}>
                                                                <div className="w-max">
                                                                    <Chip
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        value={online ? "online" : "offline"}
                                                                        color={online ? "green" : "blue-gray"}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td className={classes}>
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {date}
                                                                </Typography>
                                                            </td>
                                                            <td className={classes}>
                                                                <Tooltip content="Edit User">
                                                                    <IconButton variant="text">
                                                                        <PencilIcon className="h-4 w-4" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </td>
                                                        </tr>
                                                    );
                                                },
                                            )}
                                        </tbody>
                                    </table>
                                </CardBody>
                                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        Page 1 of 10
                                    </Typography>
                                    <div className="flex gap-2">
                                        <Button variant="outlined" size="sm">
                                            Previous
                                        </Button>
                                        <Button variant="outlined" size="sm">
                                            Next
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>


                        </div>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default DashboardLayout;
