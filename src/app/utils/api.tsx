import axios from 'axios';
import { TripFormData, ApiResponse } from '../types/types';

// Create axios instance with base configuration for Spring Boot backend
const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 120000, // 2 minutes timeout for AI processing
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// API response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        console.log('✅ Raw API Response:', response.data);
        return response;
    },
    (error) => {
        console.error('❌ API Error:', error);
        return Promise.reject(error);
    }
);

// Process and enrich the response data for new format
const processApiResponse = (responseData: any, originalFormData: TripFormData): ApiResponse => {
    const output = responseData.output;

    // Calculate end date based on start date and number of days
    const startDate = new Date(originalFormData.start_date);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + originalFormData.days - 1);

    // Add missing fields derived from form data
    const processedOutput = {
        ...output,
        start_date: originalFormData.start_date,
        end_date: endDate.toISOString().split('T')[0],
        destination: originalFormData.destination
    };

    return {
        output: processedOutput
    };
};

// Real API call to Spring Boot backend
export const planTrip = async (formData: TripFormData): Promise<ApiResponse> => {
    try {
        console.log('🚀 Sending request to Spring Boot backend:', formData);

        const response = await api.post('/callAiAgent', formData);

        console.log('📨 Raw response from backend:', response.data);

        // Handle different response formats
        let parsedResponse: any;

        if (typeof response.data === 'string') {
            try {
                parsedResponse = JSON.parse(response.data);
                console.log('📝 Parsed string response:', parsedResponse);
            } catch (parseError) {
                console.error('❌ Failed to parse string response:', parseError);
                throw new Error('Invalid JSON response from server');
            }
        } else {
            parsedResponse = response.data;
        }

        // Check if response is an array format
        if (Array.isArray(parsedResponse) && parsedResponse.length > 0) {
            parsedResponse = parsedResponse[0]; // Take first element
        }

        // Validate response structure
        if (!parsedResponse || !parsedResponse.output) {
            console.error('❌ Invalid response structure:', parsedResponse);
            throw new Error('Invalid response structure from backend');
        }

        // Validate that required arrays exist
        const output = parsedResponse.output;
        if (!output.flights || !Array.isArray(output.flights) || output.flights.length === 0) {
            console.error('❌ No flights found in response');
            throw new Error('No flight options found in response');
        }

        if (!output.hotels || !Array.isArray(output.hotels) || output.hotels.length === 0) {
            console.error('❌ No hotels found in response');
            throw new Error('No hotel options found in response');
        }

        if (!output.daily_highlights || !Array.isArray(output.daily_highlights) || output.daily_highlights.length === 0) {
            console.error('❌ No daily highlights found in response');
            throw new Error('No daily itinerary found in response');
        }

        // Process and enrich the response
        const processedResponse = processApiResponse(parsedResponse, formData);

        console.log('✅ Processed response:', processedResponse);
        return processedResponse;

    } catch (error) {
        console.error('❌ Detailed API Error:', error);

        if (axios.isAxiosError(error)) {
            if (!error.response) {
                throw new Error(
                    '🔌 Cannot connect to Spring Boot server.\n\n' +
                    'Please check:\n' +
                    '• Spring Boot server is running on http://localhost:8080\n' +
                    '• CORS is configured correctly'
                );
            }

            const status = error.response.status;
            const statusText = error.response.statusText;

            if (status === 500) {
                const errorData = error.response.data;
                const errorMessage = typeof errorData === 'string' ? errorData :
                    errorData?.error || errorData?.message || statusText;
                throw new Error(`🔥 Server error: ${errorMessage}`);
            }

            throw new Error(`Server error: ${statusText} (${status})`);
        }

        throw new Error('An unexpected error occurred while planning your trip');
    }
};

export default api;