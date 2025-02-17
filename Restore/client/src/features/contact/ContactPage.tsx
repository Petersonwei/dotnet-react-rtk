import { useDispatch, useSelector } from "react-redux"
import { CounterState, decrement, increment } from "./counterReducer";
import { Button, ButtonGroup, Typography } from "@mui/material";

export default function ContactPage() {
  
  const data = useSelector((state: CounterState) => state.data);

  const dispatch = useDispatch();
  return (
    <>
      <Typography variant="h2">
        Contact Page
      </Typography>
      <Typography>
        The data is :{data}
      </Typography>
      <ButtonGroup>
        <Button onClick={() => dispatch(decrement())} color="error">Decrement</Button>
        <Button onClick={() => dispatch(increment())} color="secondary">Increment</Button>
        <Button onClick={() => dispatch(decrement(5))} color="error">Decrement 5</Button>
        <Button onClick={() => dispatch(increment(5))} color="secondary">Increment 5</Button>
      </ButtonGroup>
    </>
  )
}