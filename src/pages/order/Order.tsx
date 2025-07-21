import { Button, Paper, Table, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "../../plugins/axios";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const Order = () => {

    const navigate = useNavigate();
    const [orderList, setOrderList] = useState<any[]>([]);

    const fetchOrders = async () => {
        try {
            const response: any = await axios.get('/order/');
            setOrderList(response.data.data);
        }
        catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    console.log(orderList);

    useEffect(() => {
        fetchOrders();
    }, [])

    const tableRows = orderList?.map((v, key) => (
        <tr className="border-b border-gray-300" key={key}>
            <td className="py-2 px-3 text-center">{key + 1}</td>
            <td className="py-2 px-3 text-center">{v.vendor_name}</td>
            <td className="py-2 px-3 text-center">{v.order_date}</td>
            <td className="py-2 px-3 text-center">{v.items?.[0]?.product_name}</td>
            <td className="py-2 px-3 text-center">{v.items?.[0]?.quantity}</td>
            <td className="py-2 px-3 text-center">{v.items?.[0]?.total_price}</td>
            <td className="py-2 px-3 text-center">{v.status}</td>
            <td className="py-2 px-3 text-center">
                <div className="flex justify-center items-center gap-2">
                    <Button size="xs" color="blue">
                        <IconEdit size={16} onClick={() =>
                            navigate('/vendor/add-vendor', {
                                state: {
                                    vendorDetail: v,
                                    topHeader: 'Edit Vendor',
                                    buttonValue: 'Update'
                                }
                            })
                        } />
                    </Button>
                    <Button size="xs" color="red">
                        <IconTrash size={16} />
                    </Button>
                </div>
            </td>
        </tr>
    ))

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
                    <Title order={4}>Orders List</Title>
                    <Button onClick={() => navigate('/order/add-order')}
                        size="sm" className="bg-button">
                        Add Vendor
                    </Button>
                </Paper>
                <Table>
                    <thead className="border-b border-gray-300 bg-gray-100 text-sm text-gray-600">
                        <tr>
                            <th className="py-2 px-3 text-center">S.N</th>
                            <th className="py-2 px-3 text-center">Vendor Name</th>
                            <th className="py-2 px-3 text-center">Order Date</th>
                            <th className="py-2 px-3 text-center">Product Name</th>
                            <th className="py-2 px-3 text-center">Quantity</th>
                            <th className="py-2 px-3 text-center">Total Price</th>
                            <th className="py-2 px-3 text-center">Order Status</th>
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

export default Order;