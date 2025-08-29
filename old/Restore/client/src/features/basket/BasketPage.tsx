import { Box, Button, Grid2, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useFetchBasketQuery, useRemoveItemFromBasketMutation, useAddItemToBasketMutation } from "./basketApi";
import { Add, Delete, Remove } from "@mui/icons-material";

export default function BasketPage() {
    const { data: basket, isLoading } = useFetchBasketQuery();
    const [removeItemFromBasket] = useRemoveItemFromBasketMutation();
    const [addItemToBasket] = useAddItemToBasketMutation();

    if (isLoading) return <Typography>Loading basket...</Typography>;

    if (!basket || basket.items.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <Typography variant="h4">Your basket is empty</Typography>
            </Box>
        );
    }

    const subtotal = basket.items.reduce((sum, item) => sum + (item.quantity * item.product.price), 0);

    const handleRemoveItem = (productId: number, quantity: number) => {
        removeItemFromBasket({ productId, quantity });
    };

    const handleAddItem = (productId: number) => {
        addItemToBasket({ productId, quantity: 1 });
    };

    return (
        <Grid2 container spacing={4} sx={{ mt: 4 }}>
            <Grid2 size={8}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="right">Subtotal</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {basket.items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <img 
                                                src={item.product.pictureUrl} 
                                                alt={item.product.name}
                                                style={{ height: 50, width: 50, marginRight: 20 }}
                                            />
                                            <span>{item.product.name}</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        ${(item.product.price / 100).toFixed(2)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box display="flex" alignItems="center" justifyContent="center">
                                            <Button 
                                                onClick={() => handleRemoveItem(item.productId, 1)}
                                                color="error"
                                                size="small"
                                            >
                                                <Remove />
                                            </Button>
                                            <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                                            <Button 
                                                onClick={() => handleAddItem(item.productId)}
                                                color="secondary"
                                                size="small"
                                            >
                                                <Add />
                                            </Button>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        ${((item.quantity * item.product.price) / 100).toFixed(2)}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button 
                                            onClick={() => handleRemoveItem(item.productId, item.quantity)}
                                            color="error"
                                            startIcon={<Delete />}
                                        >
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid2>
            <Grid2 size={4}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Order Summary
                    </Typography>
                    <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
                        <Typography variant="body1">Subtotal:</Typography>
                        <Typography variant="body1">
                            ${(subtotal / 100).toFixed(2)}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
                        <Typography variant="body1">Delivery fee:</Typography>
                        <Typography variant="body1">
                            ${subtotal > 10000 ? '0.00' : '5.00'}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
                        <Typography variant="h6">Total:</Typography>
                        <Typography variant="h6">
                            ${((subtotal + (subtotal > 10000 ? 0 : 500)) / 100).toFixed(2)}
                        </Typography>
                    </Box>
                    <Button 
                        variant="contained" 
                        size="large" 
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Checkout
                    </Button>
                </Paper>
            </Grid2>
        </Grid2>
    );
}