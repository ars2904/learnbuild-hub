export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactFormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error?: string | null;
}
