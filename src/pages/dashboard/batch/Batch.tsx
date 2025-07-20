import { Button, Paper, Table, Title } from "@mantine/core"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../plugins/axios";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { toast } from "react-toastify";

const Batch = () => {

    const navigate = useNavigate();
    const [batch, setBatch] = useState<any>([]);

    const fetchBatch = async () => {
        try {
            const response: any = await axios.get('/batch');
            setBatch(response.data.data);
        }
        catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`/batch/${id}`);
            if (response.data.status === 1) {
                toast.success(response.data.message);
                fetchBatch();
            }
        }
        catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    const tableRows = batch?.map((v: any, key: number) => (
        <tr className="border-b border-gray-300" key={key}>
            <td className="py-2 px-3 text-center">{key + 1}</td>
            <td className="py-2 px-3 text-center">{v.product_name}</td>
            <td className="py-2 px-3 text-center">{v.quantity}</td>
            <td className="py-2 px-3 text-center">{v.avaiable_quantity}</td>
            <td className="py-2 px-3 text-center">{v.received_date}</td>
            <td className="py-2 px-3 text-center">{v.vendor_name}</td>
            <td className="py-2 px-3 text-center">
                <div className="flex justify-center items-center gap-2">
                    <Button size="xs" color="blue">
                        <IconEdit size={16} onClick={() =>
                            navigate('/batch/add-batch', {
                                state: {
                                    batchDetail: v,
                                    topHeader: 'Edit Batch',
                                    buttonValue: 'Update'
                                }
                            })
                        } />
                    </Button>
                    <Button size="xs" color="red" onClick={() => handleDelete(v.id)}>
                        <IconTrash size={16} />
                    </Button>
                </div>
            </td>
        </tr>
    ));

    useEffect(() => {
        fetchBatch();
    }, [])

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
                    <Title order={4}>Batch</Title>
                    <Button onClick={() => navigate('/batch/add-batch')}
                        size="sm" className="bg-button">
                        Add Batch</Button>
                </Paper>
                <Table>
                    <thead className="border-b border-gray-300 bg-gray-100 text-sm text-gray-600">
                        <tr>
                            <th className="py-2 px-3 text-center">S.N.</th>
                            <th className="py-2 px-3 text-center">Product name</th>
                            <th className="py-2 px-3 text-center">Quantity</th>
                            <th className="py-2 px-3 text-center">Avaiable Quantity</th>
                            <th className="py-2 px-3 text-center">Reecived Date</th>
                            <th className="py-2 px-3 text-center">Vendor Name</th>
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

export default Batch