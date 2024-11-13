// ContactForm.tsx

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { sendContactForm, ContactFormValues } from "../../api";

const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().required("Message is required"),
});

const ContactForm = () => {
  const [submitStatus, setSubmitStatus] = React.useState<SubmitStatus | null>(
    null
  );

  interface SubmitStatus {
    success: boolean;
    message: string;
  }

  const handleSubmit = async (
    values: ContactFormValues,
    { resetForm }: { resetForm: () => void }
  ): Promise<void> => {
    try {
      console.log(values);
      const response = await sendContactForm(values);
      setSubmitStatus({ success: true, message: response.message });
      resetForm();
    } catch {
      setSubmitStatus({
        success: false,
        message: "Failed to send message. Please try again later.",
      });
    }
  };

  return (
    <Box className="mt-6 w-full max-w-2xl mx-auto bg-opacity-35 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <Typography
        id="Contact"
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        className="text-gray-900 dark:text-white"
        sx={{
          fontWeight: "bold",
          mb: 3,
          fontSize: { xs: "2rem", sm: "2.5rem" },
        }}
      >
        Contact Me
      </Typography>
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              InputProps={{
                className:
                  "bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
              }}
              InputLabelProps={{
                className: "text-gray-700 dark:text-gray-300",
              }}
            />
            <Field
              as={TextField}
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              InputProps={{
                className:
                  "bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
              }}
              InputLabelProps={{
                className: "text-gray-700 dark:text-gray-300",
              }}
            />
            <Field
              as={TextField}
              name="message"
              label="Message"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              error={touched.message && Boolean(errors.message)}
              helperText={touched.message && errors.message}
              InputProps={{
                className:
                  "bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
              }}
              InputLabelProps={{
                className: "text-gray-700 dark:text-gray-300",
              }}
            />
            {submitStatus && (
              <Alert
                severity={submitStatus.success ? "success" : "error"}
                className="mt-2"
              >
                {submitStatus.message}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="bg-blue-500 dark:bg-blue-700 text-white hover:bg-blue-600 dark:hover:bg-blue-800"
              sx={{ mt: 3 }}
              disabled={isSubmitting}
              startIcon={<EmailIcon />}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ContactForm;
