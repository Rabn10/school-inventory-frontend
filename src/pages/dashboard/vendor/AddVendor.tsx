import { Button, Grid, Paper, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import axios from "../../../plugins/axios";
import { toast } from "react-toastify";

const AddVendor = () => {

    const navigate = useNavigate();
    const location: any = useLocation();
    const [vendorId, setVendorId] = useState<number>(0);

    const form = useForm({
        initialValues: {
            company_name: '',
            contact_person: '',
            address: '',
            phone: '',
            email: '',
            website: '',
        }
    });

    const handleSubmit = async () => {
        try {
            if (vendorId) {
                //edit
                const response = await axios.put(`/vendor/${vendorId}`, form.values);
                if (response.data.status === 1) {
                    toast.success(response.data.message);
                    navigate('/vendor');
                }
            } else {
                //create new
                const res = await axios.post('/vendor', form.values);
                if (res.data.status === 1) {
                    toast.success(res.data.message);
                    navigate('/vendor');
                }
            }
        }
        catch (error: any) {
            console.error(error.response?.data || error.message);
        }
    }

    return (
        <Paper shadow='xs' p='md' className='mx-3xl md:mx-sm  sm:mx-xs'>
            <Title className='text-center' order={3}>{location?.state?.topHeader ?? 'Add Vendor'}</Title>
            <form onSubmit={form.onSubmit(() => handleSubmit())} className='mx-md mt-sm '>
                <Grid>
                    <Grid.Col>
                        <div className='grid grid-cols-3 gap-5'>
                            <TextInput
                                label="Company Name"
                                placeholder="Company Name"
                                required
                                {...form.getInputProps('company_name')}
                            />
                            <TextInput
                                label="Contact Person"
                                placeholder="Contact Person"
                                required
                                {...form.getInputProps('contact_person')}
                            />
                            <TextInput
                                label="Address"
                                placeholder="Address"
                                required
                                {...form.getInputProps('address')}
                            />
                            <TextInput
                                label="Phone"
                                placeholder="Phone" required
                                {...form.getInputProps('phone')}
                            />
                            <TextInput
                                label="Email"
                                placeholder="Email" required
                                {...form.getInputProps('email')}
                            />
                            <TextInput
                                label="Website"
                                placeholder="Website"
                                {...form.getInputProps('website')}
                            />
                        </div>
                    </Grid.Col>
                </Grid>

                <div className="mt-4 flex gap-4 justify-end">
                    <Button variant="outline" onClick={() => navigate('/vendor')}>cancle</Button>
                    <Button className='bg-button' size='sm' type='submit'>
                        {location?.state?.buttonValue ?? 'Submit'}
                    </Button>
                </div>
            </form>
        </Paper>
    )
}

export default AddVendor