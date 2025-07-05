import { Button, Paper, Table, Title } from "@mantine/core"

const Category = () => {
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
                <Table highlightOnHover className="w-full border-b border-gray-300 mt-2">
                    <thead className="bg-gray-100 text-sm text-gray-600">
                        <tr>
                            <th className="py-2 px-3 text-left">S.N.</th>
                            <th className="py-2 px-3 text-left">Name</th>
                            <th className="py-2 px-3 text-left">Action</th>
                        </tr>
                    </thead>
                </Table>
            </Paper>
        </>
    )
}

export default Category