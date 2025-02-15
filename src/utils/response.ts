interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

export const successResponse = (message: string, data?: any) => {
  return {
    success: true,
    message,
    data,
  } as ApiResponse;
};

export const errorResponse = (message: string, error?: any) => {
  return {
    success: false,
    message,
    error,
  } as ApiResponse;
};
