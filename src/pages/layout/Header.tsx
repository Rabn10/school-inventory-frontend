// src/components/layout/Header.tsx

import { Avatar, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { DropDownItem } from "../../plugins/DropDownItem";

const Header = () => {

    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const id = user.id;

    return (
        <div className="bg-white px-6 py-4 my-2 mx-4 flex items-center justify-between relative shadow-sm">
            <Group className="flex items-center">
                <Text size="lg" fw={500}>School Inventory</Text>
            </Group>
            <Group justify="flex-end">
                <div className="group inline-block relative">
                    <div className="bg-primary-200 text-gray-700 font-semibold py-2 px-4 rounded-full flex items-center cursor-pointer">
                        <Avatar src="" radius="xl" styles={{ image: { objectFit: 'contain' } }} />
                        <Text fw={500} className="pr-sm pl-xs text-primary-300 capitalize">Nilima Maharjan</Text>
                    </div>
                    <div className="absolute hidden text-gray-700 group-hover:block z-50 dropdown-menu right-0">
                        <DropDownItem>
                            <Link to={`/profile/${id}`}>
                                <div className='flex items-center mr-md'>
                                    <Text>Profile</Text>
                                </div>
                            </Link>
                        </DropDownItem>
                        <DropDownItem>
                            <Link to={`/change-password/${id}`}>
                                <div className='flex items-center mr-md'>
                                    <Text>Change Password</Text>
                                </div>
                            </Link>
                        </DropDownItem>
                        <DropDownItem>
                            <Link to='/logout'>
                                <div className='flex items-center mr-md'>
                                    <Text>Logout</Text>
                                </div>
                            </Link>
                        </DropDownItem>
                    </div>
                </div>
            </Group>
        </div>
    );
};

export default Header;
