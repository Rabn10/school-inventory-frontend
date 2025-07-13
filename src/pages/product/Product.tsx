import { Button, Group, Modal, Paper, Select, Table, TextInput, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import axios from "../../plugins/axios"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { toast } from "react-toastify"
import { useForm } from "@mantine/form"


interface IProductProps {
    id?: null | number
    product_name: string
    category_id: number
    category_name: string
    price: number
    description: string
}

const Product = () => {

    const [product, setProduct] = useState<IProductProps[]>([
        {
            product_name: "",
            category_id: 0,
            category_name: "",
            price: 0,
            description: ""
        }
    ])
    const [category, setCategory] = useState<any[]>([])
    const [productId, setProductId] = useState<number>(0);
    const [opened, setOpened] = useState<boolean>(false);

    const form = useForm({
        initialValues: {
            name: "",
            category_id: "",
            price: 0,
            description: ""
        }
    });

    const featchAllCategory = async () => {
        try {
            const response: any = await axios.get('/category');
            const name = response.data.data.map((item: any) => ({
                value: item.id.toString(),
                label: item.name
            }));
            setCategory(name);
        }
        catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    const loadData = async () => {
        try {
            const response: any = await axios.get('/product');
            // console.log(response);   
            setProduct(response.data.data);
        }
        catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    const deleteActionHandler = async (id: number | undefined | null) => {
        try {
            if (id) {
                const response = await axios.delete(`/product/${id}`);
                if (response.data.status === 1) {
                    toast.success(response.data.message);
                    loadData();
                }
            }
        }
        catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    useEffect(() => {
        featchAllCategory();
        loadData();
    }, []);

    const editActionHandler = (data: IProductProps) => {
        setOpened(true);
        data.id && setProductId(data.id);
        form.setValues({
            name: data.product_name,
            category_id: data.category_id.toString(),
            price: data.price,
            description: data.description
        });
    }

    const handleSubmit = async () => {
        form.values.name = form.values.name.toLowerCase();
        try {
            if (productId) {
                // Edit
                const response = await axios.put(`/product/${productId}`, form.values);
                if (response.data.status === 1) {
                    toast.success(response.data.message);
                    loadData();
                }
            } else {
                //create new
                const res = await axios.post('/product', form.values);
                if (res.data.status === 1) {
                    toast.success(res.data.message);
                    loadData();
                }
            }

            setOpened(false);
            form.reset();
            setProductId(0);
        }
        catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    const productModal = (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            withCloseButton={false}
            title={<Title order={3}>{productId ? "Edit Product" : "Add Product"}</Title>}
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Product Name"
                    placeholder="Product Name"
                    {...form.getInputProps('name')}
                />
                <Select
                    label="Category"
                    placeholder="Category"
                    data={category}
                    {...form.getInputProps('category_id')}
                />
                <TextInput
                    label="Price"
                    placeholder="Price"
                    {...form.getInputProps('price')}
                />
                <TextInput
                    label="Description"
                    placeholder="Description"
                    {...form.getInputProps('description')}
                />
                <Group justify="flex-end" mt={16}>
                    <Button variant='outline' onClick={() => setOpened(false)}>Cancel</Button>
                    <Button className='bg-button' type='submit'>Submit</Button>
                </Group>


            </form>
        </Modal>
    )

    const tableBody = product?.map((v, key) => (
        <tr className="border-b border-gray-300" key={key}>
            <td className="py-2 px-3 text-center">{key + 1}</td>
            <td className="py-2 px-3 text-center">{v.product_name}</td>
            <td className="py-2 px-3 text-center">{v.category_name}</td>
            <td className="py-2 px-3 text-center">{v.price}</td>
            <td className="py-2 px-3 text-center">{v.description}</td>
            <td className="py-2 px-3 text-center">
                <div className="flex justify-center items-center gap-2">
                    <Button size="xs" color="blue" onClick={() => editActionHandler(v)}>
                        <IconEdit size={16} />
                    </Button>
                    <Button size="xs" color="red" onClick={() => deleteActionHandler(v?.id)}>
                        <IconTrash size={16} />
                    </Button>
                </div>
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
                    <Title order={4}>Product</Title>
                    <Button
                        className='bg-button'
                        onClick={() => { setOpened(true); setProductId(0) }}
                    >Add Product</Button>
                </Paper>
                {productModal}
                <Table>
                    <thead className="border-b border-gray-300 bg-gray-100 text-sm text-gray-600">
                        <tr>
                            <th className="py-2 px-3 text-center">S.N.</th>
                            <th className="py-2 px-3 text-center">Name</th>
                            <th className="py-2 px-3 text-center">Category</th>
                            <th className="py-2 px-3 text-center">Price</th>
                            <th className="py-2 px-3 text-center">description</th>
                            <th className="py-2 px-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </Table>
            </Paper>

        </>
    )
}

export default Product