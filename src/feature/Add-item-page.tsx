import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const loginSchema = z.object({
  name: z.string().min(1, "Please enter  the name of item"),
  year: z.number().min(6, "Please enter the year of item"),
  cpu: z.string().min(6, "Please enter the cpu details"),
  hard: z.string().min(6, "Please enter the hard disk details"),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

export const AddItemPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      year: 0,
      cpu: "",
      hard: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400, mx: "auto" }}
    >
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
              label="Email"
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
            <TextField
              {...field}
              label="Email"
              fullWidth
              margin="normal"
              error={!!errors.year}
              helperText={errors.year?.message}
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
  );
};
