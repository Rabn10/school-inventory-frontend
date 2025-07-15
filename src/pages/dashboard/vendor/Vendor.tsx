import { Button, Paper, Table, Title } from "@mantine/core"
import { useEffect, useState } from "react";
import axios from "../../../plugins/axios";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Vendor = () => {

    const navigate = useNavigate();
    const [vendorList, setVendorList] = useState<any[]>([]);

    const featchVendors = async () => {
        try {
            const response: any = await axios.get('/vendor');
            setVendorList(response.data.data);
        }
        catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    const tableRows = vendorList?.map((v, key) => (
        <tr className="border-b border-gray-300" key={key}>
            <td className="py-2 px-3 text-center">{key + 1}</td>
            <td className="py-2 px-3 text-center">{v.company_name}</td>
            <td className="py-2 px-3 text-center">{v.contact_person}</td>
            <td className="py-2 px-3 text-center">{v.address}</td>
            <td className="py-2 px-3 text-center">{v.phone}</td>
            <td className="py-2 px-3 text-center">
                <div className="flex justify-center items-center gap-2">
                    <Button size="xs" color="blue">
                        <IconEdit size={16} />
                    </Button>
                    <Button size="xs" color="red" onClick={() => handleDelete(v.id)}>
                        <IconTrash size={16} />
                    </Button>
                </div>
            </td>
        </tr>
    ));

    useEffect(() => {
        featchVendors();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`/vendor/${id}`);
            if (response.data.status === 1) {
                toast.success(response.data.message);
                featchVendors();
            }
        }
        catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    return (
        <div className="pa-xl p-xs">
            <Paper shadow="md" mt={2} p={15} pt={5} radius={10}>
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
                    <Title order={4}>Vendor List</Title>
                    <Button onClick={() => navigate('/vendor/add-vendor')}
                        size="sm" className="bg-button">
                        Add Vendor
                    </Button>
                </Paper>
                <Table>
                    <thead className="border-b border-gray-300 bg-gray-100 text-sm text-gray-600">
                        <tr>
                            <th className="py-2 px-3 text-center">S.N.</th>
                            <th className="py-2 px-3 text-center">Company Name</th>
                            <th className="py-2 px-3 text-center">contact person</th>
                            <th className="py-2 px-3 text-center">address</th>
                            <th className="py-2 px-3 text-center">phone no.</th>
                            <th className="py-2 px-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </Table>
            </Paper>
        </div>
    )
}

export default Vendor