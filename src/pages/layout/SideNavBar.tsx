import { Box, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const navItems = [
    { path: "/category", label: "Category" },
    { path: "/product", label: "Product" },
    { path: "/vendor", label: "Vendor" },
    { path: "/batch", label: "Batch" },
    { path: "/order", label: "Order" }
];

const SideNavBar = () => {

    const navigate = useNavigate();

    return (
        <Box className="side-navbar absolute z-[199] md:relative flex items-start h-screen border-r border-[#EBEBEB]">
            <Box className="w-[220px] md:w-[180px] h-full flex flex-col bg-white text-blue-900">
                {/* Header */}
                <Text
                    size="xl"
                    fw={700}
                    className="bg-blue-900 text-white text-center py-4 text-2xl cursor-pointer"
                >
                    Dashboard
                </Text>

                {/* Navigation Links */}
                <Box className="flex flex-col gap-6 py-6 px-6">
                    {navItems.map((item, index) => (
                        <Text
                            key={index}
                            fw={600}
                            className="cursor-pointer hover:text-blue-700 transition-all"
                            onClick={() => navigate(item.path)}
                        >
                            {item.label}
                        </Text>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default SideNavBar;
