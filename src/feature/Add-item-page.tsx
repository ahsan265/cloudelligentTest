import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import type { DeviceInformation } from "../types/device-types";
const loginSchema = z.object({
  name: z.string().min(1, "Please enter  the name of item"),
  year: z.number().min(6, "Please enter the year of item"),
  cpu: z.string().min(6, "Please enter the cpu details"),
  hard: z.string().min(1, "Please enter the hard disk details"),
  price: z.number().min(1, "Please enter the price of item"),
});
export type formValues = z.infer<typeof loginSchema>;
interface AddItemPageProps {
  data?: DeviceInformation;
  onItemAdded?: (val: formValues) => void;
}
export const AddItemPage = ({ data, onItemAdded }: AddItemPageProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: data?.name ?? "",
      year: data?.data.year ?? 0,
      cpu: data?.data.cpu ?? "",
      hard: data?.data.hard ?? "",
      price: data?.data.price ?? 0,
    },
  });

  const onSubmit = (data: formValues) => {
    onItemAdded?.(data);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        component="form"
        onSubmit={handleSubmit((val) => onSubmit(val))}
        sx={{ maxWidth: 500, mx: "auto" }}
      >
        <Typography variant="h4" gutterBottom>
          Add New Item
        </Typography>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <>
              <Typography variant="h6" gutterBottom>
                {`Enter the ${field.name} `}
              </Typography>
              <TextField
                {...field}
                label="Name"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </>
          )}
        />

        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <>
              <Typography variant="h6" gutterBottom>
                {`Enter the ${field.name} `}
              </Typography>
              <DatePicker
                views={["year"]}
                value={field.value ? dayjs(new Date(field.value, 0, 1)) : null}
                onChange={(date) => field.onChange(date?.year() || "")}
                minDate={dayjs(new Date(1900, 0, 1))}
                maxDate={dayjs(new Date(dayjs().year(), 11, 31))}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: "normal",
                    error: !!errors.year,
                    helperText: errors.year?.message,
                  },
                }}
              />
            </>
          )}
        />
        <Controller
          name="cpu"
          control={control}
          render={({ field }) => (
            <>
              <Typography variant="h6" gutterBottom>
                {`Enter the ${field.name} `}
              </Typography>
              <TextField
                {...field}
                label="cpu"
                fullWidth
                margin="normal"
                error={!!errors.cpu}
                helperText={errors.cpu?.message}
              />
            </>
          )}
        />
        <Controller
          name="hard"
          control={control}
          render={({ field }) => (
            <>
              <Typography variant="h6" gutterBottom>
                {`Enter the ${field.name} `}
              </Typography>
              <TextField
                {...field}
                label="hard"
                fullWidth
                margin="normal"
                error={!!errors.hard}
                helperText={errors.hard?.message}
              />
            </>
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <>
              <Typography variant="h6" gutterBottom>
                {`Enter the ${field.name} `}
              </Typography>
              <TextField
                {...field}
                type="number"
                inputProps={{ step: "0.01" }}
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? parseFloat(e.target.value) : ""
                  )
                }
                label="price"
                fullWidth
                margin="normal"
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </>
          )}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          Add Item
        </Button>
      </Box>
    </LocalizationProvider>
  );
};
