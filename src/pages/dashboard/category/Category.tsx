import { Button, Modal, Paper, Table, TextInput, Title } from "@mantine/core"
import axios from "../../../plugins/axios";
import { useEffect, useState } from "react"
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useForm } from "@mantine/form";

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

    const [categoryId, setCategoryId] = useState<number>(0);
    const [opened, setOpened] = useState<boolean>(false);

    const form = useForm({
        initialValues: {
            name: "",
        }
    });

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

    const editActionHandler = (data: ICategoryProps) => {
        setOpened(true);
        data.id && setCategoryId(data.id);
        form.setValues({
            name: data.name
        });
    }

    const handleSubmit = async () => {
        form.values.name = form.values.name.toLowerCase();
        try {
            if (categoryId) {
                // Edit
                const response = await axios.put(`/category/${categoryId}`, form.values);
                if (response.data.status === 1) {
                    toast.success(response.data.message);
                    loadData();
                }
            } else {
                // Create new
                const res = await axios.post('/category', form.values);
                if (res.data.status === 1) {
                    toast.success(res.data.message);
                    loadData();
                }
            }

            setOpened(false);
            form.reset();
            setCategoryId(0);

        } catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }


    const CategoryModal = (
        <Modal opened={opened} onClose={() => setOpened(false)} withCloseButton={false}
            title={<Title data-autofocus order={3}>{categoryId ? 'Edit Fee Category' : 'Add Fee Category'}</Title>}>
            <form onSubmit={form.onSubmit(() => handleSubmit())}>
                <TextInput
                    label="Category Name"
                    placeholder="Category Name"
                    {...form.getInputProps('name')}
                />
                <div className='mt-4 gap-2 flex justify-end'>
                    <Button variant='outline' size="sm" onClick={() => setOpened(false)}>Cancel</Button>
                    <Button className='bg-button' size="sm" type='submit'>Submit</Button>
                </div>
            </form>
        </Modal>
    )

    const tableBody = category?.map((v, key) => (
        <tr className="border-b border-gray-300" key={key}>
            <td className="py-2 px-3 text-left">{key + 1}</td>
            <td className="py-2 px-3 text-left">{v.name}</td>
            <td className="flex gap-2 py-2 px-3 text-left">
                <Button size="xs" color="blue" onClick={() => editActionHandler(v)}>
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
                        order={4}>
                        Category
                    </Title>
                    <Button
                        className='bg-button'
                        onClick={() => { setOpened(true); setCategoryId(0); form.reset() }}
                    >
                        Add Fee Category
                    </Button>
                </Paper>
                {CategoryModal}
                <Table>
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