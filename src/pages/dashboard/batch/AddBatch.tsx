import { Button, Grid, Group, NumberInput, Paper, Select, TextInput, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import axios from "../../../plugins/axios"
import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "@mantine/form"
import { toast } from "react-toastify"


const AddBatch = () => {

    const navigate = useNavigate();
    const location: any = useLocation();
    const [product, setProduct] = useState<any[]>([])
    const [vendor, setVendor] = useState<any[]>([])

    const form = useForm({
        initialValues: {
            id: '',
            product_id: '',
            quantity: 0,
            avaiable_quantity: 0,
            received_date: '',
            vendor_id: '',
        }
    })

    const handleSubmit = async () => {
        try {
            if (form?.values?.id) {
                //edit
                const response = await axios.put(`/batch/${form?.values?.id}`, form.values);
                if (response.data.status === 1) {
                    toast.success(response.data.message);
                    navigate('/batch');
                }
            } else {
                //create new
                const res = await axios.post('/batch', form.values);
                if (res.data.status === 1) {
                    toast.success(res.data.message);
                    navigate('/batch');
                }
            }
        }
        catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    const fetchProduct = async () => {
        try {
            const response: any = await axios.get('/product');
            const name = response.data.data.map((item: any) => ({
                value: item.id.toString(),
                label: item.product_name
            }));
            setProduct(name);
        }
        catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    const fetchVendors = async () => {
        try {
            const response: any = await axios.get('/vendor');
            const name = response.data.data.map((item: any) => ({
                value: item.id.toString(),
                label: item.company_name
            }));
            setVendor(name);
        }
        catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    useEffect(() => {
        if (!!location?.state) {
            form.setValues(location?.state?.batchDetail)
        }
    }, [!!location?.state])

    useEffect(() => {
        fetchProduct();
        fetchVendors();
    }, [])

    return (
        <Paper shadow='xs' p='md' className='mx-3xl md:mx-sm  sm:mx-xs'>
            <Title className="text-center" order={3}>{location?.state?.topHeader ?? 'Add Batch'}</Title>
            <form onSubmit={form.onSubmit(() => handleSubmit())} className="mx-md mt-sm">
                <Grid>
                    <Grid.Col>
                        <div className="grid grid-cols-3 gap-5">
                            <Select
                                label="Product Name"
                                placeholder="Product Name"
                                data={product}
                                required
                                {...form.getInputProps('product_id')}
                            />
                            <NumberInput
                                label="Quantity"
                                placeholder="Quantity"
                                required
                                {...form.getInputProps('quantity')}
                            />
                            <NumberInput
                                label="Avaiable Quantity"
                                placeholder="Avaiable Quantity"
                                required
                                {...form.getInputProps('avaiable_quantity')}
                            />
                            <TextInput
                                label="Received Date"
                                placeholder="Received Date"
                                required
                                {...form.getInputProps('received_date')}
                            />
                            <Select
                                label="Vendor Name"
                                placeholder="Vendor Name"
                                data={vendor}
                                required
                                {...form.getInputProps('vendor_id')}
                            />
                        </div>
                    </Grid.Col>
                </Grid>
                <Group justify="flex-end" mt={16}>
                    <Button variant='outline' onClick={() => navigate('/batch')}>Cancle</Button>
                    <Button type="submit">
                        {location?.state?.buttonValue ?? 'Submit'}
                    </Button>
                </Group>
            </form>
        </Paper>
    )
}

export default AddBatch