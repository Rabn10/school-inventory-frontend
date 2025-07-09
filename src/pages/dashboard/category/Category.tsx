import { Button, Paper, Table, Title } from "@mantine/core"
import axios from "../../../plugins/axios";
import { useEffect, useState } from "react"
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { toast } from "react-toastify";

interface ICategoryProps {
    id?: null | number,
    name: string
}

const Category = () => {

    const [category, setCategory] = useState<ICategoryProps[]>([
        {
            name: ""
        }
    ]);

    const loadData = async () => {
        try {
            const response: any = await axios.get('/category');
            // console.log(response);   
            setCategory(response.data.data);
        }
        catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    const deleteActionHandler = async (id: number | undefined | null) => {
        try {
            if (id) {
                const response = await axios.delete(`/category/${id}`);
                if (response.data.status === 1) {
                    toast.success(response.data.message) && loadData();
                }
            }
        }
        catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const tableBody = category?.map((v, key) => (
        <tr className="border-b border-gray-300" key={key}>
            <td className="py-2 px-3 text-left">{key + 1}</td>
            <td className="py-2 px-3 text-left">{v.name}</td>
            <td className="flex gap-2 py-2 px-3 text-left">
                <Button size="xs" color="blue">
                    <IconEdit size={16} />
                </Button>
                <Button size="xs" color="red" onClick={() => deleteActionHandler(v?.id)}>
                    <IconTrash size={16} />
                </Button>
            </td>
        </tr>
    ))

    return (
        <>
            <Paper shadow={"md"} p={15} pt={5} radius={10}>
                <Paper
                    p={8}
                    mt={10}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderBottom: '1.5px solid #E5E4E2',
                        borderRadius: 0,
                    }}
                >
                    <Title
                        order={4}
                        fw={700}
                        size="18px"
                        lh={1.45}
                        style={{ margin: 0, color: "inherit" }}
                    >
                        Category
                    </Title>
                    <Button
                        radius="md"
                        size="md"
                        className="bg-[#2196F3] hover:bg-[#1e88e5] text-white font-semibold px-4 py-2 mb-2"
                    >
                        Add Fee Category
                    </Button>
                </Paper>
                <Table highlightOnHover className="w-full mt-2">
                    <thead className="border-b border-gray-300 bg-gray-100 text-sm text-gray-600">
                        <tr>
                            <th className="py-2 px-3 text-left">S.N.</th>
                            <th className="py-2 px-3 text-left">Name</th>
                            <th className="py-2 px-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="">{tableBody}</tbody>
                </Table>
            </Paper>
        </>
    )
}

export default Category